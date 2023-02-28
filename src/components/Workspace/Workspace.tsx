import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

function Workspace() {
  return (
    <div id="editor">
      <Editor height="700px" previewStyle="vertical" />
    </div>
  );
}

export default Workspace;
