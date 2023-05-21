import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsFillPeopleFill } from "react-icons/bs";
import { GrFormRefresh } from "react-icons/gr";
import styled from "styled-components";
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
        try {
          const response = await axios.get(`/${userInfo.id}/friend`, {
            headers: { "JWT-Authorization": `Bearer ${token}` },
          });
          const friendList: FriendInfoType = response.data.data;
          setFriendInfo(friendList);
        } catch (err: any) {
          console.log(err);
        }
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
        setTeamMemberInfo(memberList);
      };
      fetchTeamMemberInfo();
    }
  }, [userInfo]);

  const refreshFriendList = async () => {
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
        setTeamMemberInfo(memberList);
      };
      fetchTeamMemberInfo();
    }
  };

  return (
    <OverlayTrigger
      placement="bottom"
      trigger="click"
      overlay={
        <CustomPopver>
          <PopoverHeader>
            <span>친구 목록</span>
            <RefreshIcon fontSize="25px" onClick={refreshFriendList} />
          </PopoverHeader>
          {teamState.isPersonal &&
            friendInfo?.map((friend) => {
              return (
                <Member
                  key={`${friend.id}`}
                  memberId={friend.id}
                  memberName={friend.name}
                  status={friend.status}
                  isFriend={true}
                />
              );
            })}
          {!teamState.isPersonal &&
            teamMemberInfo?.map((member) => {
              return (
                <Member
                  key={`${member.userId}`}
                  memberId={member.userId}
                  memberName={member.memberName}
                  status={member.status}
                  isFriend={false}
                />
              );
            })}
          {teamState.isPersonal && <AddNewFriendButton friends={friendInfo} />}
        </CustomPopver>
      }
    >
      <MenuButton>
        <BsFillPeopleFill /> 멤버
      </MenuButton>
    </OverlayTrigger>
  );
}

export default Members;

const CustomPopver = styled(Popover)`
  position: relative;
  z-index: 0;
  min-width: 200px;
`;

const PopoverHeader = styled(Popover.Header)`
  display: flex;
  justify-content: space-between;
`;

const RefreshIcon = styled(GrFormRefresh)`
  &:hover {
    cursor: pointer;
  }
`;
