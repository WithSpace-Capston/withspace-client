import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";

import WorkspaceTitle from "./WorkspaceTitle";
import WorkspaceEditor from "./WorkspaceEditor";
import { spaceState } from "./recoil/SpaceState";

function Workspace() {
  const params = useParams();
  const [space, setSpace] = useRecoilState(spaceState);

  useEffect(() => {
    const fetchInitialContent = async () => {
      const token = localStorage.getItem("withspace_token");
      const response = await axios.get(`/page/${params.id}`, {
        headers: { Authorization: token },
      });
      const { pageTitle, content } = response.data;
      setSpace({ title: pageTitle, content: content });
    };

    fetchInitialContent();
  }, [params.id, setSpace]);

  return (
    <div id="editor">
      <WorkspaceTitle />
      <WorkspaceEditor content={space.content} />
    </div>
  );
}

export default Workspace;
