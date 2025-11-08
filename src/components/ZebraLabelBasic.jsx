import React, { useState } from "react";

export default function ZebraLabelBasic() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  // 🟦 Generar ZPL básico
  const generateZpl = ({
    title = "Demo Label",
    qrData = "https://francismartinez.com",
  } = {}) => {
    return [
      "^XA",
      "^LL600", // altura de la etiqueta/
      "^FO100,50",
      "^A0N,60,60",
      "^FD" + title + "^FS",

      "^FO100,150",
      "^BQN,2,10",
      "^FDQA," + qrData + "^FS",

      "^XZ",
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
        <div className="mt-6 border border-gray-300 bg-white/70 shadow-md rounded-xl p-6 flex flex-col items-center justify-center">
          <div
            className="relative flex flex-col items-center justify-center bg-white rounded-xl border-4 border-gray-800"
            style={{
              width: "250px",
              height: "350px",
              padding: "10px",
            }}
          >
            <h4 className="font-bold text-lg text-gray-700 mb-4 tracking-wide">
              Demo Label
            </h4>
            <div
              className="flex items-center justify-center bg-gray-200 rounded-xl border-4 border-black"
              style={{
                width: "220px",
                height: "220px",
              }}
            >
              <span className="text-sm text-gray-600">QR Preview</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
