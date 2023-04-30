import { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Editor } from "@toast-ui/react-editor";
import { useParams } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";

import WorkspaceTitle from "./WorkspaceTitle";
import { useWorkspaceDispatch } from "../../contexts/WorkspaceContext";
import { spaceState } from "./recoil/SpaceState";

type PageContent = {
  pageTitle: string;
  content: string | undefined;
};

function Workspace() {
  const workspaceDispatch = useWorkspaceDispatch();
  const params = useParams();

  const [initialContent, setInitialContent] = useState<
    PageContent | undefined
  >();
  const workspaceRef = useRef<Editor>(null);
  const [space, setSpace] = useRecoilState(spaceState);

  useEffect(() => {
    const fetchInitialContent = async () => {
      const token = localStorage.getItem("withspace_token");
      const response = await axios.get(`/page/${params.id}`, {
        headers: { Authorization: token },
      });
      const { pageTitle, content } = response.data;
      setSpace({
        title: pageTitle,
        content: content,
      });
    };

    fetchInitialContent();
  }, [params.id, setSpace]);

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
      <WorkspaceTitle />
      <Editor
        ref={workspaceRef}
        height={window.innerHeight - 105 + "px"}
        previewStyle="vertical"
        onChange={changeWorkspaceTextHandler}
        initialValue={space.content}
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
