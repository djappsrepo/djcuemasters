import djIcon from "@/assets/dj-icon.jpg";
import { Link } from 'react-router-dom';
import { Twitter, MessageSquare, Phone } from 'lucide-react';

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
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="https://wa.me/5215512345678" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a href="https://x.com/DjWackoCDMX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Twitter className="w-4 h-4" />
                  <span>Twitter / X</span>
                </a>
              </li>
              <li>
                <a href="https://discord.com/api/webhooks/1400542750515920937/p5H9wZuvig66s9H-l3UXmLdvnkJNh34hxJohsBJFfiEjD_7CfEHE7bTfeAFR4rBBp7nJ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>Discord</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CueMasters DJ. Todos los derechos reservados.</p>
        <div className="mt-2">
          <Link to="/terms" className="text-sm text-gray-400 hover:text-white mx-2">Términos de Servicio</Link>
          <span className="text-gray-600">|</span>
          <Link to="/privacy" className="text-sm text-gray-400 hover:text-white mx-2">Política de Privacidad</Link>
        </div>
        </div>
      </div>
    </footer>
  );
};
