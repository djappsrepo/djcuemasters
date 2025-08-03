import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DJQRCodeSection } from "./DJQRCodeSection";
import { DeleteAccountSection } from "./DeleteAccountSection";
import type { DJProfileFormData } from '@/hooks/dj/use-dj-profile-setup';

// --- Founders Campaign Alert ---
interface FoundersCampaignAlertProps {
  isDonating: boolean;
  onSupportProject: () => void;
}

export const FoundersCampaignAlert = ({ isDonating, onSupportProject }: FoundersCampaignAlertProps) => (
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
        onClick={onSupportProject}
        disabled={isDonating}
      >
        {isDonating ? 'Procesando...' : 'Apoyar y Obtener Beneficios'}
      </Button>
    </AlertDescription>
  </Alert>
);

// --- Profile Form ---
interface ProfileFormProps {
  formData: DJProfileFormData;
  loading: boolean;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ProfileForm = ({ formData, loading, isEditing, onInputChange, onSubmit }: ProfileFormProps) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <Label htmlFor="stage_name">Nombre de DJ (Stage Name)</Label>
      <Input id="stage_name" value={formData.stage_name || ''} onChange={onInputChange} placeholder="Ej: DJ Beatmaster" required />
    </div>
    <div>
      <Label htmlFor="bio">Biografía</Label>
      <Textarea id="bio" value={formData.bio || ''} onChange={onInputChange} placeholder="Cuéntanos sobre tu estilo musical, experiencia..." />
    </div>
    <div>
      <Label htmlFor="minimum_tip">Propina Mínima Sugerida (USD)</Label>
      <Input id="minimum_tip" type="number" step="0.01" min="0" value={formData.minimum_tip || 0} onChange={onInputChange} />
    </div>
    <div>
      <Label htmlFor="location_address">Ubicación (Ciudad, Estado, País)</Label>
      <Input id="location_address" value={formData.location_address || ''} onChange={onInputChange} placeholder="Ej: Miami, FL, USA" />
    </div>
    <Button type="submit" className="w-full font-semibold" disabled={loading}>
      {loading ? 'Guardando...' : (isEditing ? 'Actualizar Perfil' : 'Guardar y Continuar')}
    </Button>
  </form>
);

// --- Profile Management Sections ---
interface ProfileManagementSectionsProps {
  userId: string;
}

export const ProfileManagementSections = ({ userId }: ProfileManagementSectionsProps) => (
  <div className="mt-6">
    <DJQRCodeSection userId={userId} />
    <DeleteAccountSection />
  </div>
);
