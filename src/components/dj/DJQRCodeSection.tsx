import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download } from 'lucide-react';

interface DJQRCodeSectionProps {
  userId: string;
}

export const DJQRCodeSection = ({ userId }: DJQRCodeSectionProps) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const profileUrl = `${window.location.origin}/request/${userId}`;

  const handleDownload = () => {
    const canvas = qrCodeRef.current?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'my-cue-qr-code.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  if (!userId) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tu Código QR Personal</CardTitle>
        <CardDescription>
          Tus clientes pueden escanear este código para acceder directamente a tu página de solicitudes. Compártelo en tus redes o imprímelo.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div
          ref={qrCodeRef}
          className="p-4 bg-white rounded-lg shadow-md"
          aria-label={`QR code for ${profileUrl}`}
        >
          <QRCodeCanvas
            value={profileUrl}
            size={256}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}
            includeMargin={true}
          />
        </div>
        <Button onClick={handleDownload} className="w-full max-w-xs">
          <Download className="w-4 h-4 mr-2" />
          Descargar QR
        </Button>
      </CardContent>
    </Card>
  );
};
