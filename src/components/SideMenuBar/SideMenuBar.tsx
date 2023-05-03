import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

import "./SideMenuBar.css";
import UserName from "./UserName";
import PersonalSpaceNavigator from "./PersonalSpaceNavigator";
import TeamSpaceNavigator from "./TeamSpaceNavigator";
import { parseJwt } from "../Login/Login";

type UserInfoType = {
  id: number;
  memberName: string;
  teamList: { teamId: number; teamName: string }[];
};

function SideMenuBar() {
  const params = useParams();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfoType | undefined>();

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
      setUserInfo(userInfo);
    };

    fetchUserInfo();
  }, [params.id, navigate]);

  return (
    <div className="side-menu-bar">
      <UserName name={userInfo?.memberName} />
      <Accordion alwaysOpen flush defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <CustomH5>Personal Space</CustomH5>
          </Accordion.Header>
          <NestedAccordionBody>
            <PersonalSpaceNavigator userId={userInfo?.id} />
          </NestedAccordionBody>
        </Accordion.Item>
        {userInfo?.teamList.map((team) => {
          return (
            <TeamSpaceNavigator
              key={team.teamId}
              teamId={team.teamId}
              teamName={team.teamName}
            />
          );
        })}
      </Accordion>
    </div>
  );
}

export default SideMenuBar;

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
  }
`;

export const NestedAccordionBody = styled(Accordion.Body)`
  padding: 0 0 0 25px;
`;

export const NestedAccordionItem = styled(Accordion.Item)`
  padding: 0;
`;
