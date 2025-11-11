import React from "react";
import QRCodeGenerator from "./QRCodeGenerator.jsx";
import ZplTemplateSelector from "./ZplTemplateSelector.jsx";
import Canvas from "./Canvas.jsx";
import { useZplLabel } from "../hooks/useZplLabel.js";

export default function ZebraLabel() {
  const {
    selectedTemplate,
    selectedTemplateValues,
    generateZpl,
    customName,
    qrText,
  } = useZplLabel();

  const renderPreviewContent = () => {
    if (selectedTemplate?.id === "canvas") {
      return (
        <div className="w-full rounded-xl border border-amber-200/40 bg-white/10 p-4">
          <Canvas canvasId="qr-sheet" />
        </div>
      );
    }

    if (selectedTemplate?.id === "idNumber") {
      return (
        <div
          className="relative flex text-red flex-col items-center j rounded-xl border border-gray-800 bg-white"
          style={{
            width: "470px",
            height: "300px",
            padding: "10px",
          }}
        >
          <div className="flex w-full items-center justify-center rounded-xl border-4 border-black bg-white">
            <h4
              className={`mt-2 mb-4 text-[75px] font-bold tracking-wide scale-y-190 scale-x-210 ${
                customName.name ? "text-black" : "text-slate-300/80"
              }`}
            >
              {customName.name || "1234"}
            </h4>
          </div>
          <div
            className="mt-1 flex w-full items-center justify-start rounded-xl border-4 border-black bg-white"
            style={{
              height: "400px",
              overflow: "hidden",
            }}
          >
            <QRCodeGenerator />
          </div>
        </div>
      );
    }

    if (selectedTemplate?.id === "cart") {
      return (
        <div
          className="relative flex text-black flex-col items-center justify-between rounded-xl border border-gray-800 bg-white"
          style={{
            width: "300px",
            height: "470px",
            padding: "10px",
          }}
        >
          <div className="flex w-full items-center justify-center">
            <h2 className="text-2xl font-bold">{customName.title}</h2>
          </div>
          <div className="flex w-full items-center justify-center rounded-xl border-4 border-black bg-white">
            <h4
              className={`mt-2 mb-4 text-[75px] font-bold tracking-wide scale-y-190 ${
                customName.name ? "text-black" : "text-slate-300/80"
              }`}
            >
              {customName.name || "1234"}
            </h4>
          </div>
          <div
            className="mt-1 flex w-full items-center justify-center rounded-xl border-4 border-black bg-white"
            style={{
              height: "370px",
              overflow: "hidden",
            }}
          >
            <QRCodeGenerator />
          </div>
        </div>
      );
    }

    if (selectedTemplate?.id === "tracking") {
      const values = {
        ...(selectedTemplate?.defaultValues || {}),
        ...selectedTemplateValues,
      };
      const trackingUrl =
        qrText?.name || "https://track.example.com/TRK123456789";

      return (
        <div className="w-[320px] space-y-3 rounded-xl border border-gray-400 bg-white p-5 text-gray-900">
          <p className="text-xl font-semibold">
            {values.header || "Warehouse"}
          </p>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-500">
              Pickup Location
            </p>
            <p className="text-base font-medium">
              {values.pickupLocation || "Warehouse #4 - RI"}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-500">
              Destination
            </p>
            <p className="text-base font-medium">
              {values.destination || "John Doe, Miami FL"}
            </p>
          </div>
          <div className="border-t border-dashed border-gray-300 pt-3">
            <p className="text-sm font-semibold">
              Tracking: {values.trackingNumber || "TRK123456789"}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-3">
            <div
              className="transform rounded-md border border-gray-900 bg-white p-1"
              style={{
                transform: "scale(0.75)",
                transformOrigin: "top center",
              }}
            >
              <QRCodeGenerator />
            </div>
            <p className="break-all text-center text-xs text-gray-600">
              {trackingUrl}
            </p>
            <p className="text-[11px] uppercase tracking-widest text-gray-500">
              {values.cta || "Scan for Tracking"}
            </p>
          </div>
        </div>
      );
    }

    return (
      <pre className="w-full whitespace-pre-wrap text-xs text-white/80">
        {selectedTemplate?.build
          ? generateZpl()
          : "Select a template to preview it"}
      </pre>
    );
  };

  return (
    <div className="flex  items-center gap-4 p-6">
      <ZplTemplateSelector className="max-w-2xl" />

      <div className="flex w-full max-w-2xl flex-col items-center justify-center rounded-xl border border-gray-300 bg-white/10 p-6 shadow-md">
        {renderPreviewContent()}
      </div>
    </div>
  );
}
