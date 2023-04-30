import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsFillBellFill } from "react-icons/bs";

import { MenuButton } from "./TopMenuBar";

function Alarms() {
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Body>Alarms Test Popover</Popover.Body>
        </Popover>
      }
    >
      <MenuButton>
        <BsFillBellFill /> 알림
      </MenuButton>
    </OverlayTrigger>
  );
}

export default Alarms;
