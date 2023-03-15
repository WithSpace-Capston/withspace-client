import { useState, useEffect } from "react";
import axios from "axios";
import { Accordion } from "react-bootstrap";

import "./SideMenuBar.css";
import UserName from "./UserName";
import PersonalSpaceNavigator from "./PersonalSpaceNavigator";

const link =
  "https://withspace-1a085-default-rtdb.firebaseio.com/member/1.json";

type UserInfoType = {
  id: number;
  memberName: string;
  teamList: { teamId: number; teamName: string }[];
};

function SideMenuBar() {
  const [userInfo, setUserInfo] = useState<UserInfoType | undefined>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.get(link);
      const userInfo = response.data.data;
      setUserInfo(userInfo);
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="side-menu-bar">
      <UserName name={userInfo?.memberName} />
      <Accordion alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Personal Space</Accordion.Header>
          <Accordion.Body>
            <PersonalSpaceNavigator memberId={userInfo?.id} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default SideMenuBar;
