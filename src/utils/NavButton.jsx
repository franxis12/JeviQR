import { Icon } from "../imports/icons";

function NavButton({
  icon,
  children,
  textVisibility,
  tap,
  onClick,
  translate,
  className,
  heigh,
}) {
  const IconComponent = icon;

  return (
    <div>
      <button
        onClick={onClick}
        className={`w-full flex items-center   gap-3 p-1 px-2 p rounded-lg pl-2 transition-all duration-300 hover:bg-(--buttonHover) text-sm active:bg-(--pressedButton)  font-medium
            ${tap ? "bg-(--buttonSelected)" : "bg-()"} 
            ${!textVisibility && "text-[0px] "}
            ${!translate && " justify-center"}
            ${className}
            ${heigh}`}
      >
        {icon && (
          <IconComponent
            className={`w-6 h-6 min-w-6 min-h-6 transition-all duration-300 text-(--text-color) 
              ${!textVisibility && translate && "translate-x-3 "}}`}
          />
        )}
        {children}
      </button>
    </div>
  );
}

export default NavButton;
