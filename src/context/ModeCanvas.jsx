import { createContext, useContext, useState } from "react";

const ModeCanvas = createContext();

export function ModeCanvasContextProvider({ children }) {
  const [modeCanvasActive, setModeCanvasActive] = useState("canvas");

  return (
    <ModeCanvas.Provider value={{ modeCanvasActive, setModeCanvasActive }}>
      {children}
    </ModeCanvas.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModeCanvas() {
  return useContext(ModeCanvas);
}
