import { useState } from "react";
import { Accordion, Modal, Button } from "react-bootstrap";
import { MdOutlineAddBox } from "react-icons/md";

import { EndPointCustomH5 } from "./SideMenuBar";

function JoinTeamButton() {
  const [createTeamModal, setCreateTeamModal] = useState(false);

  const joinTeamHandler = () => {
    setCreateTeamModal(true);
  };

  return (
    <div>
      <Accordion.Item eventKey="9999">
        <EndPointCustomH5 $active={false} onClick={joinTeamHandler}>
          <MdOutlineAddBox /> 팀 가입
        </EndPointCustomH5>
      </Accordion.Item>
      <Modal
        show={createTeamModal}
        onHide={() => setCreateTeamModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>팀 가입 Modal Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>이것은 팀 가입을 위한 모달창 테스트입니다.</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setCreateTeamModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JoinTeamButton;
