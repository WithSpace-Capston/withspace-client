import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsFillPeopleFill } from "react-icons/bs";
import axios from "axios";

import Member from "./Member";
import AddNewFriendButton from "./AddNewFriendButton";
import { userInfoState } from "../../../contexts/UserInfoState";
import { useTeamState } from "../../../contexts/TeamContext";

type FriendInfoType = {
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
          headers: { Authorization: token },
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
          headers: { Authorization: token },
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
                <Member
                  key={`${friend.id}`}
                  memberName={friend.name}
                  status={friend.status}
                />
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
          <AddNewFriendButton />
        </Popover>
      }
    >
      <h3>
        <BsFillPeopleFill /> 멤버
      </h3>
    </OverlayTrigger>
  );
}

export default Members;
