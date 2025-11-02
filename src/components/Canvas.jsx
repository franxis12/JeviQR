import QRCodeGenerator from "./QRCodeGenerator";
import { useQRCode } from "../context/QRCodeContext";

function Canvas() {
  const { qrText, customName, style } = useQRCode();

  return (
    <div className="flex flex-col items-center gap-10  ">
      <div className="flex w-full  max-w-4xl justify-center overflow-  h-2/5 ">
        <div
          id="qr-sheet"
          style={{ width: "8.5in", height: "11in" }}
          className="transition-all duration-200  flex scale-[0.55] origin-top flex-col items-center justify-center gap-4 rounded-2xl bg-white p-10 shadow-2xl sm:scale-[0.65] md:scale-[0.75] lg:scale-[0.85] xl:scale-100 "
        >
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full h-full flex items-center justify-center flex-col ">
              {customName.name && (
                <h1
                  style={{
                    fontSize: customName.customNameSize,
                    fontWeight: 900,
                    textDecoration: "underline", //overline, line-through, underline
                  }}
                  className="font-semibold text-black"
                >
                  {customName.name}
                </h1>
              )}
            </div>
            <QRCodeGenerator />
            <h2
              style={{ fontSize: style.qrTextSize }}
              className="max-w-[80%] wrap-break-word text-center text-sm text-black"
            >
              {qrText}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
