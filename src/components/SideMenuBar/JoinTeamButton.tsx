import { useState } from "react";
import { Accordion, Modal, Button, Form, Col } from "react-bootstrap";
import { MdOutlineAddBox } from "react-icons/md";
import styled from "styled-components";

import { EndPointCustomH5 } from "./SideMenuBar";

function JoinTeamButton() {
  const [joinTeamModal, setJoinTeamModal] = useState(false);
  const [teamName, setTeamName] = useState("");

  const teamNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTeamName(event.target.value);
  };

  const joinTeamHandler = () => {};

  return (
    <div>
      <Accordion.Item eventKey="9999">
        <EndPointCustomH5
          $active={false}
          onClick={() => setJoinTeamModal(true)}
        >
          <MdOutlineAddBox /> 팀 가입
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
          <Modal.Title>팀 가입</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JoinTeamTitleLabel>팀 검색</JoinTeamTitleLabel>
          <SearchBarWrapper>
            <Form.Control
              size="lg"
              type="text"
              placeholder="팀 이름을 입력해주세요."
              value={teamName}
              onChange={teamNameChangeHandler}
            />
            <Button className="search-button">검색</Button>
          </SearchBarWrapper>
          <TeamListWrapper></TeamListWrapper>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setJoinTeamModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JoinTeamButton;

const JoinTeamTitleLabel = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
`;

const TeamListWrapper = styled.div`
  height: 400px;
  margin: 10px 0;
  background-color: green;
  overflow: scroll;
`;

const SearchBarWrapper = styled.div`
  display: flex;

  .search-button {
    margin-left: 10px;
    width: 75px;
  }
`;
