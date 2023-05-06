import { useRecoilValue, useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { BsUpload } from "react-icons/bs";
import axios from "axios";

import { MenuButton } from "./TopMenuBar";
import { spaceState, spaceEditedState } from "../Workspace/recoil/SpaceState";

function SaveButton() {
  const params = useParams();

  const space = useRecoilValue(spaceState);
  const setSpaceEdited = useSetRecoilState(spaceEditedState);

  const spaceUpload = async () => {
    const token = localStorage.getItem("withspace_token");

    // Title Upload Function
    await axios.patch(
      `/page/${params.pageId}/title`,
      {
        title: space.title,
      },
      { headers: { Authorization: token } }
    );

    // Content Upload Function
    await axios.patch(
      `/page/${params.pageId}/content`,
      {
        content: space.content,
      },
      { headers: { Authorization: token } }
    );

    setSpaceEdited(false);

    window.location.reload();
  };

  return (
    <MenuButton onClick={spaceUpload}>
      <BsUpload /> Save
    </MenuButton>
  );
}

export default SaveButton;
