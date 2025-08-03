import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { useDJQRCodeSection } from '@/hooks/use-dj-qr-code';
import { usePlatform } from '@/hooks/use-platform';

interface DJQRCodeSectionProps {
  userId: string;
}

export const DJQRCodeSection = ({ userId }: DJQRCodeSectionProps) => {
    const { qrCodeRef, profileUrl, handleDownload } = useDJQRCodeSection(userId);
  const { isNative } = usePlatform();

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
                {!isNative && (
          <Button onClick={handleDownload} className="w-full max-w-xs">
            <Download className="w-4 h-4 mr-2" />
            Download QR Code
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
