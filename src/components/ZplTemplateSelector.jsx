import Button from "../utils/Button.jsx";
import { zplTemplates } from "../constants/zplTemplates.js";
import { useZPLSetting } from "../context/ZplContext.jsx";
import { useModeCanvas } from "../context/ModeCanvas.jsx";

function ZplTemplateSelector({ className = "" }) {
  const { selectedTemplateId, setSelectedTemplateId } = useZPLSetting();
  const { setModeCanvasActive } = useModeCanvas();

  const selectedTemplate =
    zplTemplates.find((template) => template.id === selectedTemplateId) ||
    zplTemplates[0];

  const handleSelect = (templateId) => {
    setSelectedTemplateId(templateId);
    setModeCanvasActive(templateId === "canvas" ? "canvas" : "zebra");
  };

  return (
    <div
      className={`w-50 h-7/8 rounded-xl border border-white/20 bg-white/5 p-4 ${className}`}
    >
      <p className="text-sm font-semibold text-white/80">
        Available templates
      </p>
      <div className="mt-3 flex flex-col items-center justify-center gap-2">
        {zplTemplates.map((option) => (
          <Button
            key={option.id}
            width={"w-40"}
            selected={selectedTemplateId === option.id}
            onClick={() => handleSelect(option.id)}
            className={`px-4 py-2 ${
              selectedTemplateId === option.id
                ? "bg-purple-600 text-white"
                : "bg-white/20 text-white"
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-white/70">
        {selectedTemplate?.description}
      </p>
    </div>
  );
}

export default ZplTemplateSelector;
