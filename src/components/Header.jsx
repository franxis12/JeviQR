import React, { useState } from "react";
import NavButton from "../utils/NavButton";
import { Icon } from "../imports/icons";

function Header({ user }) {
  const [hover, setHover] = useState(true);
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className=" s w-full sticky to-0% ">
      <div className="flex items-center justify-end  gap-2 px-5 py-1">
        <NavButton textVisibility={true} icon={Icon.download} tap={true}>
          Download
        </NavButton>
        <NavButton
          onClick={handlePrint}
          textVisibility={hover}
          icon={Icon.print}
          tap={true}
        >
          Print
        </NavButton>

        <h1>{user?.email}</h1>
        <img
          className="w-15 h-15 rounded-full border"
          src="https://wallpapers.com/images/hd/team-success-keys-wx2y1rgcainq64y8.jpg"
        />
      </div>
    </div>
  );
}

export default Header;
