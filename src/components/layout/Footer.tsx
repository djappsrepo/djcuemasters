import djIcon from "@/assets/dj-icon.jpg";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={djIcon} alt="CueFlow" className="w-8 h-8 rounded" />
              <span className="text-lg font-bold text-foreground">CueFlow</span>
            </div>
            <p className="text-muted-foreground text-sm">
              La plataforma de solicitudes musicales más avanzada para DJs profesionales.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Para DJs</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Registro DJ</li>
              <li>Panel de Control</li>
              <li>Monetización</li>
              <li>Analytics</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Guía de Uso</li>
              <li>Demo en Vivo</li>
              <li>Soporte 24/7</li>
              <li>Blog</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>hello@cueflow.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Discord Community</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CueFlow. Todos los derechos reservados. Hecho con ❤️ para DJs.</p>
        </div>
      </div>
    </footer>
  );
};
