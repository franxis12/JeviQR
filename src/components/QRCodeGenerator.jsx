import { QRCodeCanvas } from "qrcode.react";
import { useQRCode } from "../context/QRCodeContext.jsx";

function QRCodeGenerator() {
  const { qrText, style } = useQRCode();

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <QRCodeCanvas
        value={qrText.name}
        imageSettings={{
          src: style.qrLogo, //"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png", // Replace with your logo URL
          x: undefined, // Center the image horizontally
          y: undefined, // Center the image vertically
          height: style.qrLogoHeight,
          width: style.qrLogoWidth,
          excavate: style.excavate,
          opacity: style.qrLogoOpacity,
        }}
        size={style.qrCodeSize} // tamaño del QR
        bgColor={style.qrBgColor}
        fgColor={style.qrCodeColor}
        level={style.qrCodeLevel} // nivel de corrección de errores (L, M, Q, H)
        marginSize={style.qrMarginSize}
        style={{
          borderWidth: style.border,
          borderColor: style.borderColor,
          borderRadius: style.radius,
        }}
      />
    </div>
  );
}

export default QRCodeGenerator;
