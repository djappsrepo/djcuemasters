import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Music, Search, QrCode } from "lucide-react";
import DJDiscovery from "@/components/discovery/DJDiscovery";

const DiscoveryPage = () => {
  const navigate = useNavigate();
  const [djCode, setDjCode] = useState("");

  const handleQuickAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (djCode.trim()) {
      // Aquí podríamos implementar búsqueda por código o ID
      // Por ahora, asumimos que es un user_id
      navigate(`/request/${djCode.trim()}`);
    }
  };

    return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">CueMasters</h1>
              <p className="text-xs text-muted-foreground">Descubre DJs</p>
            </div>
          </div>
          
          <Button variant="outline" onClick={() => navigate('/')}>
            Inicio
          </Button>
        </div>
      </header>

            <main className="container mx-auto px-4 py-8">
        {/* Acceso rápido */}
        <Card className="max-w-md mx-auto mb-8 border-primary/20 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-primary" />
              Acceso Rápido
            </CardTitle>
            <CardDescription>
              ¿Tienes el código o enlace de un DJ específico?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleQuickAccess} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dj_code">Código o ID del DJ</Label>
                <Input
                  id="dj_code"
                  value={djCode}
                  onChange={(e) => setDjCode(e.target.value)}
                  placeholder="Ingresa el código del DJ"
                />
              </div>
              <Button type="submit" variant="hero" className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Buscar DJ
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Descubrimiento de DJs */}
                <DJDiscovery />
      </main>
    </div>
  );
};

export default DiscoveryPage;