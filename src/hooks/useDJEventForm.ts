import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type DJEvent = Tables<'dj_events'>;

interface UseDJEventFormProps {
  eventToEdit?: DJEvent | null;
  onSuccess: () => void;
}

export const useDJEventForm = ({ eventToEdit, onSuccess }: UseDJEventFormProps) => {
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
    if (isEditing && eventToEdit) {
      setFormData({
        name: eventToEdit.name || '',
        description: eventToEdit.description || '',
        venue: eventToEdit.venue || '',
        event_date: eventToEdit.event_date 
          ? new Date(eventToEdit.event_date).toISOString().substring(0, 16) 
          : ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        venue: '',
        event_date: ''
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
      ? await supabase.from('dj_events').update(eventData).eq('id', eventToEdit!.id)
      : await supabase.from('dj_events').insert(eventData);

    setLoading(false);

    if (error) {
      toast({ title: `Error al ${isEditing ? 'actualizar' : 'crear'} el evento`, description: error.message, variant: 'destructive' });
    } else {
      toast({ title: `¡Evento ${isEditing ? 'actualizado' : 'creado'}!`, description: `El evento ha sido ${isEditing ? 'actualizado' : 'creado'} correctamente.` });
      onSuccess();
    }
  };

  return { loading, formData, isEditing, handleInputChange, handleSubmit };
};
