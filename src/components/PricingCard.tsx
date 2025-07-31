import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export const PricingCard = ({ 
  title, 
  price, 
  period, 
  features, 
  highlighted = false,
  badge 
}: PricingCardProps) => {
  return (
    <Card className={`relative border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card ${
      highlighted ? 'border-primary bg-gradient-card shadow-glow' : ''
    }`}>
      {badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-primary text-background px-4 py-1 rounded-full text-sm font-semibold">
            {badge}
          </span>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold text-primary">{price}</span>
          <span className="text-muted-foreground ml-1">/{period}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className="w-full" 
          variant={highlighted ? "hero" : "outline"}
          size="lg"
        >
          Comenzar Ahora
        </Button>
      </CardContent>
    </Card>
  );
};