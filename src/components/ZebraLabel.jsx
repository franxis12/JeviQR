import React, { useEffect, useState } from "react";
import { useQRCode } from "../context/QRCodeContext.jsx";
import QRCodeGenerator from "./QRCodeGenerator.jsx";
import { useModeCanvas } from "../context/ModeCanvas.jsx";
import Button from "../utils/Button.jsx";

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
      "^PW600", // ancho total en dots (≈ 2 pulgadas)
      "^LL800", // alto total (≈ 3 pulgadas)

      // Texto superior (centrado)
      "^FO100,40",
      `^A0N,${customName.customNameSize || 60},${
        customName.customNameSize || 60
      }`,
      "^FB400,1,0,C,0", // centrado en ancho 400
      `^FD${title || "CUSTOM NAME"}^FS`,

      // Borde alrededor del QR
      "^FO60,120",
      "^GB480,480,8,B,16^FS", // ancho=480, alto=480, línea=8, redondeado=16

      // QR centrado dentro del borde
      "^FO100,160",
      "^BQN,2,10",
      `^FD${style.qrCodeLevel || "Q"}A,${qrData}^FS`,

      "^XZ",
    ].join("\n");
  };

  // 🔹 Imprimir desde Supabase (red corporativa//)
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

  // 🔹 Descargar archivo .txt
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

  // 🔹 Imprimir localmente (sin Supabase)
  const handleLocalPrint = () => {
    const zpl = generateZpl({
      title: customName.name || "Dealer Tire - Asset",
      qrData: qrText.name || "ASSET-00123",
    });

    const blob = new Blob([zpl], { type: "text/plain;charset=us-ascii" });
    const url = URL.createObjectURL(blob);

    // Crear un iframe temporal que use el diálogo de impresión del sistema
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print(); // abre la ventana de impresión
    };

    // Limpieza del DOM después de imprimir
    setTimeout(() => {
      document.body.removeChild(iframe);
      URL.revokeObjectURL(url);
    }, 1000);
  };

  // 🔹 Vista previa
  const handlePreview = () => {
    if (modeCanvasActive === "canvas") {
      setModeCanvasActive("zebra");
    } else if (modeCanvasActive === "zebra") {
      setModeCanvasActive("canvas");
    }
    setPreview(!preview);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-xl font-semibold">Etiqueta Zebra</h2>

      {/* Descargar .txt */}
      <Button
        width={"w-60"}
        onClick={handleDownload}
        className="px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition"
      >
        Descargar .txt (ZPL)
      </Button>

      {/* Imprimir desde Supabase */}
      <Button
        selected={true}
        width={"w-60"}
        onClick={handlePrint}
        disabled={loading}
        className={`px-6 py-2 rounded-md text-white transition ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Printing..." : "Print via Supabase"}
      </Button>

      {/* ✅ Nuevo botón para imprimir localmente */}
      <Button
        width={"w-60"}
        onClick={handleLocalPrint}
        className="px-6 py-2 rounded-md text-white bg-orange-600 hover:bg-orange-700 transition"
      >
        Print Locally (Ctrl + P)
      </Button>

      {/* Vista previa */}
      <Button
        width={"w-60"}
        onClick={handlePreview}
        className="px-6 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 transition"
      >
        {preview ? "Ocultar vista previa" : "Ver vista previa"}
      </Button>

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
            {/* CUSTOM NAME */}
            <h4 className="font-bold text-lg text-gray-700 mb-4 tracking-wide">
              {customName.name || "CUSTOM NAME"}
            </h4>

            {/* QR con borde redondeado */}
            <div
              className="flex items-center justify-center bg-white rounded-xl border-4 border-black"
              style={{
                width: "220px",
                height: "220px",
                overflow: "hidden",
              }}
            >
              <QRCodeGenerator />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
