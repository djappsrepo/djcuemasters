import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Loader2, Send } from "lucide-react";
import { DJProfile, DJEvent } from '@/types';

interface FormData {
  song_title: string;
  artist_name: string;
  client_name: string;
  client_email: string;
  tip_amount: string;
  message: string;
  event_id: string;
}

interface RequestFormProps {
  djProfile: DJProfile;
  djEvents: DJEvent[];
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const RequestForm = ({ djProfile, djEvents, formData, setFormData, onSubmit, isSubmitting }: RequestFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="song_title">Título de la Canción *</Label>
          <Input id="song_title" value={formData.song_title} onChange={(e) => setFormData({ ...formData, song_title: e.target.value })} placeholder="Ej: Despacito" required disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="artist_name">Artista *</Label>
          <Input id="artist_name" value={formData.artist_name} onChange={(e) => setFormData({ ...formData, artist_name: e.target.value })} placeholder="Ej: Luis Fonsi" required disabled={isSubmitting} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client_name">Tu Nombre *</Label>
          <Input id="client_name" value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} placeholder="Ej: María García" required disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client_email">Tu Email (opcional)</Label>
          <Input id="client_email" type="email" value={formData.client_email} onChange={(e) => setFormData({ ...formData, client_email: e.target.value })} placeholder="maria@email.com" disabled={isSubmitting} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tip_amount" className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Propina (USD) *
        </Label>
        <Input id="tip_amount" type="number" step="0.01" min={djProfile.minimum_tip} value={formData.tip_amount} onChange={(e) => setFormData({ ...formData, tip_amount: e.target.value })} required disabled={isSubmitting} />
        <p className="text-xs text-muted-foreground">
          Mínimo: ${djProfile.minimum_tip.toFixed(2)}
        </p>
      </div>

      {djEvents.length > 1 && (
        <div className="space-y-2">
          <Label htmlFor="event_id">Evento</Label>
          <select id="event_id" value={formData.event_id} onChange={(e) => setFormData({ ...formData, event_id: e.target.value })} className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm" disabled={isSubmitting}>
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
        <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="¿Alguna dedicatoria o comentario especial?" rows={3} disabled={isSubmitting} />
      </div>

      <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Iniciando pago...</>
        ) : (
          <><Send className="w-4 h-4 mr-2" /> Continuar al Pago (${parseFloat(formData.tip_amount || '0').toFixed(2)})</>
        )}
      </Button>
    </form>
  );
};
