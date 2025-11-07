import React from "react";

export default function ZebraLabel() {
  const generateZpl = ({
    title = "Mi Etiqueta",
    qrData = "https://francismartinez.com",
    labelWidthIn = 4,
    labelHeightIn = 6,
    dpi = 300,
  } = {}) => {
    const W = Math.round(labelWidthIn * dpi);
    const H = Math.round(labelHeightIn * dpi);
    const PADDING = 40;

    return [
      "^XA",
      `^PW${W}`,
      `^LL${H}`,
      `^FO${PADDING},${PADDING}`,
      "^A0N,60,60",
      `^FD${title}^FS`,
      `^FO${PADDING},${PADDING + 100}`,
      "^BQN,2,10",
      `^FDLA,${qrData}^FS`,
      `^FO${PADDING + 300},${PADDING + 100}`,
      "^A0N,40,40",
      "^FDProducto: XYZ-123^FS",
      `^FO${PADDING + 300},${PADDING + 160}`,
      "^A0N,40,40",
      "^FDFecha: 2025-11-06^FS",
      "^XZ",
    ].join("\n");
  };

  const downloadZpl = (zplString, filename = "label.txt") => {
    const blob = new Blob([zplString], { type: "text/plain;charset=us-ascii" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const zpl = generateZpl({
      title: "Dealer Tire - Asset",
      qrData: "ASSET-00123",
    });
    downloadZpl(zpl, "asset_label.txt");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-xl font-semibold">Generar etiqueta Zebra</h2>
      <button
        onClick={handlePrint}
        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
      >
        Descargar ZPL
      </button>
    </div>
  );
}
