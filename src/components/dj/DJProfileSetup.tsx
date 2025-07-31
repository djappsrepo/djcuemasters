import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User, DollarSign, Loader2 } from "lucide-react";

const DJProfileSetup = () => {
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    stage_name: "",
    bio: "",
    minimum_tip: "2.00"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('dj_profiles')
        .insert({
          user_id: user.id,
          stage_name: formData.stage_name,
          bio: formData.bio || null,
          minimum_tip: parseFloat(formData.minimum_tip)
        });

      if (error) throw error;

      toast({
        title: "¡Perfil de DJ creado!",
        description: "Tu perfil de DJ ha sido configurado correctamente.",
      });

      await refreshProfile();
    } catch (error: any) {
      toast({
        title: "Error al crear perfil",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          ¡Completa tu perfil de DJ!
        </CardTitle>
        <CardDescription>
          Configura tu información para empezar a recibir solicitudes musicales
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stage_name">Nombre Artístico *</Label>
            <Input
              id="stage_name"
              value={formData.stage_name}
              onChange={(e) => setFormData({ ...formData, stage_name: e.target.value })}
              placeholder="Ej: DJ Pulse"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografía</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Cuéntanos sobre tu estilo musical y experiencia..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minimum_tip" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Propina Mínima (USD) *
            </Label>
            <Input
              id="minimum_tip"
              type="number"
              step="0.01"
              min="1.00"
              value={formData.minimum_tip}
              onChange={(e) => setFormData({ ...formData, minimum_tip: e.target.value })}
              required
            />
          </div>

          <Button 
            type="submit" 
            variant="hero" 
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creando perfil...
              </>
            ) : (
              "Crear Perfil DJ"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DJProfileSetup;