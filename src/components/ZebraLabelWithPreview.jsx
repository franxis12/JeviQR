import React, { useState } from "react";
// Suponiendo que instalaste react-zpl-renderer
import { ZplRenderer } from "react-zpl-renderer";

export default function ZebraLabelWithPreview({ zplCode }) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div>
      <button onClick={() => setShowPreview((prev) => !prev)}>
        {showPreview ? "Ocultar vista previa" : "Ver vista previa"}
      </button>

      {showPreview && (
        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <ZplRenderer
            zpl={zplCode}
            width={400} // ancho en px aprox
            height={300} // alto en px aprox
            scale={1.5} // escala para visualización más nítida
          />
        </div>
      )}
    </div>
  );
}
