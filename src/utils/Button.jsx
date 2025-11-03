import React from "react";
import { Icon } from "../imports/icons";

function Button({ children, onClick, icon, selected, width }) {
  const IconComponent = icon;
  return (
    <div className={`${width ? width : "w-full"}`}>
      <button
        className={`text-(--text-color) w-full h-8 border border-(--borderColor)/50 gap-2 px-2 text-sm ${
          selected ? "bg-(--buttonSelected)" : "bg-(--inputColor)"
        } p-1 rounded-lg flex items-center justify-center `}
        onClick={onClick}
      >
        {icon && <IconComponent className="text-(--text-color) h-5 w-5" />}
        {children}
      </button>
    </div>
  );
}

export default Button;
