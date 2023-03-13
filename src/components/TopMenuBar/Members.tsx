import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsFillPeopleFill } from "react-icons/bs";

function Members() {
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Body>Members Test Popover</Popover.Body>
        </Popover>
      }
    >
      <h3>
        <BsFillPeopleFill /> 멤버
      </h3>
    </OverlayTrigger>
  );
}

export default Members;
