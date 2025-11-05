import { useEffect, useState } from "react";
import { useQRCode } from "../context/QRCodeContext.jsx";
import Input from "../utils/Input.jsx";
import Button from "../utils/Button.jsx";
import { Icon } from "../imports/icons.js";

function ToolsMenu() {
  const { qrText, setQrText, customName, setCustomName, style, setStyle } =
    useQRCode();
  const [aspect, setAspect] = useState("");

  const handlePrint = () => {
    window.print();
  };
  useEffect(() => {
    if (customName.fontWeight > 900) {
      setCustomName((prev) => ({
        ...prev,
        fontWeight: 900,
      }));
    }
    if (customName.customNameSize > 500) {
      setCustomName((prev) => ({
        ...prev,
        customNameSize: 500,
      }));
    }
  }, [customName.fontWeight, setCustomName, customName.customNameSize]);

  const toggleDecoration = (decoration) => {
    setCustomName((prev) => {
      const current = new Set(
        (prev.textDecoration ?? "").split(" ").filter(Boolean)
      );
      current.has(decoration)
        ? current.delete(decoration)
        : current.add(decoration);
      return { ...prev, textDecoration: Array.from(current).join(" ") };
    });
  };
  const toggleDecorationQRLink = (decoration) => {
    setQrText((prev) => {
      const current = new Set(
        (prev.textDecoration ?? "").split(" ").filter(Boolean)
      );
      current.has(decoration)
        ? current.delete(decoration)
        : current.add(decoration);
      return { ...prev, textDecoration: Array.from(current).join(" ") };
    });
  };

  return (
    <div className="overflow-x-hidden overflow-y-scroll no-scrollbar  rounded-2xl w-80 h-7/8 border transition-colors duration-500 border-amber-50/20 bg-(--interfaceColor)/75 hover:bg-(--interfaceColor)    fixed p-3 right-3  top-20 ">
      {" "}
      {/*overflow-x-hidden overflow-y-scroll*/}
      {/*Custom Text*/}
      <div className="w-full border rounded-2xl p-2 border-(--borderColor) my-2 ">
        <Input
          type={"text"}
          placeholder={"Enter your QR name"}
          value={customName.name}
          label={"Title"}
          onChange={(e) =>
            setCustomName((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          buttonOnClick={() => {
            const visibleText = customName.visible;
            setCustomName((prev) => ({ ...prev, visible: !visibleText }));
          }}
          icon={customName.visible ? Icon.eye : Icon.eyeSlash}
          selected={!customName.visible}
        />
        <div className="w-full ">
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
      </div>
      {/*Text to QR Setting*/}
      <div className="w-full border rounded-2xl p-2 border-(--borderColor) my-2 ">
        <Input
          value={qrText.name}
          onChange={(e) => {
            setQrText((prev) => ({ ...prev, name: e.target.value }));
          }}
          type={"text"}
          placeholder={"Enter your URL or Text"}
          label={"Link to Convert"}
          buttonOnClick={() => {
            const visibleText = qrText.visible;
            setQrText((prev) => ({ ...prev, visible: !visibleText }));
          }}
          icon={qrText.visible ? Icon.eye : Icon.eyeSlash}
          selected={!qrText.visible}
        />

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
              onClick={() => toggleDecorationQRLink("underline")}
            ></Button>
            <Button
              selected={qrText.textDecoration.includes("overline")}
              icon={Icon.overline}
              onClick={() => toggleDecorationQRLink("overline")}
            ></Button>
            <Button
              selected={qrText.textDecoration.includes("line-through")}
              icon={Icon.lineThrough}
              onClick={() => toggleDecorationQRLink("line-through")}
            ></Button>
          </div>
          <div
            className={`flex-col items-center justify-between gap-1 my-1 hover:bg-slate-800 bg-slate-900/85 border transition-colors ease-in-out duration-300 border-amber-50/10 rounded-xl p-2 `}
          >
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
                <h1 className="text-white">
                  {style.qrCodeLevel === "L"
                    ? "Low"
                    : style.qrCodeLevel === "M"
                    ? "Medium"
                    : style.qrCodeLevel === "Q"
                    ? "Quartile"
                    : style.qrCodeLevel === "H"
                    ? "High"
                    : "?"}
                </h1>
                <p className="text-xs text-(--textPrimary)">
                  {style.qrCodeLevel === "L"
                    ? "Can restore up to 7% of the data."
                    : style.qrCodeLevel === "M"
                    ? "Can restore up to 15% of the data."
                    : style.qrCodeLevel === "Q"
                    ? "Can restore up to 25% of the data."
                    : style.qrCodeLevel === "H"
                    ? "Can restore up to 30% of the data."
                    : "?"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {style.qrCodeLevel === "L"
                    ? "Digital displays, clean indoor environments where codes are unlikely to get damaged."
                    : style.qrCodeLevel === "M"
                    ? "Most common level; balances data capacity with protection against minor damage like smudges or handling."
                    : style.qrCodeLevel === "Q"
                    ? "Environments with a moderate risk of damage."
                    : style.qrCodeLevel === "H"
                    ? "Outdoor signage, industrial settings, or anywhere the code is likely to be exposed to dirt, rain, or physical wear."
                    : "?"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border rounded-2xl p-2 border-(--borderColor) my-2 ">
        <div className="w-full">
          <h1 className="px-2  font-medium">Style</h1>
          <div className="flex items-center justify-between gap-1 w-full mb-1 ">
            <Input
              value={style.border}
              onChange={(e) =>
                setStyle((prev) => ({
                  ...prev,
                  border: Number(e.target.value),
                }))
              }
              width={"w-full"}
              label={"Border"}
              type={"number"}
              max={150}
              min={0}
            />
            <Input
              value={style.radius}
              onChange={(e) =>
                setStyle((prev) => ({
                  ...prev,
                  radius: Number(e.target.value),
                }))
              }
              width={"w-full"}
              label={"Radius"}
              type={"number"}
              min={0}
            />
            <Input
              min={0}
              value={style.qrMarginSize}
              onChange={(e) =>
                setStyle((prev) => ({
                  ...prev,
                  qrMarginSize: Number(e.target.value),
                }))
              }
              width={"w-full"}
              label={"Margin"}
              type={"number"}
            />
            <Input
              value={style.qrCodeSize}
              onChange={(e) =>
                setStyle((prev) => ({
                  ...prev,
                  qrCodeSize: Number(e.target.value),
                }))
              }
              width={"w-full"}
              label={"QR size"}
              type={"number"}
              min={100}
            />
          </div>

          <div className={`flex items-center justify-between gap-1 mb-1`}>
            <Input
              value={style.borderColor}
              onChange={(e) =>
                setStyle((prev) => ({ ...prev, borderColor: e.target.value }))
              }
              label={"Border Color"}
              type={"color"}
            />
            <Input
              value={style.qrCodeColor}
              onChange={(e) =>
                setStyle((prev) => ({ ...prev, qrCodeColor: e.target.value }))
              }
              label={"QR Color"}
              type={"color"}
            />
            <Input
              value={style.qrBgColor}
              onChange={(e) =>
                setStyle((prev) => ({ ...prev, qrBgColor: e.target.value }))
              }
              label={"Background"}
              type={"color"}
            />
          </div>
        </div>
      </div>
      <div className="w-full border rounded-2xl p-2 border-(--borderColor) my-2 ">
        <div className="w-full">
          <div className="flex items-end  ">
            {!style.qrLogo ? (
              <h1 className="px-2  font-medium">Logo</h1>
            ) : (
              <div className="bg-black/20 flex items-center rounded-xl overflow-hidden border border-(--borderColor) w-full">
                <div className="bg-amber-50 border-r border-(--borderColor) p-2">
                  <h3 classname="font-bold">Preview</h3>
                </div>
                <img
                  crossOrigin="anonymous"
                  alt="qr logo"
                  className=" h-auto max-h-8 max-w-40 w-auto p-2"
                  src={style.qrLogo}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-1 w-full mb-1 ">
            <Input
              type={"text"}
              placeholder={"Paste here your URL Logo"}
              value={style.qrLogo}
              label={"URL"}
              onChange={(e) =>
                setStyle((prev) => ({
                  ...prev,
                  qrLogo: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between gap-1 w-full mb-1 ">
            <Input
              value={style.qrLogoWidth}
              onChange={(e) =>
                setStyle((prev) => {
                  const width = Number(e.target.value);
                  if (aspect === "square") {
                    return {
                      ...prev,
                      qrLogoWidth: width,
                      qrLogoHeight: width,
                    };
                  }
                  return { ...prev, qrLogoWidth: width };
                })
              }
              width={"w-full"}
              label={"Width"}
              type={"number"}
              min={0}
            />

            <Input
              value={style.qrLogoHeight}
              onChange={(e) =>
                setStyle((prev) => {
                  const height = Number(e.target.value);
                  if (aspect === "square") {
                    return {
                      ...prev,
                      qrLogoWidth: height,
                      qrLogoHeight: height,
                    };
                  }
                  return { ...prev, qrLogoWidth: height };
                })
              }
              min={0}
              width={"w-full"}
              label={"Heigh"}
              type={"number"}
            />
          </div>
          <div className="flex items-center justify-between gap-1 w-full mb-1 ">
            <Input
              value={style.qrLogoOpacity}
              onChange={(e) =>
                setStyle((prev) => ({
                  ...prev,
                  qrLogoOpacity: Number(e.target.value),
                }))
              }
              width={"w-full"}
              label={"Logo opacity"}
              type={"range"}
              step="0.01"
              max={1}
              min={0}
            />
          </div>
          <div className="flex items-center justify-between gap-1 w-full mb-1 ">
            <Button
              height={"h-7"}
              selected={style.excavate}
              onClick={() => {
                const excavateStatus = style.excavate;
                setStyle((prev) => ({
                  ...prev,
                  excavate: !excavateStatus,
                }));
              }}
            >
              Excavate
            </Button>
            <Button
              height={"h-7"}
              selected={aspect === "square"}
              onClick={() => {
                if (aspect == "") {
                  setAspect("square");
                } else if (aspect === "square") {
                  setAspect("");
                }
              }}
            >
              Square
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolsMenu;
