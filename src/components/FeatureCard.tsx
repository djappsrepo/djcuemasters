import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: boolean;
}

export const FeatureCard = ({ icon: Icon, title, description, highlight }: FeatureCardProps) => {
  return (
    <Card className={`border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card ${
      highlight ? 'bg-gradient-card border-primary/20' : ''
    }`}>
      <CardContent className="p-6 text-center">
        <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
          highlight ? 'bg-gradient-primary' : 'bg-primary/10'
        }`}>
          <Icon className={`w-6 h-6 ${highlight ? 'text-background' : 'text-primary'}`} />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};