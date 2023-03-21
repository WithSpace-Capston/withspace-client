import { useState, useEffect } from "react";
import axios from "axios";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsFillPeopleFill } from "react-icons/bs";

import Member from "./Member";

const url = "https://withspace-1a085-default-rtdb.firebaseio.com/team/1.json";

type TeamInfoType = {
  teamName: String;
  memberTeamList: {
    memberName: String;
    status: Boolean;
    userId: Number;
  }[];
};

function Members() {
  const [teamInfo, setTeamInfo] = useState<TeamInfoType | undefined>();

  useEffect(() => {
    const fetchTeamInfo = async () => {
      const response = await axios.get(url);
      const teamInfo = response.data.data;
      setTeamInfo(teamInfo);
    };

    fetchTeamInfo();
  }, []);

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          {teamInfo?.memberTeamList.map((member) => (
            <Member
              key={`${member.userId}`}
              memberName={member.memberName}
              status={member.status}
            />
          ))}
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
