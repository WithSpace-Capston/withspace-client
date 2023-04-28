import { useRef, useState, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import { useParams } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";

import { useWorkspaceDispatch } from "../../contexts/WorkspaceContext";

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

  useEffect(() => {
    const fetchInitialContent = async () => {
      const token = localStorage.getItem("withspace_token");
      const response = await axios.get(`/page/${params.id}`, {
        headers: { Authorization: token },
      });
      const initialContent = response.data;
      setInitialContent(initialContent);
    };

    fetchInitialContent();
  }, [params.id]);

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
        initialValue={initialContent?.content}
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
