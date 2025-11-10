import QRCodeGenerator from "./QRCodeGenerator";
import { useQRCode } from "../context/QRCodeContext";
import { useState } from "react";

function Canvas() {
  const { qrText, customName, style } = useQRCode();

  //temp variable/
  const [rotation, setRotation] = useState(0);

  return (
    <div className="flex flex-col items-center gap-10  border border-amber-300">
      <div className="flex w-full  justify-center  h-2/5 ">
        <div
          id="qr-sheet"
          className="transition-all duration-200 w-full  flex scale-[0.55] origin-top flex-col items-center justify-center mt-30 gap-4 rounded-2xl    sm:scale-[0.65] md:scale-[0.75] lg:scale-[0.85] xl:scale-100 "
        >
          <div className="flex flex-col items-center justify-center w-full ">
            <div className="w-full h-full flex items-center justify-center flex-col ">
              {customName.name && customName.visible && (
                <h1
                  className="text-nowrap "
                  style={{
                    fontSize: customName.customNameSize,
                    fontWeight: customName.fontWeight,
                    textDecoration: customName.textDecoration, //overline, line-through, underline
                    color: customName.fontColor,
                    backgroundColor: "#fff0", //feature
                    padding: 0, //feature
                    borderRadius: 0, //feature
                    rotate: `${rotation}deg`, //feature
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

import * as htmlToImage from "html-to-image";

// eslint-disable-next-line react-refresh/only-export-components
export function handleDownloadQR() {
  const node = document.getElementById("qr-sheet");
  if (!node) return;

  htmlToImage
    .toPng(node, { quality: 1 })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "jeviQR-sheet.png";
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.error("Error generando la imagen:", err);
    });
}

// eslint-disable-next-line react-refresh/only-export-components
export function handleDownloadQRsvg() {
  const node = document.getElementById("qr-sheet");
  if (!node) return;

  htmlToImage;
  htmlToImage
    .toSvg(node)
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "jeviQR-sheet.svg";
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.error("Error generando la imagen:", err);
    });
}
