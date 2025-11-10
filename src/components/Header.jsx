import React, { useState } from "react";
import NavButton from "../utils/NavButton";
import { Icon } from "../imports/icons";
import { handleDownloadQR, handleDownloadQRsvg } from "./Canvas";
import { useZplLabel } from "../hooks/useZplLabel.js";

function Header({ user }) {
  const [hover, setHover] = useState(true);
  const { selectedTemplate, generateZpl, customName } = useZplLabel();
  const canGenerateZpl = Boolean(selectedTemplate?.build);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadZpl = () => {
    if (!canGenerateZpl) {
      alert("Selecciona un template Zebra para descargar el ZPL.");
      return;
    }
    const zpl = generateZpl();
    if (!zpl) return;
    const fileName = customName.name || selectedTemplate?.label || "label";

    const blob = new Blob([zpl], { type: "text/plain;charset=us-ascii" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLocalPrintZpl = () => {
    if (!canGenerateZpl) {
      alert("Selecciona un template Zebra para imprimir.");
      return;
    }
    const zpl = generateZpl();
    if (!zpl) return;

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
    <div className=" s w-full sticky to-0%  h-15 flex items-center justify-end ">
      <div className="flex items-center justify-end  gap-2 px-5 py-1">
        <NavButton
          onClick={handleDownloadQRsvg}
          textVisibility={true}
          icon={Icon.download}
          tap={true}
        >
          Download SVG
        </NavButton>
        <NavButton
          onClick={handleDownloadQR}
          textVisibility={true}
          icon={Icon.download}
          tap={true}
        >
          Download PNG
        </NavButton>
        <NavButton
          onClick={handleDownloadZpl}
          textVisibility={true}
          icon={Icon.download}
          tap={true}
        >
          Descargar .txt (ZPL)
        </NavButton>
        <NavButton
          onClick={handleLocalPrintZpl}
          textVisibility={true}
          icon={Icon.print}
          tap={true}
        >
          Print Zebra
        </NavButton>
        <NavButton
          onClick={handlePrint}
          textVisibility={hover}
          icon={Icon.print}
          tap={true}
        >
          Print
        </NavButton>
      </div>
    </div>
  );
}

export default Header;
