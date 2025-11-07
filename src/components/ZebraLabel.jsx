import React, { useEffect, useState } from "react";
import { useQRCode } from "../context/QRCodeContext.jsx";
import QRCodeGenerator from "./QRCodeGenerator.jsx";
import { useModeCanvas } from "../context/ModeCanvas.jsx";

export default function ZebraLabel() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const { qrText, customName, style } = useQRCode();
  const { modeCanvasActive, setModeCanvasActive } = useModeCanvas();

  // 🔹 Genera el código ZPL dinámico
  const generateZpl = ({
    title = customName.name,
    qrData = qrText.name,
  } = {}) => {
    return [
      "^XA",
      "^PW1200",
      "^LL1800",
      `^FO50,50^A0N,${customName.customNameSize},${
        customName.customNameSize + 50
      }^FD` +
        title +
        "^FS",
      `^FO50,150^BQN,2,10^FD${style.qrCodeLevel}A,` + qrData + "^FS",
      "^XZ",
    ].join("\n");
  };

  // 🔹 Botón para imprimir directamente (Supabase)
  const handlePrint = async () => {
    setLoading(true);
    const zpl = generateZpl({
      title: customName.name || "Dealer Tire - Asset",
      qrData: qrText.name || "ASSET-00123",
    });

    try {
      const res = await fetch(
        "https://ojfpmbkzfxjvxohevvoi.functions.supabase.co/print-label",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ zpl }),
        }
      );

      if (!res.ok) throw new Error("Error al enviar a la impresora");
      const data = await res.json();

      if (data.success) {
        alert("✅ Etiqueta enviada correctamente a la Zebra!");
      } else {
        alert("⚠️ Respuesta inesperada: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo imprimir. Ver consola para más detalles.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Botón para descargar el archivo .txt localmente
  const handleDownload = () => {
    const zpl = generateZpl({
      title: customName.name || "Mi Etiqueta",
      qrData: qrText.name || "https://francismartinez.com",
    });

    const blob = new Blob([zpl], { type: "text/plain;charset=us-ascii" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${customName.name || "label"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 🔹 Botón de vista previa
  const handlePreview = () => {
    console.log(modeCanvasActive);

    if (modeCanvasActive === "canvas") {
      setModeCanvasActive("zebra");
      console.log();
    } else if (modeCanvasActive === "zebra") {
      setModeCanvasActive("canvas");
    }
    setPreview(!preview);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-xl font-semibold">Etiqueta Zebra</h2>

      {/* 🔘 Botón para imprimir directo */}
      <button
        onClick={handlePrint}
        disabled={loading}
        className={`px-6 py-2 rounded-md text-white transition ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Imprimiendo..." : "Imprimir directamente"}
      </button>

      {/* 🔘 Botón para descargar el archivo .txt */}
      <button
        onClick={handleDownload}
        className="px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition"
      >
        Descargar .txt (ZPL)
      </button>

      {/* 🔘 Botón para mostrar/ocultar vista previa */}
      <button
        onClick={handlePreview}
        className="px-6 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 transition"
      >
        {preview ? "Ocultar vista previa" : "Ver vista previa"}
      </button>

      {/* 🔹 Contenedor de vista previa */}
      {preview && (
        <div className="mt-6 border-2 border-gray-300 bg-white/50 shadow-md p-4 rounded-md">
          <h3 className="font-semibold mb-2 text-center text-black">
            Vista previa
          </h3>

          <div
            className="relative bg-gray-50 border border-dashed border-gray-400 rounded-lg"
            style={{
              width: "300px",
              height: "450px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "10px",
            }}
          >
            {/* Título */}
            <h4 className="font-bold text-lg mb-2 text-center text-black">
              {customName.name || "Dealer Tire - Asset"}
            </h4>

            {/* QR */}
            <div
              className="bg-white border border-gray-400 p-2 mb-3"
              style={{
                width: "120px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <QRCodeGenerator />
            </div>

            {/* Texto informativo */}
            <div className="text-center text-sm text-black">
              <p>
                <strong>ID:</strong> {qrText.name || "ASSET-00123"}
              </p>
              <p>
                <strong>Fecha:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
