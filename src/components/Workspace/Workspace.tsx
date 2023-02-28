import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

function Workspace() {
  const workspaceRef = useRef<Editor>(null);

  const changeWorkspaceTextHandler = () => {
    console.log(workspaceRef.current?.getInstance().getMarkdown());
  };

  return (
    <div id="editor">
      <Editor
        ref={workspaceRef}
        height="700px"
        previewStyle="vertical"
        onChange={changeWorkspaceTextHandler}
      />
    </div>
  );
}

export default Workspace;
