import { useRecoilState, useSetRecoilState } from "recoil";
import { Card, Badge, OverlayTrigger, Popover } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

import { userInfoState } from "../../../contexts/UserInfoState";
import { uiState } from "../../../contexts/UIState";
import { ChatroomInfoType } from "../../SideMenuBar/TeamSpaceNavigator";

const PROXY =
  window.location.hostname === "localhost"
    ? ""
    : "https://api.withspace-api.com";

type MemberType = {
  memberId: number;
  memberName: string;
  status: boolean;
  isFriend: boolean;
};

function Member(props: MemberType) {
  const setUiInfo = useSetRecoilState(uiState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const openChattingHandler = async (targetId: number) => {
    const token = localStorage.getItem("withspace_token");

    const response = await axios.get(
      `${PROXY}/member/${userInfo.id}/chatrooms`,
      {
        headers: { "JWT-Authorization": `Bearer ${token}` },
      }
    );
    const chatRoomInfoList: ChatroomInfoType = response.data.data;
    const roomId = chatRoomInfoList.filter((room) => {
      if (room.id === targetId) return room.id;
    })[0].chatRoomId;

    setUserInfo({ ...userInfo, activeChattingRoomId: roomId });
    setUiInfo({ isChatting: true });
  };

  const deleteFriendHandler = async () => {
    const token = localStorage.getItem("withspace_token");
    await axios.delete(`/friend/${userInfo.id}/${props.memberId}`, {
      headers: { "JWT-Authorization": `Bearer ${token}` },
    });
    window.location.reload();
  };

  return (
    <div>
      {props.isFriend && (
        <OverlayTrigger
          placement="right"
          trigger="click"
          overlay={
            <OptionPopover style={{ position: "relative", zIndex: "0" }}>
              <MemberCard
                body
                onClick={() => openChattingHandler(props.memberId)}
              >
                채팅
              </MemberCard>
              <MemberCard body onClick={deleteFriendHandler}>
                삭제
              </MemberCard>
            </OptionPopover>
          }
        >
          <MemberCard body>
            <Badge pill bg={props.status ? "success" : "danger"}>
              &nbsp;
            </Badge>
            &nbsp;
            {props.memberName}
          </MemberCard>
        </OverlayTrigger>
      )}
      {!props.isFriend && (
        <MemberCard body>
          <Badge pill bg={props.status ? "success" : "danger"}>
            &nbsp;
          </Badge>
          &nbsp;
          {props.memberName}
        </MemberCard>
      )}
    </div>
  );
}

export default Member;

export const MemberCard = styled(Card)`
  cursor: pointer;

  &:hover {
    background-color: #f7f7f5;
    transition: 0.5s;
  }
`;

const OptionPopover = styled(Popover)`
  display: flex;
  flex-direction: row;
`;
