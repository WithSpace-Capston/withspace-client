import { OverlayTrigger, Popover } from "react-bootstrap";
import { GrUpdate } from "react-icons/gr";

function Update() {
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
        <GrUpdate /> 업데이트
      </h3>
    </OverlayTrigger>
  );
}

export default Update;
