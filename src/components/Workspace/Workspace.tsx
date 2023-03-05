import { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

function Workspace() {
  const workspaceRef = useRef<Editor>(null);

  // 일단 실시간으로 입력이 있을 때마다 업로드하는 방식으로 더미 코드 작성
  // 유저가 수동으로 저장하고 업로드하는 방식도 고려 필요
  const changeWorkspaceTextHandler = () => {
    console.log("Upload space!");
    console.log(workspaceRef.current?.getInstance().getMarkdown());
  };

  return (
    <div id="editor">
      <Editor
        ref={workspaceRef}
        height={window.innerHeight - 55 + "px"}
        previewStyle="vertical"
        onChange={changeWorkspaceTextHandler}
      />
    </div>
  );
}

export default Workspace;
