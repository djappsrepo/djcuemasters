import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Zap, Shield, BarChart3, Crown, Heart } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Monetización Directa",
    description: "Convierte cada solicitud en ingresos adicionales con el sistema de propinas integrado.",
  },
  {
    icon: Zap,
    title: "Priorización Inteligente",
    description: "Las solicitudes se ordenan automáticamente por monto de propina y tiempo.",
  },
  {
    icon: Shield,
    title: "Seguridad Total",
    description: "Sistema de roles y permisos que protege tu panel y datos financieros.",
  },
  {
    icon: BarChart3,
    title: "Analytics Avanzado",
    description: "Estadísticas detalladas de ingresos, canciones más solicitadas y engagement.",
  },
  {
    icon: Crown,
    title: "Control Total",
    description: "Configura montos mínimos, horarios de funcionamiento y preferencias musicales.",
  },
  {
    icon: Heart,
    title: "Conexión Real",
    description: "Fortalece la relación con tu audiencia a través de interacciones directas.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const BenefitsSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Todo lo que Necesitas en un Solo Lugar</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Desde la monetización hasta el análisis de datos, CueMasters te da el poder de gestionar tus eventos de forma profesional.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-gray-800/50 border-gray-700 h-full hover:border-purple-500 hover:bg-gray-800 transition-all duration-300 shadow-lg">
                  <CardHeader className="flex-row items-center gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-100">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
