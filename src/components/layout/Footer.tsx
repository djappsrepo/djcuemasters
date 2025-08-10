import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';
import CueMastersLogo from '@/assets/cuemastersdj_logo_eq_animated.svg';

const socialLinks = [
  { icon: Twitter, href: 'https://x.com/DjWackoCDMX', name: 'Twitter' },
  { icon: Instagram, href: '#', name: 'Instagram' },
  { icon: Facebook, href: '#', name: 'Facebook' },
  { icon: Youtube, href: '#', name: 'YouTube' },
];

const footerLinks = {
  'Producto': [
    { name: 'Características', href: '#' },
    { name: 'Precios', href: '#' },
    { name: 'Demo en Vivo', href: '#' },
    { name: 'Iniciar Sesión', href: '/login' },
  ],
  'Empresa': [
    { name: 'Sobre Nosotros', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contacto', href: '#' },
  ],
  'Legal': [
    { name: 'Términos de Servicio', href: '/terms' },
    { name: 'Política de Privacidad', href: '/privacy' },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={CueMastersLogo} alt="CueMasters Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold text-white">CueMasters</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Potenciando la conexión entre DJs y su audiencia a través de la música.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white text-lg mb-4 tracking-wide">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.name}>
                    <Link to={link.href} className="hover:text-white transition-colors duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-center sm:text-left mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} CueMasters. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-4">
            {socialLinks.map(social => (
              <a key={social.name} href={social.href} className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300">
                <social.icon className="w-6 h-6" />
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
