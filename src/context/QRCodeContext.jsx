import { createContext, useContext, useState } from "react";

const QRCodeContext = createContext();

export function QRCodeProvider({ children }) {
  const [qrText, setQrText] = useState({
    name: "https://www.jeviqr.com",
    qrTextSize: 50,
    fontWeight: 900,
    textDecoration: "",
    visible: true,
    fontColor: "#555555",
  });
  const [customName, setCustomName] = useState({
    name: "JeviQR.com",
    customNameSize: 100,
    fontWeight: 700,
    textDecoration: "",
    visible: true,
    fontColor: "#ff9500",
  });
  const [style, setStyle] = useState({
    border: 15,
    margin: 0,
    radius: 50,
    borderColor: "#ff9500",
    qrCodeSize: 400,
    qrBgColor: "#ffffff",
    qrMarginSize: 2,
    qrCodeColor: "#000000",
    qrCodeLevel: "M",
    qrLogoWidth: 100,
    qrLogoHeight: 100,
    qrLogo: "",
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
