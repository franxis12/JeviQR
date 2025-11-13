import { useEffect, useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import { myImages } from "../imports/images";
import { Icon } from "../imports/icons";
import NavButton from "../utils/NavButton";
import { usePage } from "../context/PageContext";
import { signOut } from "../auth/auth";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const isMobile = useIsMobile();
  const isTable = useIsMobile(1024);
  const [expanded, setExpanded] = useState(isMobile);
  const { tap, setTap } = usePage();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  useEffect(() => {
    if (isTable || isMobile) {
      setExpanded(false);
    }
  }, [isTable, isMobile]);

  return (
    <div
      className={`gap-2 bg-(--interfaceColor) z-10 h-screen p-2 border-r border-slate-50/30 fixed flex flex-col justify-between  ${
        isMobile && expanded
          ? "w-50 -translate-x-1.5"
          : !isMobile
          ? "   "
          : "-translate-x-55"
      } md:relative  md:w-20 transition-all duration-300   ${
        expanded ? "md:w-50" : "md:w-20"
      }`}
    >
      <div>
        <button
          onClick={() => navigate("/landing")}
          className={` p-1 px-2 rounded-xl transition-all duration-400 w-120 ${
            isMobile && !expanded ? "absolute translate-x-55 " : "relative"
          } `}
        >
          <img
            src={myImages.logo}
            className="rounded-lg w-40"
            crossOrigin="anonymous"
            alt="logo"
          />
        </button>
      </div>
      <div className="w-full flex items-center justify-end">
        <button
          onClick={() => setExpanded(!expanded)}
          className={` p-1 px-1 rounded-l-xl transition-all duration-400 w-10 border-l border-amber-50/50 translate-x-3 bg-(--bg-color)`}
        >
          {" "}
          <Icon.arrowDown
            className={`transition-all duration-600 ease-in-out w-10 h-10 ${
              expanded ? "rotate-90" : "rotate-270"
            }`}
          />
        </button>
      </div>
      <div className=" mt-10 gap-1 flex-col flex h-5/8">
        <NavButton
          textVisibility={expanded}
          icon={Icon.qr}
          tap={tap === "editor"}
          onClick={() => setTap("editor")}
          translate
        >
          Editor
        </NavButton>
        <NavButton
          textVisibility={expanded}
          icon={Icon.stack}
          tap={tap === "myqr"}
          onClick={() => setTap("myqr")}
          translate
        >
          My QRs
        </NavButton>
      </div>
      <div className=" mt-10 gap-1 flex-col flex ">
        <NavButton
          textVisibility={expanded}
          icon={Icon.setting}
          tap={tap === "setting"}
          onClick={() => setTap("setting")}
          translate
        >
          Settings
        </NavButton>
        <NavButton
          textVisibility={expanded}
          icon={Icon.exit}
          onClick={() => handleLogout()}
          translate
        >
          Logout
        </NavButton>
      </div>
    </div>
  );
}

export default Sidebar;
