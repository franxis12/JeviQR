import React from "react";
import { Icon } from "../imports/icons";

function Button({
  children,
  onClick,
  icon,
  selected,
  width,
  height,
  margin,
  secondary,
}) {
  const IconComponent = icon;
  return (
    <div className={`${width ? width : "w-full "}`}>
      <button
        className={`
          text-(--text-color) 
          w-full transition-all 
          duration-300 
          border 
          border-(--borderColor)/50 
          gap-2 active:bg-black
          hover:bg-(--buttonHover) 
          px-2 text-sm  
          p-1 rounded-lg 
          flex items-center 
          justify-center 
          ${
            selected
              ? "bg-(--buttonSelected) "
              : secondary
              ? "bg-(--buttonSecondary) "
              : "bg-(--inputColor)"
          }  
          ${height || "h-7"} 
          ${margin}
        `}
        onClick={onClick}
      >
        {icon && <IconComponent className="text-(--text-color) h-4 w-4" />}
        {children}
      </button>
    </div>
  );
}

export default Button;
