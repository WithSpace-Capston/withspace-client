import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsFillPeopleFill } from "react-icons/bs";

import Member from "./Member";

type FriendInfoType = {
  id: number;
  name: string;
  status: boolean;
}[];

function Members() {
  const params = useParams();

  const [friendInfo, setFriendInfo] = useState<FriendInfoType | undefined>();

  useEffect(() => {
    const fetchFriendInfoApi = `http://ec2-3-35-150-39.ap-northeast-2.compute.amazonaws.com/member/${params.userId}`;
    const fetchFriendInfo = async () => {
      const response = await axios.get(fetchFriendInfoApi);
      const friendInfo = response.data.data.friendList.friendList;
      setFriendInfo(friendInfo);
    };

    fetchFriendInfo();
  }, [params.userId]);

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          {friendInfo?.map((friend) => {
            return (
              <Member
                key={`${friend.id}`}
                memberName={friend.name}
                status={friend.status}
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
