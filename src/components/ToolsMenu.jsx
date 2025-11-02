import { useQRCode } from "../context/QRCodeContext.jsx";

function ToolsMenu() {
  const { qrText, setQrText, customName, setCustomName, style, setStyle } =
    useQRCode();

  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="rounded-3xl w-60 h-4/5 bg-(--interfaceColor) absolute p-3 right-3  top-20 overflow-x-hidden overflow-y-scroll">
      <h2 className="text-sm font-semibold text-white">QR Tools</h2>
      <p className="mt-2 text-xs text-white/70 break-all">{qrText}</p>
      <label>Custom name</label>

      <input
        value={customName.name}
        onChange={(e) =>
          setCustomName((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
        placeholder="Enter Title"
        className="border rounded p-2 w-FULL bg-gray-500"
      />

      <label>Font Size</label>

      <input
        type="number"
        value={customName.customNameSize}
        onChange={(e) =>
          setCustomName((prev) => ({
            ...prev,
            customNameSize: Number(e.target.value),
          }))
        }
        placeholder="Enter text or URL"
        className="border rounded p-2 w-FULL "
      />
      <label>Text to covert</label>

      <input
        value={qrText}
        onChange={(e) => setQrText(e.target.value)}
        placeholder="Enter text or URL"
        className="border rounded p-2 w-FULL bg-gray-500"
      />
      <label>Border size</label>

      <input
        type="number"
        value={style.border}
        onChange={(e) =>
          setStyle((prev) => ({ ...prev, border: Number(e.target.value) }))
        }
        min={"0"}
        placeholder="Enter text or URL"
        className="border rounded p-2 w-FULL bg-gray-500"
      />

      <label>Border Radius</label>

      <input
        type="number"
        value={style.radius}
        onChange={(e) =>
          setStyle((prev) => ({ ...prev, radius: Number(e.target.value) }))
        }
        placeholder="Enter text or URL"
        className="border rounded p-2 w-FULL bg-gray-500"
      />
      <label>Qr Margin Size</label>
      <input
        type="number"
        value={style.qrMarginSize}
        onChange={(e) =>
          setStyle((prev) => ({
            ...prev,
            qrMarginSize: Number(e.target.value),
          }))
        }
        placeholder="Enter text or URL"
        className="border rounded p-2 w-FULL bg-gray-500"
      />
      <label>Border Color</label>

      <input
        type="color"
        value={style.borderColor}
        onChange={(e) =>
          setStyle((prev) => ({ ...prev, borderColor: e.target.value }))
        }
        style={{ backgroundColor: style.borderColor }}
        placeholder="Enter text or URL"
        className="border rounded p-2 w-FULL "
      />
      <br></br>
      <label>Border Color</label>

      <input
        type="color"
        value={style.qrCodeColor}
        onChange={(e) =>
          setStyle((prev) => ({ ...prev, qrCodeColor: e.target.value }))
        }
        style={{ backgroundColor: style.qrCodeColor }}
        placeholder="Enter text or URL"
        className="border rounded p-2 w-FULL "
      />
      <br></br>

      <label>QR background color</label>

      <input
        type="color"
        value={style.qrBgColor}
        onChange={(e) =>
          setStyle((prev) => ({ ...prev, qrBgColor: e.target.value }))
        }
        style={{ backgroundColor: style.qrBgColor }}
        placeholder="Enter text or URL"
        className="border rounded p-2 w-FULL "
      />
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
