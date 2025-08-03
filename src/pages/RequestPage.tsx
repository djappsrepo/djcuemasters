import { useParams } from "react-router-dom";
import { useDJPublicProfile } from "@/hooks/dj/use-dj-public-profile";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Tables } from '@/types';
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Music } from "lucide-react";
import { CheckoutForm } from "@/components/page-components/request/CheckoutForm";
import { DjProfileCard } from "@/components/page-components/request/DjProfileCard";
import { RequestForm } from "@/components/page-components/request/RequestForm";

const RequestPage = () => {
  const { djId } = useParams<{ djId: string }>();
  const { djProfile, djEvents, loading } = useDJPublicProfile(djId);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);

  const handleSuccess = (secret: string, reqId: string) => {
    setClientSecret(secret);
    setCurrentRequestId(reqId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LoadingSpinner size={80} />
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

  const activeEvent = djEvents.length > 0 ? djEvents[0] : null; // Simplified logic, can be enhanced later if needed

    return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <DjProfileCard djProfile={djProfile} activeEvent={activeEvent} />
          </div>

          <div className="lg:col-span-2">
                        <Card className="bg-card/70 backdrop-blur-sm border-white/20">
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
                    onSubmitSuccess={handleSuccess}
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