import { BsUpload } from "react-icons/bs";

import { MenuButton } from "./TopMenuBar";

function SaveButton() {
  return (
    <MenuButton>
      <BsUpload /> Save
    </MenuButton>
  );
}

export default SaveButton;
