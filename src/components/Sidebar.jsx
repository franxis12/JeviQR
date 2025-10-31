import { useEffect, useState } from "react";
import useIsMobile from "../hooks/useIsMobile";

function Sidebar({ user }) {
  const isMobile = useIsMobile();
  const isTable = useIsMobile(1024);
  console.log(isMobile + " Sidebar");
  const [expanded, setExpanded] = useState(isMobile);
  useEffect(() => {
    if (isTable) {
      setExpanded(false);
    }
  }, [isTable]);

  return (
    <div
      className={`bg-amber-700/50 h-screen p-2  absolute ${
        isMobile && expanded
          ? "w-50 -translate-x-1.5"
          : !isMobile
          ? "   "
          : "-translate-x-55"
      } md:relative  md:w-20 transition-all duration-300   ${
        expanded ? "md:w-50" : "md:w-20"
      }`}
    >
      {" "}
      <h1>{user?.email}</h1>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`bg-amber-200 p-1 px-2 rounded-xl transition-all duration-400 ${
          isMobile && !expanded ? "absolute translate-x-55 " : "relative"
        } `}
      >
        Expand
      </button>
    </div>
  );
}

export default Sidebar;
