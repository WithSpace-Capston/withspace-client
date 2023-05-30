import { useState, useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";

import { spaceState } from "./recoil/SpaceState";
import { userInfoState } from "../../contexts/UserInfoState";

const PROXY =
  window.location.hostname === "localhost"
    ? ""
    : "https://api.withspace-api.com";

type WorkspaceEditorProps = {
  content: string | undefined;
};

function WorkspaceEditor(props: WorkspaceEditorProps) {
  const params = useParams();
  const navigate = useNavigate();

  const [space, setSpace] = useRecoilState(spaceState);
  const userInfo = useRecoilValue(userInfoState);

  const workspaceRef = useRef<Editor>(null);
  const [insertPageModalActive, setInsertPageModalActive] = useState(false);
  const [deletePageModalActive, setDeletePageModalActive] = useState(false);

  const insertPageModalShow = () => setInsertPageModalActive(true);
  const insertPageModalClose = () => setInsertPageModalActive(false);

  const deletePageModalShow = () => setDeletePageModalActive(true);
  const deletePageModalClose = () => setDeletePageModalActive(false);

  useEffect(() => {
    if (props.content === null) {
      workspaceRef.current?.getInstance().setMarkdown("");
    } else if (props.content) {
      workspaceRef.current?.getInstance().setMarkdown(props.content);
    }
  }, [props.content]);

  const createInsertPageButton = () => {
    const button = document.createElement("button");
    button.className = "toastui-editor-toolbar-icons";
    button.style.backgroundImage = "none";
    button.style.margin = "0";
    button.style.width = "50px";
    button.innerHTML = "Create";
    button.addEventListener("click", () => {
      insertPageModalShow();
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
    const md = workspaceRef.current?.getInstance().getMarkdown();
    setSpace({ ...space, content: md, edited: true });
  };

  const insertPageHandler = async () => {
    const token = localStorage.getItem("withspace_token");

    const getSpaceIdRes = await axios.get(
      `${PROXY}/member/${userInfo.id}/space`,
      {
        headers: { "JWT-Authorization": `Bearer ${token}` },
      }
    );
    const spaceId = getSpaceIdRes.data.data.spaceId;

    const insertPageRes = await axios.post(
      `${PROXY}/space/${spaceId}/page`,
      {
        title: "새로운 페이지",
        parentPageId: params.pageId?.toString(),
      },
      { headers: { "JWT-Authorization": `Bearer ${token}` } }
    );
    const createdPageId = insertPageRes.data.data.pageId;
    const createdPageTitle = insertPageRes.data.data.title;

    workspaceRef.current
      ?.getInstance()
      .insertText(
        `\n[${createdPageTitle}](${window.location.protocol}//${window.location.host}/space/${createdPageId})`
      );

    setSpace({
      ...space,
      content:
        space.content +
        `\n[${createdPageTitle}](${window.location.protocol}//${window.location.host}/space/${createdPageId})`,
    });

    insertPageModalClose();

    console.log(space.title);
    console.log(workspaceRef.current?.getInstance().getMarkdown());

    await axios.patch(
      `${PROXY}/page/${params.pageId}/title`,
      {
        title: space.title,
      },
      { headers: { "JWT-Authorization": `Bearer ${token}` } }
    );

    await axios.patch(
      `${PROXY}/page/${params.pageId}/content`,
      {
        content: workspaceRef.current?.getInstance().getMarkdown(),
      },
      { headers: { "JWT-Authorization": `Bearer ${token}` } }
    );

    window.location.reload();
  };

  const deletePageHandler = async () => {
    const token = localStorage.getItem("withspace_token");
    const response = await axios.patch(
      `${PROXY}/page/${params.pageId}/trashcan`,
      {},
      {
        headers: { "JWT-Authorization": `Bearer ${token}` },
      }
    );
    console.log(response);
    deletePageModalClose();
    navigate(`/space/${userInfo.defaultPageId}`);
    window.location.reload();
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
          <Button variant="second" onClick={deletePageModalClose}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={insertPageModalActive} onHide={insertPageModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            해당 위치에 새로운 페이지를 삽입하시겠습니까?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={insertPageHandler}>
            예
          </Button>
          <Button variant="second" onClick={insertPageModalClose}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
      <Editor
        ref={workspaceRef}
        height={window.innerHeight - 155 + "px"}
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
              el: createInsertPageButton(),
              name: "createInsertPageButton",
            },
            {
              el: createDeletePageButton(),
              name: "createDeletePageButton",
            },
          ],
        ]}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            let formData = new FormData();
            formData.append("file", blob, "filename.jpg");
            const token = localStorage.getItem("withspace_token");
            const response = await axios.post(`/image`, formData, {
              headers: {
                "JWT-Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
            callback(response.data);
          },
        }}
      />
    </>
  );
}

export default WorkspaceEditor;
