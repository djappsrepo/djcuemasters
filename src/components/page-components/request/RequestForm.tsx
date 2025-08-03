import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Loader2, Send } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Tables } from "@/integrations/supabase/types";
import { useRequestForm } from '@/hooks/request/use-request-form';
import { useEffect } from 'react';

type DJProfile = Tables<'dj_profiles'>;
type DJEvent = Tables<'dj_events'>;

interface RequestFormProps {
  djProfile: DJProfile;
  djEvents: DJEvent[];
  onSubmitSuccess: (clientSecret: string, requestId: string) => void;
}

export const RequestForm = ({ djProfile, djEvents, onSubmitSuccess }: RequestFormProps) => {
  const {
    formData,
    submitting: isSubmitting,
    clientSecret,
    currentRequestId,
    agreedToTerms,
    setAgreedToTerms,
    handleSubmit: onSubmit,
    handleInputChange
  } = useRequestForm({ djProfile, djEvents });

  useEffect(() => {
    if (clientSecret && currentRequestId) {
      onSubmitSuccess(clientSecret, currentRequestId);
    }
  }, [clientSecret, currentRequestId, onSubmitSuccess]);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="song_title">Título de la Canción *</Label>
          <Input id="song_title" value={formData.song_title} onChange={handleInputChange} placeholder="Ej: Despacito" required disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="artist_name">Artista *</Label>
          <Input id="artist_name" value={formData.artist_name} onChange={handleInputChange} placeholder="Ej: Luis Fonsi" required disabled={isSubmitting} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client_name">Tu Nombre *</Label>
          <Input id="client_name" value={formData.client_name} onChange={handleInputChange} placeholder="Ej: María García" required disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client_email">Tu Email (opcional)</Label>
          <Input id="client_email" type="email" value={formData.client_email} onChange={handleInputChange} placeholder="maria@email.com" disabled={isSubmitting} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tip_amount" className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Propina (USD) *
        </Label>
        <Input id="tip_amount" type="number" step="0.01" min={djProfile?.minimum_tip ?? 1} value={formData.tip_amount} onChange={handleInputChange} required disabled={isSubmitting} />
        <p className="text-xs text-muted-foreground">
          Mínimo: ${djProfile?.minimum_tip?.toFixed(2) ?? '1.00'}
        </p>
      </div>

      {djEvents.length > 1 && (
        <div className="space-y-2">
          <Label htmlFor="event_id">Evento</Label>
          <select id="event_id" value={formData.event_id} onChange={handleInputChange} className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm" disabled={isSubmitting}>
            {djEvents.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">Mensaje (opcional)</Label>
        <Textarea id="message" value={formData.message} onChange={handleInputChange} placeholder="¿Alguna dedicatoria o comentario especial?" rows={3} disabled={isSubmitting} />
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <Checkbox 
          id="request-terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          disabled={isSubmitting}
        />
        <label
          htmlFor="request-terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          He leído y acepto los <Link to="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">términos de servicio</Link>.
        </label>
      </div>

      <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting || !agreedToTerms}>
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Iniciando pago...</>
        ) : (
          <><Send className="w-4 h-4 mr-2" /> Continuar al Pago (${parseFloat(formData.tip_amount || '0').toFixed(2)})</>
        )}
      </Button>
    </form>
  );
};
