import QRCodeGenerator from "./QRCodeGenerator";
import { useQRCode } from "../context/QRCodeContext";

function Canvas() {
  const { qrText, customName, style } = useQRCode();

  return (
    <div className="flex flex-col items-center gap-10  ">
      <div className="flex w-full  max-w-5xl justify-center overflow-  h-2/5 ">
        <div
          id="qr-sheet"
          style={{ width: "8.5in", height: "11in" }}
          className="transition-all duration-200  flex scale-[0.55] origin-top flex-col items-center justify-center mt-30 gap-4 rounded-2xl  p-10 shadow-2xl sm:scale-[0.65] md:scale-[0.75] lg:scale-[0.85] xl:scale-80 "
        >
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full h-full flex items-center justify-center flex-col ">
              {customName.name && customName.visible && (
                <h1
                  style={{
                    fontSize: customName.customNameSize,
                    fontWeight: customName.fontWeight,
                    textDecoration: customName.textDecoration, //overline, line-through, underline
                    color: customName.fontColor,
                  }}
                >
                  {customName.name}
                </h1>
              )}
            </div>
            <QRCodeGenerator />
            {qrText.visible && (
              <h2
                style={{
                  fontSize: qrText.qrTextSize,
                  fontWeight: qrText.fontWeight,
                  textDecoration: qrText.textDecoration, //overline, line-through, underline
                  color: qrText.fontColor,
                }}
                className="max-w-[80%] wrap-break-word "
              >
                {qrText.name}
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
