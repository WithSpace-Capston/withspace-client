import { useRecoilState, useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { BsUpload } from "react-icons/bs";
import axios from "axios";

import { MenuButton } from "./TopMenuBar";
import { spaceState, spaceEditedState } from "../Workspace/recoil/SpaceState";

function UploadButton() {
  const params = useParams();

  const [space, setSpace] = useRecoilState(spaceState);
  const setSpaceEdited = useSetRecoilState(spaceEditedState);

  const spaceUpload = async () => {
    const token = localStorage.getItem("withspace_token");

    // Title Upload Function
    const titleUploadRes = await axios.patch(
      `/page/${params.id}/title`,
      {
        title: space.title,
      },
      { headers: { Authorization: token } }
    );
    console.log(titleUploadRes);

    // Content Upload Function
    const contentUploadRes = await axios.patch(
      `/page/${params.id}/content`,
      {
        content: space.content,
      },
      { headers: { Authorization: token } }
    );
    console.log(contentUploadRes);

    setSpaceEdited(false);
  };

  return (
    <MenuButton onClick={spaceUpload}>
      <BsUpload /> Upload
    </MenuButton>
  );
}

export default UploadButton;
