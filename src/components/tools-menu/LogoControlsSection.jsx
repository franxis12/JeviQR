import Input from "../../utils/Input.jsx";
import Button from "../../utils/Button.jsx";

function LogoControlsSection({ style, setStyle, aspect, setAspect }) {
  return (
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
  );
}

export default LogoControlsSection;
