import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Users, BarChart3, DollarSign } from 'lucide-react';

export const AdminView = () => {
  return (
    <div className="mb-8">
      <Card className="border-primary/20 bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Panel de Administrador
          </CardTitle>
          <CardDescription>
            Acceso completo al sistema - gestión global de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Users className="w-6 h-6 mb-2" />
              <span>Gestionar DJs</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span>Analytics Global</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <DollarSign className="w-6 h-6 mb-2" />
              <span>Gestión Stripe</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
