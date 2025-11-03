import { useEffect } from "react";
import { useQRCode } from "../context/QRCodeContext.jsx";
import Input from "../utils/Input.jsx";
import Button from "../utils/Button.jsx";
import { Icon } from "../imports/icons.js";

function ToolsMenu() {
  const { qrText, setQrText, customName, setCustomName, style, setStyle } =
    useQRCode();

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
    <div className="  rounded-2xl w-100 h-4/5 border border-amber-50/20 bg-(--interfaceColor)/75 hover:bg-(--interfaceColor)  absolute p-3 right-3  top-20 ">
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
            >
              {" "}
              Underline
            </Button>
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
        <Input
          type={"text"}
          placeholder={"Paste here your URL Logo"}
          value={style.logo}
          label={"Logo URL"}
          onChange={(e) =>
            setStyle((prev) => ({
              ...prev,
              logo: e.target.value,
            }))
          }
        />
        <div className="w-full ">
          <h1 className="px-2  font-medium">QR Style</h1>
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
            >
              {" "}
              Underline
            </Button>
            <Button
              selected={qrText.textDecoration.includes("overline")}
              icon={Icon.overline}
              onClick={() => toggleDecorationQRLink("overline")}
            >
              Overline
            </Button>
            <Button
              selected={qrText.textDecoration.includes("line-through")}
              icon={Icon.lineThrough}
              onClick={() => toggleDecorationQRLink("line-through")}
            >
              L-through
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full border rounded-2xl p-2 border-(--borderColor) my-2 ">
        <div className="w-full ">
          <h1 className="px-2  font-medium">QR Code Style</h1>
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
              label={"QR background"}
              type={"color"}
            />
          </div>
        </div>
      </div>
      <label>Qr Code Level </label>
      <input
        type="text"
        value={style.qrCodeLevel}
        onChange={(e) =>
          setStyle((prev) => ({
            ...prev,
            qrCodeLevel: e.target.value,
          }))
        }
        placeholder="Enter text or URL"
        className="border rounded p-2 w-FULL bg-gray-500"
      />
      <label>QR size</label>
      <input
        type="number"
        value={style.qrCodeSize}
        onChange={(e) =>
          setStyle((prev) => ({
            ...prev,
            qrCodeSize: Number(e.target.value),
          }))
        }
        placeholder="Enter text or URL"
        className="border rounded p-2 w-FULL bg-gray-500"
      />
      <label>QR logo Width</label>
      <input
        type="number"
        value={style.qrLogoWidth}
        onChange={(e) =>
          setStyle((prev) => ({
            ...prev,
            qrLogoWidth: Number(e.target.value),
          }))
        }
        placeholder="Enter text or URL"
        className="border rounded p-2 w-FULL bg-gray-500"
      />
      <label>QR logo Height</label>
      <input
        type="number"
        value={style.qrLogoHeight}
        onChange={(e) =>
          setStyle((prev) => ({
            ...prev,
            qrLogoHeight: Number(e.target.value),
          }))
        }
        placeholder="Enter text or URL"
        className="border rounded p-2 w-FULL bg-gray-500"
      />
      <button
        className="mt-4 w-full rounded-lg bg-black py-2 text-sm font-medium text-white transition hover:bg-white/20"
        onClick={handlePrint}
      >
        print
      </button>
    </div>
  );
}

export default ToolsMenu;
