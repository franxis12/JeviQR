import Input from "../../utils/Input.jsx";

function ZplTextSection({ style, setStyle, zplSetting, setZplSetting }) {
  return (
    <div className="w-full border rounded-2xl p-2 border-(--borderColor) my-2 ">
      <div className="w-full">
        <div className="flex items-center justify-between gap-1 w-full mb-1 ">
          <Input
            type={"text"}
            placeholder={"Paste here your URL Logo"}
            value={style.qrLogo}
            label={"URL"}
            onChange={(e) =>
              setStyle((prev) => ({
                ...prev,
                qrLogo: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex items-center justify-between gap-1 w-full mb-1 ">
          <Input
            value={zplSetting.text.width}
            onChange={(e) =>
              setZplSetting((prev) => {
                const width = Number(e.target.value);

                return { ...prev, text: { ...prev.text, width: width } };
              })
            }
            width={"w-full"}
            label={"Width"}
            type={"number"}
            min={0}
          />
          <Input
            value={zplSetting.text.heigh}
            onChange={(e) =>
              setZplSetting((prev) => {
                const width = Number(e.target.value);

                return { ...prev, text: { ...prev.text, width } };
              })
            }
            width={"w-full"}
            label={"height"}
            type={"number"}
            min={0}
          />
        </div>

        <div className="flex items-center justify-between gap-1 w-full mb-1 "></div>
      </div>
    </div>
  );
}

export default ZplTextSection;
