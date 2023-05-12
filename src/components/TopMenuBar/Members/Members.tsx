import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsFillPeopleFill } from "react-icons/bs";
import axios from "axios";

import Member from "./Member";
import AddNewFriendButton from "./AddNewFriendButton";
import { MenuButton } from "../TopMenuBar";
import { userInfoState } from "../../../contexts/UserInfoState";
import { useTeamState } from "../../../contexts/TeamContext";

export type FriendInfoType = {
  id: number;
  name: string;
  status: boolean;
}[];

type TeamMemberInfoType = {
  userId: number;
  memberName: string;
  status: boolean;
}[];

function Members() {
  const teamState = useTeamState();

  const userInfo = useRecoilValue(userInfoState);
  const [friendInfo, setFriendInfo] = useState<FriendInfoType | undefined>();
  const [teamMemberInfo, setTeamMemberInfo] = useState<
    TeamMemberInfoType | undefined
  >();

  useEffect(() => {
    const token = localStorage.getItem("withspace_token");

    // Personal Space에 있을 때는 유저의 친구 fetch
    if (userInfo.inPersonal && !userInfo.activeTeamId) {
      const fetchFriendInfo = async () => {
        const response = await axios.get(`/${userInfo.id}/friend`, {
          headers: { "JWT-Authorization": `Bearer ${token}` },
        });
        const friendList: FriendInfoType = response.data.data;
        setFriendInfo(friendList);
      };
      fetchFriendInfo();
    }

    // Team Space에 있을 때는 팀 멤버 fetch
    if (!userInfo.inPersonal && userInfo.activeTeamId) {
      const fetchTeamMemberInfo = async () => {
        const response = await axios.get(`/team/${userInfo.activeTeamId}`, {
          headers: { "JWT-Authorization": `Bearer ${token}` },
        });
        const memberList: TeamMemberInfoType =
          response.data.data.memberTeamList;
        console.log(memberList);
        setTeamMemberInfo(memberList);
      };
      fetchTeamMemberInfo();
    }
  }, [userInfo]);

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          {teamState.isPersonal &&
            friendInfo?.map((friend) => {
              return (
                <div>
                  <Member
                    key={`${friend.id}`}
                    memberName={friend.name}
                    status={friend.status}
                  />
                </div>
              );
            })}
          {!teamState.isPersonal &&
            teamMemberInfo?.map((member) => {
              return (
                <Member
                  key={`${member.userId}`}
                  memberName={member.memberName}
                  status={member.status}
                />
              );
            })}
          {teamState.isPersonal && <AddNewFriendButton friends={friendInfo} />}
        </Popover>
      }
    >
      <MenuButton>
        <BsFillPeopleFill /> 멤버
      </MenuButton>
    </OverlayTrigger>
  );
}

export default Members;
