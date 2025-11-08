import React, { useState } from "react";
import QRCodeGenerator from "./QRCodeGenerator";
import { useZPLSetting } from "../context/ZplContext";

export default function ZebraLabelBasic() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const { zplSetting, setZplSetting } = useZPLSetting();

  const [labelDesing, setLabelDesing] = useState(zplSetting);

  const tags = {
    opening: "^XA",
    closing: "^XZ",
  };

  const text = {
    position: { x: `^FO${50},`, y: 50 },
    font: `^A${zplSetting.text.font}${zplSetting.text.orientation},${zplSetting.text.heigh},${zplSetting.text.width} `,
    text: `^FD${zplSetting.text.title}^FS`,
  };

  // 🟦 Generar ZPL básico
  const generateZpl = () => {
    return [
      tags.opening,
      "^LL600", // altura de la etiqueta/ 3inch

      text.position.x + text.position.y,
      text.font,
      text.text,

      "^FO100,150",
      "^BQN,2,10",
      "^FDQA," + zplSetting.qrData + "^FS",

      tags.closing,
    ].join("\n");
  };

  // 🟦 Descargar archivo .txt
  const handleDownload = () => {
    const zpl = generateZpl();
    const blob = new Blob([zpl], { type: "text/plain;charset=us-ascii" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "zebra_label.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // 🟦 Imprimir localmente
  const handleLocalPrint = () => {
    const zpl = generateZpl();
    const blob = new Blob([zpl], { type: "text/plain;charset=us-ascii" });
    const url = URL.createObjectURL(blob);

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    };

    setTimeout(() => {
      document.body.removeChild(iframe);
      URL.revokeObjectURL(url);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <button
        onClick={handleDownload}
        className="px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition"
      >
        Descargar .txt (ZPL)
      </button>

      <button
        onClick={handleLocalPrint}
        className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
      >
        Print Zebra
      </button>

      <button
        onClick={() => setPreview(!preview)}
        className="px-6 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 transition"
      >
        {preview ? "Ocultar vista previa" : "Ver vista previa"}
      </button>

      {preview && (
        <div className="mt-6 border border-gray-300 bg-white/25 shadow-md rounded-xl p-6 flex flex-col items-center justify-center">
          <div
            className="relative flex flex-col items- just bg-white rounded-xl border border-gray-800"
            style={{
              width: "500px",
              height: "550px",
              padding: "0px",
            }}
          >
            <h4
              style={{ fontSize: zplSetting.text.width - 80 }}
              className={`font-bold  fixed  transform text-black mt-0 tracking-wide
                  `}
            >
              Demo
            </h4>
            <div
              className="flex items-center justify-center bg-gray-200 rounded-xl border-4 border-"
              style={{
                width: "220px",
                height: "220px",
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
