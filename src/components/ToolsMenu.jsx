import { useEffect, useState } from "react";
import { useQRCode } from "../context/QRCodeContext.jsx";
import { useModeCanvas } from "../context/ModeCanvas.jsx";
import { useZPLSetting } from "../context/ZplContext.jsx";
import { zplTemplates } from "../constants/zplTemplates.js";
import CustomTitleSection from "./tools-menu/CustomTitleSection.jsx";
import QrTextSection from "./tools-menu/QrTextSection.jsx";
import CanvasStyleSection from "./tools-menu/CanvasStyleSection.jsx";
import LogoControlsSection from "./tools-menu/LogoControlsSection.jsx";
import ZplTextSection from "./tools-menu/ZplTextSection.jsx";
import TemplateFieldsSection from "./tools-menu/TemplateFieldsSection.jsx";

function ToolsMenu() {
  const { modeCanvasActive } = useModeCanvas();
  const {
    zplSetting,
    setZplSetting,
    selectedTemplateId,
    templateValuesById,
    updateTemplateValue,
  } = useZPLSetting();

  const { qrText, setQrText, customName, setCustomName, style, setStyle } =
    useQRCode();
  const selectedTemplate =
    zplTemplates.find((template) => template.id === selectedTemplateId) ||
    zplTemplates[0];
  const templateFieldValues = templateValuesById[selectedTemplate?.id] || {};
  const [aspect, setAspect] = useState("");

  useEffect(() => {
    if (customName.fontWeight > 900) {
      setCustomName((prev) => ({
        ...prev,
        fontWeight: 900,
      }));
    }
    if (customName.customNameSize > 500) {
      setCustomName((prev) => ({
        ...prev,
        customNameSize: 500,
      }));
    }
  }, [customName.fontWeight, setCustomName, customName.customNameSize]);

  useEffect(() => {
    if (modeCanvasActive === "zebra") {
      setStyle((prev) => ({ ...prev, border: 0 }));
      setStyle({
        border: 0,
        radius: 0,
        borderColor: "#ff9500",
        qrCodeSize: 270,
        qrBgColor: "#ffffff",
        qrMarginSize: 1,
        qrCodeColor: "#000000",
        qrCodeLevel: "H",
        qrLogoWidth: 0,
        qrLogoHeight: 0,
        qrLogo: undefined,
        qrLogoOpacity: 1,
        excavate: false,
      });
      setCustomName({
        name: "",
        title: "Cart Number",
        customNameSize: 50,
        fontWeight: 700,
        textDecoration: "underline",
        visible: true,
        fontColor: "#ff9500",
      });
      setQrText({
        name: "",
        qrTextSize: 20,
        fontWeight: 900,
        textDecoration: "",
        visible: true,
        fontColor: "#555555",
      });
    } else {
      setStyle((prev) => ({ ...prev, border: 10 }));
      setStyle({
        border: 10,
        radius: 50,
        borderColor: "#ff9500",
        qrCodeSize: 240,
        qrBgColor: "#ffffff",
        qrMarginSize: 2,
        qrCodeColor: "#000000",
        qrCodeLevel: "M",
        qrLogoWidth: 100,
        qrLogoHeight: 100,
        qrLogo: undefined,
        qrLogoOpacity: 1,
        excavate: true,
      });
    }
  }, [modeCanvasActive, setCustomName, setQrText, setStyle]);

  const isCanvasTemplate = selectedTemplate?.id === "canvas";
  const isCartTemplate = selectedTemplate?.id === "cart";
  const isIdNumberTemplate = selectedTemplate?.id === "idNumber";

  const shouldShowCustomTitle =
    isCanvasTemplate || isCartTemplate || isIdNumberTemplate;
  const shouldShowQrText = isCanvasTemplate || isCartTemplate;

  return (
    <div className="overflow-x-hidden overflow-y-scroll no-scrollbar   rounded-2xl w-80 max-h-7/8 border transition-all duration-500 border-amber-50/20 bg-(--interfaceColor)/75 hover:bg-(--interfaceColor)  z-100  absolute  p-2 right-3  top-20 ">
      {" "}
      {/*overflow-x-hidden overflow-y-scroll*/}
      {/*Custom Text*/}
      {shouldShowCustomTitle && (
        <CustomTitleSection
          customName={customName}
          setCustomName={setCustomName}
          modeCanvasActive={modeCanvasActive}
          showFontControls={isCanvasTemplate}
        />
      )}
      {/*Text to QR Setting*/}
      {shouldShowQrText && (
        <QrTextSection
          qrText={qrText}
          setQrText={setQrText}
          style={style}
          setStyle={setStyle}
          showFontControls={isCanvasTemplate}
        />
      )}
      {isCanvasTemplate && (
        <>
          <CanvasStyleSection
            style={style}
            setStyle={setStyle}
            qrText={qrText}
          />
          <LogoControlsSection
            style={style}
            setStyle={setStyle}
            aspect={aspect}
            setAspect={setAspect}
          />
          <ZplTextSection
            style={style}
            setStyle={setStyle}
            zplSetting={zplSetting}
            setZplSetting={setZplSetting}
          />
        </>
      )}
      <TemplateFieldsSection
        selectedTemplate={selectedTemplate}
        templateFieldValues={templateFieldValues}
        updateTemplateValue={updateTemplateValue}
      />
    </div>
  );
}

export default ToolsMenu;
