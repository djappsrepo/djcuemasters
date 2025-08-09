import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Tables, Database } from "@/integrations/supabase/types";

type DJProfileFormData = Pick<Tables<'dj_profiles'>, 'stage_name' | 'bio' | 'minimum_tip' | 'location_address'>;

export const useDJProfileSetup = () => {
  const { user, djProfile, refreshProfiles } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<DJProfileFormData>({
    stage_name: "",
    bio: "",
    minimum_tip: 2.00,
    location_address: ""
  });

  const isEditing = !!djProfile;

  useEffect(() => {
    if (djProfile) {
      setFormData({
        stage_name: djProfile.stage_name || "",
        bio: djProfile.bio || "",
        minimum_tip: djProfile.minimum_tip || 2.00,
        location_address: djProfile.location_address || ""
      });
    }
  }, [djProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: id === 'minimum_tip' ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Error de autenticación", description: "Debes iniciar sesión para configurar tu perfil.", variant: "destructive" });
      return;
    }

    setLoading(true);

    const submissionData: Database['public']['Tables']['dj_profiles']['Insert'] = {
      stage_name: formData.stage_name,
      bio: formData.bio,
      minimum_tip: formData.minimum_tip,
      location_address: formData.location_address,
      user_id: user.id,
      id: user.id, // Required for upsert
      updated_at: new Date().toISOString(),
    };

    // Geocode address if it's provided and different from the current profile
    if (formData.location_address && formData.location_address !== djProfile?.location_address) {
      try {
        const { data: geoData, error: geoError } = await supabase.functions.invoke('geocode-address', {
          body: { address: formData.location_address },
        });

        if (geoError) throw new Error(`Error de geocodificación: ${geoError.message}`);
        if (geoData.error) throw new Error(`No se pudo geocodificar la dirección: ${geoData.error}`);

        submissionData.latitude = geoData.latitude;
        submissionData.longitude = geoData.longitude;

      } catch (error: unknown) {
        setLoading(false);
        const message = error instanceof Error ? error.message : 'No se pudo procesar la dirección.';
        toast({ title: "Error de Ubicación", description: message, variant: "destructive" });
        return; // Stop submission if geocoding fails
      }
    }

    const { error } = await supabase
      .from('dj_profiles')
      .upsert(submissionData, { onConflict: 'id' });

    setLoading(false);

    if (error) {
      toast({ title: `Error al ${isEditing ? 'actualizar' : 'crear'} el perfil`, description: error.message, variant: "destructive" });
    } else {
      toast({ title: `¡Perfil ${isEditing ? 'actualizado' : 'creado'}!`, description: "Tu información ha sido guardada." });
      if (refreshProfiles) {
        await refreshProfiles();
      }
    }
  };

  return { loading, formData, isEditing, handleInputChange, handleSubmit };
};
