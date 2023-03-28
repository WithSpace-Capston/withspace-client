import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsFillPeopleFill } from "react-icons/bs";

import Member from "./Member";
import { useTeamState, useTeamDispatch } from "../../../contexts/TeamContext";

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
  const params = useParams();
  const teamState = useTeamState();
  const teamDispatch = useTeamDispatch();

  const [friendInfo, setFriendInfo] = useState<FriendInfoType | undefined>();
  const [teamMemberInfo, setTeamMemberInfo] = useState<
    TeamMemberInfoType | undefined
  >();

  useEffect(() => {
    // Personal Space에 있을 때는 유저의 친구 fetch
    if (teamState.isPersonal) {
      const fetchFriendInfoApi = `http://ec2-3-35-150-39.ap-northeast-2.compute.amazonaws.com/member/${params.id}`;
      const fetchFriendInfo = async () => {
        const response = await axios.get(fetchFriendInfoApi);
        const friendInfo = response.data.data.friendList.friendList;
        setFriendInfo(friendInfo);
      };
      fetchFriendInfo();
    }

    // Team Space에 있을 때는 팀 멤버 fetch
    if (!teamState.isPersonal) {
      const fetchTeamMemberInfoApi = `http://ec2-3-35-150-39.ap-northeast-2.compute.amazonaws.com/team/${params.id}`;
      const fetchTeamMemberInfo = async () => {
        const response = await axios.get(fetchTeamMemberInfoApi);
        const memberInfo = response.data.data.memberTeamList;
        setTeamMemberInfo(memberInfo);
      };
      fetchTeamMemberInfo();
    }
  }, [params.id, teamState.isPersonal, teamDispatch]);

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
