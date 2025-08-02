import { useRef } from 'react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download } from 'lucide-react';

interface DJQRCodeSectionProps {
  userId: string;
}

export const DJQRCodeSection = ({ userId }: DJQRCodeSectionProps) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const profileUrl = `${window.location.origin}/dj/${userId}`;

  const handleDownload = () => {
    const svg = qrCodeRef.current?.querySelector('svg');
    if (!svg) {
      console.error("QR Code SVG not found");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return;
    }
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `cue-masters-qr-code.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <Card className="w-full max-w-md bg-card/70 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle>Your QR Code</CardTitle>
        <CardDescription>
          Fans can scan this to go directly to your request page.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div
          ref={qrCodeRef}
          className="p-4 bg-white rounded-lg shadow-md"
          aria-label={`QR code for ${profileUrl}`}
        >
          <QRCode
            value={profileUrl}
            size={256}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}
          />
        </div>
        <Button onClick={handleDownload} className="w-full max-w-xs">
          <Download className="w-4 h-4 mr-2" />
          Download QR Code
        </Button>
      </CardContent>
    </Card>
  );
};
