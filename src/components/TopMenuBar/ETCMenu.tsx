import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";

import { MenuButton } from "./TopMenuBar";

function ETCMenu() {
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Body>Update Test Popover</Popover.Body>
        </Popover>
      }
    >
      <MenuButton>
        <BsThreeDots />
      </MenuButton>
    </OverlayTrigger>
  );
}

export default ETCMenu;
