import { ChangeEvent, useState } from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";
import { MdOutlineAddBox } from "react-icons/md";
import styled from "styled-components";
import axios from "axios";

import { SearchBarWrapper } from "../../SideMenuBar/JoinTeamButton";

function AddNewFriendButton() {
  const [addFriendModal, setAddFriendModal] = useState(false);
  const [friendName, setFriendNAme] = useState("");
  const [friendList, setFriendList] = useState<
    { memberId: number; memberName: string }[]
  >([]);

  const friendNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFriendNAme(event.target.value);
  };

  const searchFriendHandler = async () => {
    const token = localStorage.getItem("withspace_token");
    const response = await axios.get(`/member/name`, {
      params: { memberName: friendName },
      headers: { "JWT-Authorization": `Bearer ${token}` },
    });
    setFriendList(response.data.data);
  };

  return (
    <div>
      <AddFriendButton body onClick={() => setAddFriendModal(true)}>
        <MdOutlineAddBox /> 친구 추가
      </AddFriendButton>
      <Modal
        show={addFriendModal}
        onHide={() => setAddFriendModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>친구 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchBarWrapper>
            <Form.Control
              size="lg"
              type="text"
              placeholder="팀 이름을 입력해주세요."
              value={friendName}
              onChange={friendNameChangeHandler}
            />
            <Button className="search-button" onClick={searchFriendHandler}>
              검색
            </Button>
          </SearchBarWrapper>
          <FriendListWrapper>
            {friendList &&
              friendList.map((friend) => {
                return (
                  <FriendCard body key={friend.memberId}>
                    <FriendCardContentWrapper>
                      <span className="name">{friend.memberName}</span>
                      <Button>추가</Button>
                    </FriendCardContentWrapper>
                  </FriendCard>
                );
              })}
          </FriendListWrapper>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddFriendModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddNewFriendButton;

const AddFriendButton = styled(Card)`
  text-align: center;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f5;
    transition: 0.5s;
  }
`;

const FriendListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  margin: 10px 0;
  overflow: scroll;
`;

const FriendCard = styled(Card)`
  margin: 2.5px 0;
`;

const FriendCardContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .name {
    font-size: 20px;
  }
`;
