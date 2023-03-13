import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";

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
      <h3>
        <BsThreeDots />
      </h3>
    </OverlayTrigger>
  );
}

export default ETCMenu;
