import { createContext, useContext, useState } from "react";
import { LogoPng } from "../imports/icons";

const QRCodeContext = createContext();

export function QRCodeProvider({ children }) {
  const [qrText, setQrText] = useState({
    name: "https://www.jeviqr.com",
    qrTextSize: 20,
    fontWeight: 900,
    textDecoration: "",
    visible: true,
    fontColor: "#555555",
  });
  const [customName, setCustomName] = useState({
    name: "JeviQR.com",
    title: "",
    customNameSize: 50,
    fontWeight: 700,
    textDecoration: "underline",
    visible: true,
    fontColor: "#ff9500",
  });
  const [style, setStyle] = useState({
    border: 10,
    radius: 50,
    borderColor: "#ff9500",
    qrCodeSize: 240,
    qrBgColor: "#ffffff",
    qrMarginSize: 2,
    qrCodeColor: "#000000",
    qrCodeLevel: "M",
    qrLogoWidth: 100,
    qrLogoHeight: 100,
    qrLogo: undefined,
    qrLogoOpacity: 1,
    excavate: true,
  });
  return (
    <QRCodeContext.Provider
      value={{ qrText, setQrText, customName, setCustomName, style, setStyle }}
    >
      {children}
    </QRCodeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQRCode() {
  return useContext(QRCodeContext);
}
