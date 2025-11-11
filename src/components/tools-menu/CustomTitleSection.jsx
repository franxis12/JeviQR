import Input from "../../utils/Input.jsx";
import Button from "../../utils/Button.jsx";
import { Icon } from "../../imports/icons.js";

function CustomTitleSection({
  customName,
  setCustomName,
  modeCanvasActive,
  showFontControls,
}) {
  const toggleDecoration = (decoration) => {
    setCustomName((prev) => {
      const current = new Set(
        (prev.textDecoration ?? "").split(" ").filter(Boolean)
      );
      if (current.has(decoration)) {
        current.delete(decoration);
      } else {
        current.add(decoration);
      }
      return { ...prev, textDecoration: Array.from(current).join(" ") };
    });
  };

  const handleVisibilityToggle = () => {
    const visibleText = customName.visible;
    setCustomName((prev) => ({ ...prev, visible: !visibleText }));
  };

  return (
    <div className="w-full border rounded-2xl p-2 border-(--borderColor) my-2 ">
      <Input
        type={"text"}
        placeholder={"Enter your QR name"}
        value={customName.name}
        max={modeCanvasActive === "zebra" ? 4 : 100}
        label={"Title"}
        onChange={(e) =>
          setCustomName((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
        buttonOnClick={handleVisibilityToggle}
        icon={customName.visible ? Icon.eye : Icon.eyeSlash}
        selected={!customName.visible}
      />
      {showFontControls && (
        <div className="w-full  ">
          <h1 className="px-2  font-medium">Font</h1>
          <div className="flex items-center justify-between gap-1 w-full mb-1 ">
            <Input
              width={"w-full"}
              label={"Size"}
              type={"number"}
              max={100}
              min={10}
              value={customName.customNameSize}
              onChange={(e) =>
                setCustomName((prev) => ({
                  ...prev,
                  customNameSize: Number(e.target.value),
                }))
              }
            />
            <Input
              width={"w-full"}
              label={"Weight"}
              type={"number"}
              max={900}
              min={100}
              value={customName.fontWeight}
              onChange={(e) =>
                setCustomName((prev) => ({
                  ...prev,
                  fontWeight: Number(e.target.value),
                }))
              }
            />
            <Input
              label={"Color"}
              type={"color"}
              value={customName.fontColor}
              onChange={(e) =>
                setCustomName((prev) => ({
                  ...prev,
                  fontColor: e.target.value,
                }))
              }
            />
          </div>
          <div className={`flex items-center justify-between gap-1 mb-1`}>
            <Button
              selected={customName.textDecoration.includes("underline")}
              icon={Icon.underline}
              onClick={() => toggleDecoration("underline")}
            ></Button>
            <Button
              selected={customName.textDecoration.includes("overline")}
              icon={Icon.overline}
              onClick={() => toggleDecoration("overline")}
            ></Button>
            <Button
              selected={customName.textDecoration.includes("line-through")}
              icon={Icon.lineThrough}
              onClick={() => toggleDecoration("line-through")}
            ></Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomTitleSection;
