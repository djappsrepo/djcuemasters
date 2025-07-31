import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Calendar, MapPin } from 'lucide-react';

type DJEvent = Tables<'dj_events'>;

interface DJEventFormProps {
  eventToEdit?: DJEvent | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const DJEventForm = ({ eventToEdit, onSuccess, onCancel }: DJEventFormProps) => {
  const { djProfile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    venue: '',
    event_date: ''
  });

  const isEditing = !!eventToEdit;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: eventToEdit.name || '',
        description: eventToEdit.description || '',
        venue: eventToEdit.venue || '',
        event_date: eventToEdit.event_date ? new Date(eventToEdit.event_date).toISOString().substring(0, 16) : ''
      });
    }
  }, [eventToEdit, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!djProfile?.id) {
      toast({ title: 'Error de autenticación', description: 'No se encontró tu perfil de DJ.', variant: 'destructive' });
      return;
    }

    setLoading(true);

    const eventData = {
      dj_id: djProfile.id,
      name: formData.name.trim(),
      description: formData.description.trim() || null,
      venue: formData.venue.trim() || null,
      event_date: formData.event_date ? new Date(formData.event_date).toISOString() : null,
      is_active: eventToEdit?.is_active ?? true,
    };

    const { error } = isEditing
      ? await supabase.from('dj_events').update(eventData).eq('id', eventToEdit.id)
      : await supabase.from('dj_events').insert(eventData);

    setLoading(false);

    if (error) {
      toast({ title: `Error al ${isEditing ? 'actualizar' : 'crear'} el evento`, description: error.message, variant: 'destructive' });
    } else {
      toast({ title: `¡Evento ${isEditing ? 'actualizado' : 'creado'}!`, description: `El evento ha sido ${isEditing ? 'actualizado' : 'creado'} correctamente.` });
      onSuccess();
    }
  };

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