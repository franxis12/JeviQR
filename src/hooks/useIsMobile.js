import { useState, useEffect } from "react";

export default function useIsMobile(breakpoint = 700) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    

    window.addEventListener("resize", handleResize);


    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint, isMobile]);

  return isMobile;
}