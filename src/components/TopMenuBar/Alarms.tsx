import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsFillBellFill } from "react-icons/bs";

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
      <h3>
        <BsFillBellFill /> 알림
      </h3>
    </OverlayTrigger>
  );
}

export default Alarms;
