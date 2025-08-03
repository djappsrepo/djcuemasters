import { useRef } from 'react';

export const useDJQRCodeSection = (userId: string) => {
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

  return {
    qrCodeRef,
    profileUrl,
    handleDownload,
  };
};
