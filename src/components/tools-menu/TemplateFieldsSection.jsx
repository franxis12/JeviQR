import Input from "../../utils/Input.jsx";

function TemplateFieldsSection({
  selectedTemplate,
  templateFieldValues,
  updateTemplateValue,
}) {
  if (!selectedTemplate?.fields?.length) {
    return null;
  }

  return (
    <div className="w-full border rounded-2xl p-2 border-(--borderColor) my-2">
      <div className="flex items-center justify-between">
        <h1 className="px-2 font-medium">Template data</h1>
        <span className="px-2 text-xs font-semibold uppercase text-(--borderColor)">
          {selectedTemplate.label}
        </span>
      </div>
      <div className="flex w-full flex-col gap-2">
        {selectedTemplate.fields.map((field) => (
          <Input
            key={field.key}
            label={field.label}
            placeholder={field.placeholder}
            type="text"
            value={templateFieldValues[field.key] || ""}
            onChange={(e) =>
              updateTemplateValue(
                selectedTemplate.id,
                field.key,
                e.target.value
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

export default TemplateFieldsSection;
