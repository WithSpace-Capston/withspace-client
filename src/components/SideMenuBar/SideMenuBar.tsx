import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Accordion } from "react-bootstrap";

import "./SideMenuBar.css";
import UserName from "./UserName";
import PersonalSpaceNavigator from "./PersonalSpaceNavigator";
import TeamSpaceNavigator from "./TeamSpaceNavigator";

type UserInfoType = {
  id: number;
  memberName: string;
  teamList: { teamId: number; teamName: string }[];
};

function SideMenuBar() {
  const params = useParams();

  const [userInfo, setUserInfo] = useState<UserInfoType | undefined>();

  // const link =
  //   "https://withspace-1a085-default-rtdb.firebaseio.com/member/1.json";
  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     const response = await axios.get(link);
  //     const userInfo = response.data.data;
  //     setUserInfo(userInfo);
  //   };

  //   fetchUserInfo();
  // }, []);

  useEffect(() => {
    const fetchUserInfoApi = `http://ec2-3-35-150-39.ap-northeast-2.compute.amazonaws.com/member/${params.userId}`;
    const fetchUserInfo = async () => {
      const response = await axios.get(fetchUserInfoApi);
      const userInfo = response.data.data;
      setUserInfo(userInfo);
    };

    fetchUserInfo();
  }, [params.userId]);

  return (
    <div className="side-menu-bar">
      <UserName name={userInfo?.memberName} />
      <Accordion alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h6>Personal Space</h6>
          </Accordion.Header>
          <Accordion.Body>
            {/* 나중에 유저 아이디 props로 넘겨서 처리하기 */}
            <PersonalSpaceNavigator userId={userInfo?.id} />
          </Accordion.Body>
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
