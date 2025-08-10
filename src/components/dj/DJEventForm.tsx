import { useDJEventForm } from '@/hooks/useDJEventForm';
import type { Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ArrowLeft, Calendar, MapPin } from 'lucide-react';

type DJEvent = Tables<'dj_events'>;

interface DJEventFormProps {
  eventToEdit?: DJEvent | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const DJEventForm = ({ eventToEdit, onSuccess, onCancel }: DJEventFormProps) => {
  const {
    loading,
    formData,
    isEditing,
    handleInputChange,
    handleSubmit,
  } = useDJEventForm({ eventToEdit, onSuccess });

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onCancel} aria-label="Volver">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle>{isEditing ? 'Editar Evento' : 'Crear Nuevo Evento'}</CardTitle>
            <CardDescription>{isEditing ? 'Modifica los detalles de tu evento.' : 'Configura un nuevo evento para recibir solicitudes.'}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Evento *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ej: Noche de Salsa en La Terraza"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue" className="flex items-center gap-2"><MapPin className="w-4 h-4" />Lugar/Venue</Label>
            <Input
              id="venue"
              value={formData.venue}
              onChange={handleInputChange}
              placeholder="Ej: Club La Terraza"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event_date" className="flex items-center gap-2"><Calendar className="w-4 h-4" />Fecha y Hora</Label>
            <Input
              id="event_date"
              type="datetime-local"
              value={formData.event_date}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe tu evento, estilo musical, etc..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="w-full">
              Cancelar
            </Button>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{isEditing ? 'Guardando...' : 'Creando...'}</>
              ) : (
                isEditing ? 'Guardar Cambios' : 'Crear Evento'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DJEventForm;