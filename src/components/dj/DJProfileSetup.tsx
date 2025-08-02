import { useDJProfileSetup } from "@/hooks/useDJProfileSetup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, DollarSign, Loader2, Save, MapPin } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { DJQRCodeSection } from "./DJQRCodeSection";
import { DeleteAccountSection } from "./DeleteAccountSection";

const DJProfileSetup = () => {
  const { 
    loading, 
    formData, 
    isEditing, 
    handleInputChange, 
    handleSubmit 
  } = useDJProfileSetup();
  const { user } = useAuth();

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
            <Label htmlFor="location_address">Ubicación Base</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="location_address"
                value={formData.location_address || ''}
                onChange={handleInputChange}
                placeholder="Ej: Ciudad de México, México"
                className="pl-10"
              />
            </div>
            <p className="text-sm text-muted-foreground">Tu ciudad o área principal. Esto ayudará a los clientes a encontrarte.</p>
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

      {isEditing && user && (
        <div className="p-6 pt-0">
          <DJQRCodeSection userId={user.id} />
        </div>
      )}

      {isEditing && <DeleteAccountSection />}
    </Card>
  );
};

export default DJProfileSetup;