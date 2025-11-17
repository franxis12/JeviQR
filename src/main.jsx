import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { QRCodeProvider } from "../src/context/QRCodeContext.jsx";
import { PageContextProvider } from "../src/context/PageContext.jsx";
import { ModeCanvasContextProvider } from "./context/ModeCanvas.jsx";
import { ZplContextProvider } from "./context/ZplContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ZplContextProvider>
        <ModeCanvasContextProvider>
          <QRCodeProvider>
            <PageContextProvider>
              <App />
            </PageContextProvider>
          </QRCodeProvider>
        </ModeCanvasContextProvider>
      </ZplContextProvider>
    </UserProvider>
  </StrictMode>
);
