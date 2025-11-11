import { useUser } from "../context/UserContext";
import SEO from "../components/SEO.jsx";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Canvas from "../components/Canvas.jsx";
import ToolsMenu from "../components/ToolsMenu.jsx";
import { useState } from "react";
import { myImages } from "../imports/images.js";

function Dashboard() {
  const { user } = useUser();
  const [customName, setCustomName] = useState("");
  const { bg: BgPattern } = myImages;
  return (
    <>
      <SEO
        title="JeviQR | Dashboard and analytics for your QR codes"
        description="Manage your QR codes, monitor real-time metrics, and control campaigns inside the JeviQR dashboard."
        url="https://jeviqr.com/dashboard"
      />

      <div className="relative min-h-screen w-full overflow-hidden">
        <BgPattern
          className="pointer-events-none text-(--text-color)/35  absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 2000, height: 1800 }}
        />
        <div className={`flex  `}>
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
      </div>
    </>
  );
}

export default Dashboard;
