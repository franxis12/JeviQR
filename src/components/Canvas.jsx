import Paper from "../utils/Paper";
import ToolsMenu from "./ToolsMenu";
function Canvas({ user }) {
  return (
    <div className=" flex items-center justify-center  ">
      <Paper></Paper>
      <ToolsMenu></ToolsMenu>
    </div>
  );
}

export default Canvas;
