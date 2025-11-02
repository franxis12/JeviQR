import { useUser } from "../context/UserContext";
import SEO from "../components/SEO.jsx";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Canvas from "../components/Canvas.jsx";
import ToolsMenu from "../components/ToolsMenu.jsx";
import { QRCodeProvider } from "../context/QRCodeContext.jsx";
import { useState } from "react";

function Dashboard() {
  const { user } = useUser();
  const [customName, setCustomName] = useState("");
  return (
    <>
      <SEO
        title="JeviQR | Dashboard and analytics for your QR codes"
        description="Manage your QR codes, monitor real-time metrics, and control campaigns inside the JeviQR dashboard."
        url="https://jeviqr.com/dashboard"
      />
      <QRCodeProvider>
        <div className="flex w-screen h-screen overflow-hidden ">
          <Sidebar user={user}></Sidebar>
          <div className="w-full h-full transition-all duration-900">
            <Header user={user}></Header>
            <div className="w-full h-full flex  items-center justify-center   ">
              <Canvas customName={customName}></Canvas>
            </div>
            <ToolsMenu
              customName={customName}
              setCustomName={setCustomName}
            ></ToolsMenu>
          </div>
        </div>
      </QRCodeProvider>
    </>
  );
}

export default Dashboard;
