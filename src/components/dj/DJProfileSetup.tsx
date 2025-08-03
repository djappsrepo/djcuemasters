import { useDJProfileSetup } from "@/hooks/useDJProfileSetup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DJQRCodeSection } from "./DJQRCodeSection";
import { DeleteAccountSection } from "./DeleteAccountSection";
import { useAuth } from "@/hooks/useAuth";

const DJProfileSetup = () => {
  const { 
    loading, 
    formData, 
    isEditing, 
    handleInputChange, 
    handleSubmit,
    isDonating,
    handleSupportProject
  } = useDJProfileSetup();
  
  const { user } = useAuth(); // Needed for QR Code and Delete Section

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {isEditing ? 'Actualizar Perfil de DJ' : 'Completa tu Perfil de DJ'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing && (
          <Alert className="mb-6 bg-secondary border-l-4 border-primary text-secondary-foreground">
            <AlertTitle className="font-bold text-lg">¡Campaña para Fundadores!</AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <p>
                Apoya el proyecto con una donación única de $5 USD y obtén una membresía de Fundador de por vida, acceso prioritario a nuevas funciones y un lugar especial en nuestros créditos.
              </p>
              <p>
                ¡Tu apoyo nos ayuda a crecer y mejorar la plataforma para todos!
              </p>
              <Button 
                className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                onClick={handleSupportProject}
                disabled={isDonating}
              >
                {isDonating ? 'Procesando...' : 'Apoyar y Obtener Beneficios'}
              </Button>
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="stage_name">Nombre de DJ (Stage Name)</Label>
            <Input id="stage_name" value={formData.stage_name || ''} onChange={handleInputChange} placeholder="Ej: DJ Beatmaster" required />
          </div>
          <div>
            <Label htmlFor="bio">Biografía</Label>
            <Textarea id="bio" value={formData.bio || ''} onChange={handleInputChange} placeholder="Cuéntanos sobre tu estilo musical, experiencia..." />
          </div>
          <div>
            <Label htmlFor="minimum_tip">Propina Mínima Sugerida (USD)</Label>
            <Input id="minimum_tip" type="number" step="0.01" min="0" value={formData.minimum_tip || 0} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="location_address">Ubicación (Ciudad, Estado, País)</Label>
            <Input id="location_address" value={formData.location_address || ''} onChange={handleInputChange} placeholder="Ej: Miami, FL, USA" />
          </div>
          <Button type="submit" className="w-full font-semibold" disabled={loading}>
            {loading ? 'Guardando...' : (isEditing ? 'Actualizar Perfil' : 'Guardar y Continuar')}
          </Button>
        </form>
        
        {isEditing && user && (
          <div className="mt-6">
            <DJQRCodeSection userId={user.id} />
            <DeleteAccountSection />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DJProfileSetup;