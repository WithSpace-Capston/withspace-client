import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";

import WorkspaceBreadcrumb from "./SpaceBreadcrumb";
import WorkspaceTitle from "./WorkspaceTitle";
import WorkspaceEditor from "./WorkspaceEditor";
import { spaceState } from "./recoil/SpaceState";

const PROXY =
  window.location.hostname === "localhost"
    ? ""
    : "https://api.withspace-api.com";

function Workspace() {
  const params = useParams();

  const setSpace = useSetRecoilState(spaceState);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchInitialContent = async () => {
      try {
        const token = localStorage.getItem("withspace_token");
        const response = await axios.get(`${PROXY}/page/${params.pageId}`, {
          headers: { "JWT-Authorization": `Bearer ${token}` },
        });
        const { pageTitle, content } = response.data;
        setContent(content);
        setSpace({ title: pageTitle, content: content });
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchInitialContent();
  }, [params.pageId, setSpace]);

  return (
    <div id="editor">
      <WorkspaceBreadcrumb />
      <WorkspaceTitle />
      <WorkspaceEditor content={content} />
    </div>
  );
}

export default Workspace;
