import { useState, useRef, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";

import { spaceState, spaceEditedState } from "./recoil/SpaceState";
import { userInfoState } from "../../contexts/UserInfoState";

type WorkspaceEditorProps = {
  content: string | undefined;
};

function WorkspaceEditor(props: WorkspaceEditorProps) {
  const params = useParams();
  const navigate = useNavigate();

  const [space, setSpace] = useRecoilState(spaceState);
  const setSpaceEdited = useSetRecoilState(spaceEditedState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const workspaceRef = useRef<Editor>(null);
  const [deletePageModalActive, setDeletePageModalActive] = useState(false);

  useEffect(() => {
    console.log(space.content);
    if (space.content === null) {
      workspaceRef.current?.getInstance().setMarkdown("");
    } else if (space.content) {
      workspaceRef.current?.getInstance().setMarkdown(space.content!);
    }
  }, [space.content]);

  const deletePageModalShow = () => setDeletePageModalActive(true);
  const deletePageModalClose = () => setDeletePageModalActive(false);

  const createNewPageButton = () => {
    const button = document.createElement("button");
    button.className = "toastui-editor-toolbar-icons";
    button.style.backgroundImage = "none";
    button.style.margin = "0";
    button.style.width = "50px";
    button.innerHTML = "Create";
    button.addEventListener("click", () => {
      console.log("button click test!");
    });
    return button;
  };

  const createDeletePageButton = () => {
    const button = document.createElement("button");
    button.className = "toastui-editor-toolbar-icons";
    button.style.backgroundImage = "none";
    button.style.margin = "0";
    button.style.width = "50px";
    button.innerHTML = "Delete";
    button.addEventListener("click", () => {
      deletePageModalShow();
    });
    return button;
  };

  const changeWorkspaceTextHandler = () => {
    setSpaceEdited(true);
    const md = workspaceRef.current?.getInstance().getMarkdown();
    setSpace({ ...space, content: md });
  };

  const deletePageHandler = async () => {
    const token = localStorage.getItem("withspace_token");
    const response = await axios.delete(`/page/${params.pageId}`, {
      headers: { Authorization: token },
    });
    deletePageModalClose();
    console.log(response);
    navigate(`/space/${userInfo.defaultPageId}`);
  };

  return (
    <>
      <Modal show={deletePageModalActive} onHide={deletePageModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>페이지를 삭제하시겠습니까?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={deletePageHandler}>
            예
          </Button>
          <Button
            variant="second"
            onClick={() => setDeletePageModalActive(false)}
          >
            취소
          </Button>
        </Modal.Footer>
      </Modal>
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
              name: "createNewPageButton",
            },
            {
              el: createDeletePageButton(),
              name: "createDeletePageButton",
            },
          ],
        ]}
      />
    </>
  );
}

export default WorkspaceEditor;
