import { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { VscNewFile } from "react-icons/vsc";

import { useWorkspaceDispatch } from "../../contexts/WorkspaceContext";

function Workspace() {
  const workspaceDispatch = useWorkspaceDispatch();

  const workspaceRef = useRef<Editor>(null);

  const createNewPageButton = () => {
    const button = document.createElement("button");

    button.className = "toastui-editor-toolbar-icons";
    button.style.backgroundImage = "none";
    button.style.margin = "0";
    button.style.width = "100px";
    button.innerHTML = "New Page";
    button.addEventListener("click", () => {
      console.log("button click test!");
    });

    return button;
  };

  const changeWorkspaceTextHandler = () => {
    const md = workspaceRef.current?.getInstance().getMarkdown();
    workspaceDispatch({ type: "UPDATE_MD", md: md });
  };

  return (
    <div id="editor">
      <Editor
        ref={workspaceRef}
        height={window.innerHeight - 55 + "px"}
        previewStyle="vertical"
        onChange={changeWorkspaceTextHandler}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
          [
            {
              el: createNewPageButton(),
              name: "test test",
            },
          ],
        ]}
      />
    </div>
  );
}

export default Workspace;
