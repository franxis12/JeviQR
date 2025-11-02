import { createContext, useContext, useState } from "react";

const QRCodeContext = createContext();

export function QRCodeProvider({ children }) {
  const [qrText, setQrText] = useState("https://www.jeviqr.com");
  const [customName, setCustomName] = useState({
    name: "",
    customNameSize: 50,
    fontWeight: 200,
    textDecoration: {
      underline: "underline",
      overline: "overline",
      lineThrough: "line-through",
    },
  });
  const [style, setStyle] = useState({
    border: 15,
    margin: 0,
    radius: 25,
    borderColor: "#000000",
    qrCodeSize: 400,
    qrBgColor: "#ffffff",
    qrMarginSize: 2,
    qrCodeColor: "#000000",
    qrCodeLevel: "M",
    qrLogoWidth: 100,
    qrLogoHeight: 100,
    qrTextSize: 30,
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
