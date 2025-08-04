import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

const faqData = [
  {
    question: '¿Cómo funciona CueMasters DJ?',
    answer: 'Los invitados a un evento escanean un código QR para acceder a la página del DJ, donde pueden ver la lista de canciones y solicitar sus favoritas. El DJ recibe estas solicitudes en tiempo real en su panel de control.',
  },
  {
    question: '¿Necesito una cuenta para solicitar una canción?',
    answer: 'No, los invitados no necesitan crear una cuenta. Simplemente escanean el código QR y pueden empezar a interactuar con el DJ de inmediato.',
  },
  {
    question: '¿Qué planes están disponibles?',
    answer: 'Ofrecemos un plan gratuito con funcionalidades básicas y planes de suscripción premium que incluyen características avanzadas como personalización de perfil, estadísticas de eventos y más.',
  },
  {
    question: '¿Cómo puedo apoyar el proyecto?',
    answer: '¡Gracias por tu interés! Puedes apoyar el proyecto a través de una donación única desde tu panel de control. Tu apoyo nos ayuda a mantener y mejorar la plataforma.',
  },
];

export const FAQPage = () => {
  const [suggestion, setSuggestion] = React.useState('');

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    const mailtoLink = `mailto:soporte@cuemastersdj.com?subject=Sugerencia/Comentario para CueMasters DJ&body=${encodeURIComponent(suggestion)}`;
    window.location.href = mailtoLink;
    setSuggestion('');
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Preguntas Frecuentes y Sugerencias</h1>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Preguntas Frecuentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>¿Tienes alguna sugerencia?</CardTitle>
            <CardDescription>Nos encantaría escuchar tus ideas para mejorar CueMasters DJ. ¡Tu opinión es muy valiosa para nosotros!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSuggestionSubmit} className="space-y-4">
              <Textarea
                placeholder="Escribe tu comentario o sugerencia aquí..."
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                rows={5}
              />
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Enviar Sugerencia
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
