import { useEffect, useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import { myImages } from "../imports/images";
import Button from "../utils/Button";
import { Icon } from "../imports/icons";
import { useNavigate } from "react-router-dom";

function Sidebar({ user }) {
  const isMobile = useIsMobile();
  const isTable = useIsMobile(1024);
  const [expanded, setExpanded] = useState(isMobile);
  const navigate = useNavigate();
  useEffect(() => {
    if (isTable || isMobile) {
      setExpanded(false);
    }
  }, [isTable, isMobile]);

  return (
    <div
      className={`bg-(--interfaceColor) z-10 h-screen p-2 border-r border-slate-50/30 fixed  ${
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
          onClick={() => setExpanded(!expanded)}
          className={` p-1 px-2 rounded-xl transition-all duration-400 w-15 ${
            isMobile && !expanded ? "absolute translate-x-55 " : "relative"
          } `}
        >
          <img src={myImages.logo} className="rounded-lg w-16 " />
        </button>
      </div>
      <div className=" mt-10">
        <Button selected={true} height={"h-12 flex"}>
          <Icon.qr className="w-full h-full" />
          {expanded && "QR editor"}
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
