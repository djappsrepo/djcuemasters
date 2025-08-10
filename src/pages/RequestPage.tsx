import { useParams } from "react-router-dom";
import { useDJPublicProfile } from "@/hooks/useDJPublicProfile";
import { useRequestForm } from "@/hooks/useRequestForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UnifiedLoader } from '@/components/ui/UnifiedLoader';
import { Music } from "lucide-react";
import { CheckoutForm } from "@/components/page-components/request/CheckoutForm";
import { DjProfileCard } from "@/components/page-components/request/DjProfileCard";
import { RequestForm } from "@/components/page-components/request/RequestForm";

const RequestPage = () => {
  const { djId } = useParams<{ djId: string }>();
  
  const { djProfile, djEvents, loading } = useDJPublicProfile(djId);
  const {
    formData,
    setFormData,
    submitting,
    clientSecret,
    currentRequestId,
    agreedToTerms,
    setAgreedToTerms,
    handleSubmit
  } = useRequestForm({ djProfile, djEvents });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <UnifiedLoader variant="spinner" size="lg" />
      </div>
    );
  }

  if (!djProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">DJ no encontrado</h2>
          <p className="text-muted-foreground">El perfil de este DJ no está disponible o no existe.</p>
        </div>
      </div>
    );
  }

  const activeEvent = djEvents.find(event => event.id === formData.event_id) || (djEvents.length > 0 ? djEvents[0] : null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <DjProfileCard djProfile={djProfile} activeEvent={activeEvent} />
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Music className="w-6 h-6 text-primary" />
                  <h2 className="text-xl">Haz tu Solicitud Musical</h2>
                </div>
                <p className="text-muted-foreground">
                  Completa el formulario para enviar tu canción y propina al DJ.
                </p>
              </CardHeader>
              <CardContent>
                {clientSecret && currentRequestId ? (
                  <CheckoutForm requestId={currentRequestId} clientSecret={clientSecret} />
                ) : (
                  <RequestForm 
                    djProfile={djProfile}
                    djEvents={djEvents}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    isSubmitting={submitting}
                    agreedToTerms={agreedToTerms}
                    setAgreedToTerms={setAgreedToTerms}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;