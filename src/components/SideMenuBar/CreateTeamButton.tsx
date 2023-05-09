import { useState } from "react";
import { Accordion, Modal, Button } from "react-bootstrap";
import { MdOutlineAddBox } from "react-icons/md";

import { EndPointCustomH5 } from "./SideMenuBar";

function CreateTeamButton() {
  const [joinTeamModal, setJoinTeamModal] = useState(false);

  const createTeamHandler = () => {
    setJoinTeamModal(true);
  };

  return (
    <div>
      <Accordion.Item eventKey="9998">
        <EndPointCustomH5 $active={false} onClick={createTeamHandler}>
          <MdOutlineAddBox /> 팀 생성
        </EndPointCustomH5>
      </Accordion.Item>
      <Modal
        show={joinTeamModal}
        onHide={() => setJoinTeamModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>팀 생성 Modal Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>이것은 팀 생성을 위한 모달창 테스트입니다.</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setJoinTeamModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateTeamButton;
