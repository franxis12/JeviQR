import { createContext, useContext, useState } from "react";

const ZplContext = createContext();

export function ZplContextProvider({ children }) {
  const [zplSetting, setZplSetting] = useState({
    qrData: "https://francismartinez.com",
    text: {
      title: "Francis",
      font: "0", // A, B, C, D, E, 0
      orientation: "N", //	•	N → normal,	R → rotado 90°, I → invertido 180°, B → 270°
      width: 100, //+30
      heigh: 100,
      x: 0,
      y: 0,
      textBox: {
        width: 400,
        maxLines: 3,
        lineSpacing: 20,
        justify: "C", //C-> Center, R,L,J
        hanging_indent: 0,
      },
    },
  });
  //
  return (
    <ZplContext.Provider value={{ zplSetting, setZplSetting }}>
      {children}
    </ZplContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useZPLSetting() {
  return useContext(ZplContext);
}
