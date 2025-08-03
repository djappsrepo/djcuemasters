import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsPage = () => {
    return (
    <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
        <Card className="bg-card/70 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">Términos y Condiciones</CardTitle>
            <p className="text-muted-foreground">Última actualización: 31 de Julio de 2025</p>
          </CardHeader>
          <CardContent>
            <main className="prose prose-invert lg:prose-xl mx-auto">
              <h2>1. Aceptación de los Términos</h2>
              <p>Al acceder y utilizar CueMasters DJ App (la "Plataforma"), usted acepta estar sujeto a estos Términos y Condiciones y a nuestra Política de Privacidad. Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio.</p>

              <h2>2. Descripción del Servicio</h2>
              <p>La Plataforma permite a los usuarios ("Clientes") solicitar canciones y enviar propinas a los DJs durante eventos. Los DJs pueden gestionar estas solicitudes y recibir pagos a través de la integración con Stripe.</p>

              <h2>3. Cuentas de Usuario</h2>
              <p>Para utilizar ciertas funciones, debe registrarse y crear una cuenta. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. Se requiere una cuenta de Stripe para que los DJs reciban pagos.</p>

              <h2>4. Pagos y Propinas</h2>
              <p>Todas las transacciones se procesan a través de Stripe. La Plataforma no almacena la información de su tarjeta de crédito. Las propinas no son reembolsables, excepto a discreción del DJ o según lo exija la ley.</p>

              <h2>5. Conducta del Usuario</h2>
              <p>Usted se compromete a no utilizar la Plataforma para ningún propósito ilegal o prohibido. Se prohíbe el acoso, el discurso de odio y cualquier otra forma de comportamiento disruptivo.</p>

              <h2>6. Propiedad Intelectual</h2>
              <p>El contenido, el diseño y la funcionalidad de la Plataforma son propiedad exclusiva de sus creadores y están protegidos por las leyes de derechos de autor.</p>

              <h2>7. Limitación de Responsabilidad</h2>
              <p>La Plataforma se proporciona "tal cual". No garantizamos que el servicio sea ininterrumpido o libre de errores. En ningún caso seremos responsables de los daños directos o indirectos que surjan del uso de la Plataforma.</p>

              <h2>8. Cambios en los Términos</h2>
              <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Le notificaremos de cualquier cambio publicando los nuevos términos en esta página.</p>

              <h2>9. Contacto</h2>
              <p>Si tiene alguna pregunta sobre estos Términos, por favor contáctenos.</p>
            </main>
            <footer className="text-center mt-12 pt-8 border-t border-border">
              <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Ing. Juan Carlos Mendez N (Djwacko). Todos los derechos reservados.</p>
              <Link to="/" className="text-primary hover:underline mt-2 inline-block">Volver al inicio</Link>
            </footer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsPage;
