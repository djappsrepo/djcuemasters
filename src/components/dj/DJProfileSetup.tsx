import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User, DollarSign, Loader2, Save } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type DJProfileFormData = Pick<Tables<'dj_profiles'>, 'stage_name' | 'bio' | 'minimum_tip'>;

const DJProfileSetup = () => {
  const { user, djProfile, refreshProfiles } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<DJProfileFormData>({
    stage_name: "",
    bio: "",
    minimum_tip: 2.00
  });

  const isEditing = !!djProfile;

  useEffect(() => {
    if (djProfile) {
      setFormData({
        stage_name: djProfile.stage_name || "",
        bio: djProfile.bio || "",
        minimum_tip: djProfile.minimum_tip || 2.00
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

    const profileData = {
      ...formData,
      id: user.id, // The profile ID must match the user ID
      updated_at: new Date().toISOString(),
    };

    // The 'upsert' operation requires the 'user_id' field.
    const submissionData = { ...profileData, user_id: user.id };

    const { error } = await supabase
      .from('dj_profiles')
      .upsert(submissionData, { onConflict: 'id' });

    setLoading(false);

    if (error) {
      toast({ title: `Error al ${isEditing ? 'actualizar' : 'crear'} el perfil`, description: error.message, variant: "destructive" });
    } else {
      toast({ title: `¡Perfil ${isEditing ? 'actualizado' : 'creado'}!`, description: "Tu información ha sido guardada.", });
      if (refreshProfiles) {
        await refreshProfiles();
      }
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Configuración de Perfil de DJ</CardTitle>
        <CardDescription>
          {isEditing ? 'Actualiza tu información pública.' : 'Completa tu perfil para que los fans puedan encontrarte y enviarte propinas.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="stage_name">Nombre Artístico *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="stage_name"
                value={formData.stage_name || ''}
                onChange={handleInputChange}
                placeholder="Ej: DJ Beatmaster"
                required
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografía</Label>
            <Textarea
              id="bio"
              value={formData.bio || ''}
              onChange={handleInputChange}
              placeholder="Cuéntanos sobre tu estilo musical, experiencia, etc..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minimum_tip">Propina Mínima Sugerida ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="minimum_tip"
                type="number"
                value={formData.minimum_tip || 0}
                onChange={handleInputChange}
                placeholder="2.00"
                step="0.01"
                min="0"
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando...</>
              ) : (
                <><Save className="w-4 h-4 mr-2" /> {isEditing ? 'Guardar Cambios' : 'Crear Perfil'}</>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DJProfileSetup;