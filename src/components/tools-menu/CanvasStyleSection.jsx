import Input from "../../utils/Input.jsx";

function CanvasStyleSection({ style, setStyle, qrText }) {
  return (
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
            onChange={(e) => {
              const newColor = e.target.value;
              const name = qrText?.name?.trim() || "";

              setStyle((prev) => ({
                ...prev,
                qrCodeColor: name === "" ? "#2222" : newColor,
              }));
            }}
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
  );
}

export default CanvasStyleSection;
