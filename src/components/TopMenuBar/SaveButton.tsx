import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { BsUpload } from "react-icons/bs";
import axios from "axios";
import styled from "styled-components";

import { spaceState } from "../Workspace/recoil/SpaceState";

const PROXY =
  window.location.hostname === "localhost"
    ? ""
    : "https://api.withspace-api.com";

function SaveButton() {
  const params = useParams();

  const [space, setSpace] = useRecoilState(spaceState);

  const spaceUpload = async () => {
    const token = localStorage.getItem("withspace_token");

    // Title Upload Function
    await axios.patch(
      `${PROXY}/page/${params.pageId}/title`,
      {
        title: space.title,
      },
      { headers: { "JWT-Authorization": `Bearer ${token}` } }
    );

    // Content Upload Function
    await axios.patch(
      `${PROXY}/page/${params.pageId}/content`,
      {
        content: space.content,
      },
      { headers: { "JWT-Authorization": `Bearer ${token}` } }
    );

    setSpace({ ...space, edited: false });

    window.location.reload();
  };

  return (
    <SaveButtonWrapper onClick={spaceUpload} $isEdited={space.edited}>
      <BsUpload /> Save
    </SaveButtonWrapper>
  );
}

export default SaveButton;

const SaveButtonWrapper = styled.h3<{ $isEdited: boolean | undefined }>`
  margin: 0;
  padding: 10px;
  background-color: ${(props) => (props.$isEdited ? "white" : "whitesmoke")};

  &:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
`;
