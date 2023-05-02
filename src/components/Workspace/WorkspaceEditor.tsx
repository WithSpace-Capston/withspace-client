import { useRef, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { spaceState, spaceEditedState } from "./recoil/SpaceState";

type WorkspaceEditorProps = {
  content: string | undefined;
};

function WorkspaceEditor(props: WorkspaceEditorProps) {
  const [space, setSpace] = useRecoilState(spaceState);
  const setSpaceEdited = useSetRecoilState(spaceEditedState);

  const workspaceRef = useRef<Editor>(null);

  useEffect(() => {
    console.log(space.content);
    if (space.content === null) {
      workspaceRef.current?.getInstance().setMarkdown("");
    } else if (space.content) {
      workspaceRef.current?.getInstance().setMarkdown(space.content!);
    }
  }, [space.content]);

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
    setSpaceEdited(true);
    const md = workspaceRef.current?.getInstance().getMarkdown();
    setSpace({ ...space, content: md });
  };

  return (
    <Editor
      ref={workspaceRef}
      height={window.innerHeight - 105 + "px"}
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
  );
}

export default WorkspaceEditor;
