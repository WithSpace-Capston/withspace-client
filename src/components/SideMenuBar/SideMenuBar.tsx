import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

import UserName from "./UserName";
import PersonalSpaceNavigator from "./PersonalSpaceNavigator";
import TeamSpaceNavigator from "./TeamSpaceNavigator";
import CreateTeamButton from "./CreateTeamButton";
import JoinTeamButton from "./JoinTeamButton";
import { parseJwt } from "../Login/Login";
import { userInfoState } from "../../contexts/UserInfoState";

type UserInfoType = {
  id: number;
  memberName: string;
  teamList: { teamId: number; teamName: string }[];
};

function SideMenuBar() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserInfoType | undefined>();
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("withspace_token");

      if (token === null) {
        navigate("/login");
      } else {
        const now = Math.floor(new Date().getTime() / 1000);
        if (parseJwt(token).exp < now) {
          localStorage.removeItem("withspace_token");
          navigate("/login");
        }
      }

      const response = await axios.get(`/member`, {
        headers: { Authorization: token },
      });
      const userInfo = response.data.data;

      const response2 = await axios.get(`/member/${userInfo.id}/space`, {
        headers: { Authorization: token },
      });
      const defaultPageId = response2.data.data.pageList[0].pageId;

      setUserInfo({
        id: userInfo.id,
        logined: true,
        defaultPageId: defaultPageId,
        inPersonal: true,
        activeTeamId: null,
      });
      setUser(userInfo);
    };

    fetchUserInfo();
  }, [navigate, setUserInfo]);

  return (
    <SideMenuBarWrapper>
      <UserName name={user?.memberName} />
      <Accordion alwaysOpen flush defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <CustomH5>Personal Space</CustomH5>
          </Accordion.Header>
          <NestedAccordionBody>
            <PersonalSpaceNavigator userId={user?.id} />
          </NestedAccordionBody>
        </Accordion.Item>
        {user?.teamList.map((team) => {
          return (
            <TeamSpaceNavigator
              key={team.teamId}
              teamId={team.teamId}
              teamName={team.teamName}
            />
          );
        })}
        <CreateTeamButton />
        <JoinTeamButton />
      </Accordion>
    </SideMenuBarWrapper>
  );
}

export default SideMenuBar;

const SideMenuBarWrapper = styled.div`
  background-color: #f7f7f5;
`;

export const CustomH5 = styled.h5`
  margin: 0;
`;

export const EndPointCustomH5 = styled.h5<{ $active: boolean }>`
  margin: 0;
  padding: 16px 20px;

  background-color: ${(props) => (props.$active ? "whitesmoke" : "white")};

  &:hover {
    background-color: whitesmoke;
    transition: 0.5s;
    cursor: pointer;
  }
`;

export const NestedAccordionBody = styled(Accordion.Body)`
  padding: 0 0 0 25px;
`;

export const NestedAccordionItem = styled(Accordion.Item)`
  padding: 0;
`;
