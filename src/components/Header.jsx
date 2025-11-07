import React, { useState } from "react";
import NavButton from "../utils/NavButton";
import { Icon } from "../imports/icons";
import { handleDownloadQR } from "./Canvas";
import { handleDownloadQRsvg } from "./Canvas";
import ZebraLabel from "./ZebraLabel";

function Header({ user }) {
  const [hover, setHover] = useState(true);
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className=" s w-full sticky to-0%  h-15 flex items-center justify-end ">
      <div className="flex items-center justify-end  gap-2 px-5 py-1">
        <ZebraLabel />
        <NavButton
          onClick={handleDownloadQRsvg}
          textVisibility={true}
          icon={Icon.download}
          tap={true}
        >
          Download SVG
        </NavButton>
        <NavButton
          onClick={handleDownloadQR}
          textVisibility={true}
          icon={Icon.download}
          tap={true}
        >
          Download PNG
        </NavButton>
        <NavButton
          onClick={handlePrint}
          textVisibility={hover}
          icon={Icon.print}
          tap={true}
        >
          Print
        </NavButton>
      </div>
    </div>
  );
}

export default Header;
