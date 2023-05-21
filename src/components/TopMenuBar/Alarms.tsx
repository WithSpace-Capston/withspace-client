import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { OverlayTrigger, Popover, Card, Button } from "react-bootstrap";
import { BsFillBellFill } from "react-icons/bs";
import { GrFormRefresh } from "react-icons/gr";
import styled from "styled-components";
import axios from "axios";

import { MenuButton } from "./TopMenuBar";
import { userInfoState } from "../../contexts/UserInfoState";

function Alarms() {
  const userInfo = useRecoilValue(userInfoState);
  const [friendRequestList, setFriendRequestList] = useState<
    { id: number; name: string; email: string; status: null }[]
  >([]);

  useEffect(() => {
    const fetchFriendRequest = async () => {
      try {
        const token = localStorage.getItem("withspace_token");
        const response = await axios.get(`/${userInfo.id}/friendReceive`, {
          headers: { "JWT-Authorization": `Bearer ${token}` },
        });
        console.log(response);
        setFriendRequestList(response.data.data);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchFriendRequest();
  }, [userInfo.id]);

  const refreshRequestListHandler = async () => {
    const token = localStorage.getItem("withspace_token");
    const response = await axios.get(`/${userInfo.id}/friendReceive`, {
      headers: { "JWT-Authorization": `Bearer ${token}` },
    });
    setFriendRequestList(response.data.data);
  };

  const acceptFriendHandler = async (id: number) => {
    const token = localStorage.getItem("withspace_token");
    await axios.post(
      `/${userInfo.id}/friend`,
      {
        friendId: id,
      },
      { headers: { "JWT-Authorization": `Bearer ${token}` } }
    );
    setFriendRequestList(friendRequestList.filter((req) => req.id !== id));
  };

  const denyFriendHandler = async (id: number) => {
    const token = localStorage.getItem("withspace_token");
    await axios.post(
      `/${userInfo.id}/friend/reject`,
      {
        friendId: id.toString(),
      },
      { headers: { "JWT-Authorization": `Bearer ${token}` } }
    );
    setFriendRequestList(friendRequestList.filter((req) => req.id !== id));
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover style={{ width: "300px" }}>
          <PopoverHeader>
            <span>친구 신청 목록</span>
            <RefreshIcon fontSize="25px" onClick={refreshRequestListHandler} />
          </PopoverHeader>
          <Popover.Body style={{ padding: "0" }}>
            {friendRequestList.length === 0 && (
              <CustomMessage>친구 신청 요청이 없습니다</CustomMessage>
            )}
            {friendRequestList.length !== 0 && (
              <RequestListWrapper>
                {friendRequestList.map((req) => {
                  return (
                    <RequestCard body key={req.id}>
                      <RequestCardContentWrapper>
                        <span className="name">{req.name}</span>
                        <ButtonsWrapper>
                          <CustomButton
                            variant="primary"
                            onClick={() => acceptFriendHandler(req.id)}
                          >
                            수락
                          </CustomButton>
                          <CustomButton
                            variant="danger"
                            onClick={() => denyFriendHandler(req.id)}
                          >
                            거절
                          </CustomButton>
                        </ButtonsWrapper>
                      </RequestCardContentWrapper>
                    </RequestCard>
                  );
                })}
              </RequestListWrapper>
            )}
          </Popover.Body>
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

const PopoverHeader = styled(Popover.Header)`
  display: flex;
  justify-content: space-between;
`;

const RefreshIcon = styled(GrFormRefresh)`
  &:hover {
    cursor: pointer;
  }
`;

const CustomMessage = styled.div`
  font-size: 18px;
  text-align: center;
  padding: 20px;
`;

const RequestListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
`;

const RequestCard = styled(Card)``;

const RequestCardContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .name {
    display: flex;
    font-size: 20px;
    align-items: center;
  }
`;

const CustomButton = styled(Button)`
  font-size: 12px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
