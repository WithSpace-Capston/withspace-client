import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Accordion, Modal, Button, Form, Card } from "react-bootstrap";
import { MdOutlineAddBox } from "react-icons/md";
import styled from "styled-components";
import axios from "axios";

import { EndPointCustomH5 } from "./SideMenuBar";
import { userInfoState } from "../../contexts/UserInfoState";

function JoinTeamButton() {
  const navigate = useNavigate();

  const userInfo = useRecoilValue(userInfoState);
  const [joinTeamModal, setJoinTeamModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [searchedTeamList, setSearchedTeamList] = useState<
    { teamId: number; teamName: string }[]
  >([]);

  const teamNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTeamName(event.target.value);
  };

  const searchTeamHandler = async () => {
    const token = localStorage.getItem("withspace_token");
    const response = await axios.get(`/team/name/${teamName}`, {
      headers: { "JWT-Authorization": `Bearer ${token}` },
    });
    console.log(response);
    setSearchedTeamList(response.data.data);
  };

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
            <Button className="search-button" onClick={searchTeamHandler}>
              검색
            </Button>
          </SearchBarWrapper>
          <TeamListWrapper>
            {searchedTeamList &&
              searchedTeamList.map((team) => {
                return (
                  <>
                    <Card body key={team.teamId}>
                      {team.teamName}
                    </Card>
                    <Button
                      onClick={async () => {
                        const token = localStorage.getItem("withspace_token");

                        const joinTeamRes = await axios.post(
                          `/team/${team.teamId}/members`,
                          {
                            memberId: userInfo.id,
                          },
                          {
                            headers: { "JWT-Authorization": `Bearer ${token}` },
                          }
                        );
                        const joinedTeamId = joinTeamRes.data.data.teamId;

                        const joinedTeamSpaceRes = await axios.get(
                          `/team/${joinedTeamId}/space`,
                          {
                            headers: { "JWT-Authorization": token },
                          }
                        );
                        const joinedTeamInitialPageId =
                          joinedTeamSpaceRes.data.data.pageList[0].pageId;

                        setJoinTeamModal(false);
                        navigate(`/space/${joinedTeamInitialPageId}`);
                      }}
                    >
                      가입
                    </Button>
                  </>
                );
              })}
          </TeamListWrapper>
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
  overflow: scroll;
`;

export const SearchBarWrapper = styled.div`
  display: flex;

  .search-button {
    margin-left: 10px;
    width: 75px;
  }
`;
