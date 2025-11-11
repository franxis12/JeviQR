import { useCallback, useMemo } from "react";
import { useQRCode } from "../context/QRCodeContext.jsx";
import { useZPLSetting } from "../context/ZplContext.jsx";
import {
  getZplTemplateById,
  zplTemplates,
} from "../constants/zplTemplates.js";

export function useZplLabel() {
  const { qrText, customName, style } = useQRCode();
  const { selectedTemplateId, templateValuesById } = useZPLSetting();

  const selectedTemplate =
    getZplTemplateById(selectedTemplateId) || zplTemplates[0];
  const selectedTemplateValues = useMemo(
    () => templateValuesById[selectedTemplate?.id] || {},
    [templateValuesById, selectedTemplate?.id]
  );

  const generateZpl = useCallback(() => {
    if (!selectedTemplate?.build) return "";
    return selectedTemplate.build({
      qrText,
      customName,
      style,
      templateValues: selectedTemplateValues,
    });
  }, [selectedTemplate, qrText, customName, style, selectedTemplateValues]);

  return {
    qrText,
    customName,
    style,
    selectedTemplate,
    selectedTemplateValues,
    generateZpl,
  };
}
