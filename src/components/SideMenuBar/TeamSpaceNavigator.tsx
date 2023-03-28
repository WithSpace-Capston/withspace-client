import { Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useTeamDispatch } from "../../contexts/TeamContext";

type TeamSpaceNavigatorType = {
  teamId: number;
  teamName: String;
};

function TeamSpaceNavigator(props: TeamSpaceNavigatorType) {
  const navigate = useNavigate();
  const teamDispatch = useTeamDispatch();

  const testSpaceToWorkspaceHandler = () => {
    teamDispatch({ type: "TO_OTHER_TEAM" });
    navigate(`/${props.teamId}/space`);
  };

  const testSpaceToCalendarHandler = () => {
    teamDispatch({ type: "TO_OTHER_TEAM" });
    navigate(`/${props.teamId}/calendar`);
  };

  return (
    <Accordion.Item eventKey={`${props.teamId}`}>
      <Accordion.Header>
        <h6>{props.teamName} Space</h6>
      </Accordion.Header>
      <Accordion.Body>
        <Accordion alwaysOpen flush>
          <Accordion.Item eventKey={`${props.teamId} workspace`}>
            <h5 onClick={testSpaceToWorkspaceHandler}>작업공간</h5>
          </Accordion.Item>
          <Accordion.Item eventKey={`${props.teamId} schedule`}>
            <h5 onClick={testSpaceToCalendarHandler}>스케줄</h5>
          </Accordion.Item>
          <Accordion.Item eventKey={`${props.teamId} chatting`}>
            <h5>단체채팅</h5>
          </Accordion.Item>
        </Accordion>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default TeamSpaceNavigator;
