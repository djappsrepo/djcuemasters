import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPage = () => {
    return (
    <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
        <Card className="bg-card/70 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">Política de Privacidad</CardTitle>
            <p className="text-muted-foreground">Última actualización: 31 de Julio de 2025</p>
          </CardHeader>
          <CardContent>
            <main className="prose prose-invert lg:prose-xl mx-auto">
              <h2>1. Información que Recopilamos</h2>
              <p>Recopilamos información que usted nos proporciona directamente, como su nombre, correo electrónico y rol (DJ o Cliente) al crear una cuenta. También recopilamos datos de transacciones a través de Stripe, pero no almacenamos los detalles de su tarjeta de crédito.</p>

              <h2>2. Cómo Usamos su Información</h2>
              <p>Utilizamos su información para:</p>
              <ul>
                <li>Proveer, mantener y mejorar la Plataforma.</li>
                <li>Procesar transacciones y enviarle información relacionada.</li>
                <li>Comunicarnos con usted sobre productos, servicios y eventos.</li>
                <li>Monitorear y analizar tendencias, uso y actividades.</li>
              </ul>

              <h2>3. Cómo Compartimos su Información</h2>
              <p>No compartimos su información personal con terceros, excepto en los siguientes casos:</p>
              <ul>
                <li>Con proveedores de servicios como Stripe para procesar pagos.</li>
                <li>Si es requerido por ley o para proteger nuestros derechos.</li>
                <li>Con su consentimiento.</li>
              </ul>

              <h2>4. Seguridad</h2>
              <p>Tomamos medidas razonables para proteger su información personal. Sin embargo, ningún método de transmisión por Internet o de almacenamiento electrónico es 100% seguro.</p>

              <h2>5. Cookies</h2>
              <p>Utilizamos cookies para mejorar su experiencia en la Plataforma. Puede configurar su navegador para que rechace las cookies, pero algunas funciones de la Plataforma pueden no funcionar correctamente.</p>

              <h2>6. Sus Derechos</h2>
              <p>Usted tiene derecho a acceder, corregir o eliminar su información personal. Puede hacerlo a través de la configuración de su cuenta o contactándonos directamente.</p>

              <h2>7. Cambios a esta Política</h2>
              <p>Podemos actualizar esta política de privacidad de vez en cuando. Le notificaremos de cualquier cambio publicando la nueva política en esta página.</p>
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

export default PrivacyPage;
