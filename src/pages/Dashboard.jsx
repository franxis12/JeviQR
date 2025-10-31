import { useUser } from "../context/UserContext";
import SEO from "../components/SEO.jsx";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Canvas from "../components/Canvas.jsx";

function Dashboard() {
  const { user } = useUser();
  console.log(user);
  return (
    <>
      <SEO
        title="JeviQR | Dashboard and analytics for your QR codes"
        description="Manage your QR codes, monitor real-time metrics, and control campaigns inside the JeviQR dashboard."
        url="https://jeviqr.com/dashboard"
      />
      <div className="flex w-screen h-dvh">
        <Sidebar user={user}></Sidebar>
        <div className="w-full h-dvh bg-amber-300 transition-all duration-900">
          <Header user={user}></Header>

          <Canvas user={user}></Canvas>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
