import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

function DownloadableQR({ value, size = 256 }) {
  const qrRef = useRef(null);

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "jeviQR.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={qrRef}>
        <QRCodeCanvas
          value={value}
          size={size}
          bgColor="#ffffff"
          fgColor="#000000"
          level="M"
        />
      </div>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Descargar PNG
      </button>
    </div>
  );
}

export default DownloadableQR;
