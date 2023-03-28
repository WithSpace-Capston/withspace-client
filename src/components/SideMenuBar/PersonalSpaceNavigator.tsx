import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Accordion } from "react-bootstrap";

import { useTeamDispatch } from "../../contexts/TeamContext";

type PersonalSpaceNavigatorType = {
  userId: number | undefined;
};

function PersonalSpaceNavigator(props: PersonalSpaceNavigatorType) {
  const navigate = useNavigate();
  const teamDispatch = useTeamDispatch();

  useEffect(() => {
    const fetchPersonalPageInfoApi = `http://ec2-3-35-150-39.ap-northeast-2.compute.amazonaws.com/member/${props.userId}/space`;
    const fetchPersonPageInfo = async () => {
      const response = await axios.get(fetchPersonalPageInfoApi);
      const pageList = response.data.data;
      console.log(pageList);
    };

    fetchPersonPageInfo();
  }, [props.userId]);

  const testSpaceToWorkspaceHandler = () => {
    teamDispatch({ type: "TO_PERSONAL" });
    navigate(`/${props.userId}/space`);
  };

  const testSpaceToCalendarHandler = () => {
    teamDispatch({ type: "TO_PERSONAL" });
    navigate(`/${props.userId}/calendar`);
  };

  return (
    <>
      <Accordion.Item eventKey="0">
        <h5 onClick={testSpaceToWorkspaceHandler}>작업공간</h5>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <h5 onClick={testSpaceToCalendarHandler}>스케줄</h5>
      </Accordion.Item>
    </>
  );
}

export default PersonalSpaceNavigator;
