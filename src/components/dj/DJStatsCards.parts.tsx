import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const StatCardSkeleton = () => (
  <Card>
    <CardHeader className="pb-2">
      <Skeleton className="h-4 w-2/3" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-7 w-1/3 mb-2" />
      <Skeleton className="h-3 w-1/2" />
    </CardContent>
  </Card>
);

interface ErrorDisplayProps {
  error: Error;
}

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => (
  <Alert variant="destructive" className="md:col-span-2 lg:col-span-4">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>Error al cargar estadísticas</AlertTitle>
    <AlertDescription>{error.message}</AlertDescription>
  </Alert>
);
