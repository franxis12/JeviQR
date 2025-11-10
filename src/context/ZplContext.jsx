import { createContext, useContext, useState } from "react";
import { zplTemplates } from "../constants/zplTemplates.js";

const ZplContext = createContext();

const initialTemplateValues = zplTemplates.reduce((acc, template) => {
  acc[template.id] = template.defaultValues
    ? { ...template.defaultValues }
    : {};
  return acc;
}, {});

export function ZplContextProvider({ children }) {
  const [zplSetting, setZplSetting] = useState({
    qrData: "https://francismartinez.com",
    text: {
      title: "Francis",
      font: "0", // A, B, C, D, E, 0
      orientation: "N", //	•	N → normal,	R → rotado 90°, I → invertido 180°, B → 270°
      width: 100, //+30
      heigh: 100,
      x: 0,
      y: 0,
      textBox: {
        width: 400,
        maxLines: 3,
        lineSpacing: 20,
        justify: "C", //C-> Center, R,L,J
        hanging_indent: 0,
      },
    },
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    zplTemplates[0]?.id || ""
  );
  const [templateValuesById, setTemplateValuesById] = useState(
    initialTemplateValues
  );

  const updateTemplateValue = (templateId, key, value) => {
    setTemplateValuesById((prev) => ({
      ...prev,
      [templateId]: {
        ...(prev[templateId] || {}),
        [key]: value,
      },
    }));
  };

  return (
    <ZplContext.Provider
      value={{
        zplSetting,
        setZplSetting,
        selectedTemplateId,
        setSelectedTemplateId,
        templateValuesById,
        setTemplateValuesById,
        updateTemplateValue,
      }}
    >
      {children}
    </ZplContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useZPLSetting() {
  return useContext(ZplContext);
}
