import Input from "../../utils/Input.jsx";
import Button from "../../utils/Button.jsx";
import { Icon } from "../../imports/icons.js";

function QrTextSection({ qrText, setQrText, style, setStyle, showFontControls }) {
  const toggleDecoration = (decoration) => {
    setQrText((prev) => {
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
    const visibleText = qrText.visible;
    setQrText((prev) => ({ ...prev, visible: !visibleText }));
  };

  const renderLevelDescription = () => {
    switch (style.qrCodeLevel) {
      case "L":
        return {
          label: "Low",
          range: "Can restore up to 7% of the data.",
          context:
            "Digital displays, clean indoor environments where codes are unlikely to get damaged.",
        };
      case "M":
        return {
          label: "Medium",
          range: "Can restore up to 15% of the data.",
          context:
            "Most common level; balances data capacity with protection against minor damage like smudges or handling.",
        };
      case "Q":
        return {
          label: "Quartile",
          range: "Can restore up to 25% of the data.",
          context: "Environments with a moderate risk of damage.",
        };
      case "H":
        return {
          label: "High",
          range: "Can restore up to 30% of the data.",
          context:
            "Outdoor signage, industrial settings, or anywhere the code is likely to be exposed to dirt, rain, or physical wear.",
        };
      default:
        return { label: "?", range: "?", context: "?" };
    }
  };

  const levelInfo = renderLevelDescription();

  return (
    <div className="w-full border rounded-2xl p-2 border-(--borderColor) my-2 ">
      <Input
        value={qrText.name}
        onChange={(e) => {
          setQrText((prev) => ({ ...prev, name: e.target.value }));
        }}
        type={"text"}
        placeholder={"Enter your URL or Text"}
        label={"Text to Convert"}
        buttonOnClick={handleVisibilityToggle}
        icon={qrText.visible ? Icon.eye : Icon.eyeSlash}
        selected={!qrText.visible}
      />

      {showFontControls && (
        <div className="w-full ">
          <div className="flex items-center justify-between gap-1 w-full mb-1 ">
            <Input
              width={"w-full"}
              label={"Size"}
              type={"number"}
              max={100}
              min={10}
              value={qrText.qrTextSize}
              onChange={(e) =>
                setQrText((prev) => ({
                  ...prev,
                  qrTextSize: Number(e.target.value),
                }))
              }
            />
            <Input
              width={"w-full"}
              label={"Weight"}
              type={"number"}
              max={900}
              min={100}
              value={qrText.fontWeight}
              onChange={(e) =>
                setQrText((prev) => ({
                  ...prev,
                  fontWeight: Number(e.target.value),
                }))
              }
            />
            <Input
              label={"Color"}
              type={"color"}
              value={qrText.fontColor}
              onChange={(e) =>
                setQrText((prev) => ({
                  ...prev,
                  fontColor: e.target.value,
                }))
              }
            />
          </div>
          <div className={`flex items-center justify-between gap-1 mb-1`}>
            <Button
              selected={qrText.textDecoration.includes("underline")}
              icon={Icon.underline}
              onClick={() => toggleDecoration("underline")}
            ></Button>
            <Button
              selected={qrText.textDecoration.includes("overline")}
              icon={Icon.overline}
              onClick={() => toggleDecoration("overline")}
            ></Button>
            <Button
              selected={qrText.textDecoration.includes("line-through")}
              icon={Icon.lineThrough}
              onClick={() => toggleDecoration("line-through")}
            ></Button>
          </div>
          <div className={`flex-col items-center justify-between gap-1 my-1 hover:bg-slate-800 bg-slate-900/85 border transition-colors ease-in-out duration-300 border-amber-50/10 rounded-xl p-2 `}>
            <h1 className="mx-1 text-xs mb-2 text-white">QR code level</h1>
            <div className="flex flex-col gap-5 items-end">
              <div className="flex  gap-1 items-end w-full min-w-25">
                <Button
                  height={"h-30 items-end font-bold"}
                  selected={style.qrCodeLevel === "H"}
                  onClick={() =>
                    setStyle((prev) => ({
                      ...prev,
                      qrCodeLevel: "H",
                    }))
                  }
                >
                  30%
                </Button>
                <Button
                  height={"h-25 items-end font-bold"}
                  selected={style.qrCodeLevel === "Q"}
                  onClick={() =>
                    setStyle((prev) => ({
                      ...prev,
                      qrCodeLevel: "Q",
                    }))
                  }
                >
                  25%
                </Button>
                <Button
                  height={"h-15 items-end font-bold"}
                  selected={style.qrCodeLevel === "M"}
                  onClick={() =>
                    setStyle((prev) => ({
                      ...prev,
                      qrCodeLevel: "M",
                    }))
                  }
                >
                  15%
                </Button>
                <Button
                  height={"h-7 items-end font-bold"}
                  selected={style.qrCodeLevel === "L"}
                  onClick={() =>
                    setStyle((prev) => ({
                      ...prev,
                      qrCodeLevel: "L",
                    }))
                  }
                >
                  7%
                </Button>
              </div>
              <div className="flex flex-col gap-1  w-full">
                <h1 className="text-white">{levelInfo.label}</h1>
                <p className="text-xs text-(--textPrimary)">{levelInfo.range}</p>
                <p className="text-[10px] text-slate-400">{levelInfo.context}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QrTextSection;
