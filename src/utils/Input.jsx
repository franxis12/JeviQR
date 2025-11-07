import React from "react";
import Button from "./Button";
import { Icon } from "../imports/icons";

function Input({
  type,
  placeholder,
  value,
  onChange,
  label,
  icon,
  buttonOnClick,
  max,
  min,
  width,
  selected,
  step,
}) {
  return (
    <div className={`${width ? width : "w-full"}`}>
      {label && (
        <div className="h-6">
          <label className="text-xs px-2">{label}</label>
        </div>
      )}
      <div className="flex gap-1">
        <input
          step={step}
          type={type}
          value={value}
          placeholder={placeholder}
          className={`bg-(--inputColor) focus:outline-3 focus:outline-(--buttonSelected)/80 transition-all duration-300 border border-(--borderColor)/50 rounded-lg px-2 py-1  ${
            width ? width : "w-full"
          } text-sm h-7`}
          onChange={onChange}
          max={max}
          min={min}
        />
        {icon && (
          <Button
            width={"w-15"}
            selected={selected}
            onClick={buttonOnClick}
            icon={icon}
          ></Button>
        )}
      </div>
    </div>
  );
}

export default Input;
