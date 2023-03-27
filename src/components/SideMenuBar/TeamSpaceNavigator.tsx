import { Accordion } from "react-bootstrap";

import { useUIDispatch } from "../../contexts/UIContext";

type TeamSpaceNavigatorType = {
  teamId: number;
  teamName: String;
};

function TeamSpaceNavigator(props: TeamSpaceNavigatorType) {
  const uiDispatch = useUIDispatch();

  const testSpaceToWorkspaceHandler = () => {
    uiDispatch({ type: "OPEN_WORKSPACE" });
  };

  const testSpaceToCalendarHandler = () => {
    uiDispatch({ type: "OPEN_CALENDAR" });
  };

  const testToggleChattingHandler = () => {
    uiDispatch({ type: "TOGGLE_CHATTING" });
  };

  return (
    <Accordion.Item eventKey={`${props.teamId}`}>
      <Accordion.Header>
        <h6>{props.teamName} Space</h6>
      </Accordion.Header>
      <Accordion.Body>
        <Accordion alwaysOpen flush>
          <Accordion.Item eventKey={`${props.teamId} workspace`}>
            <h5>작업공간</h5>
          </Accordion.Item>
          <Accordion.Item eventKey={`${props.teamId} schedule`}>
            <h5 onClick={testSpaceToCalendarHandler}>스케줄</h5>
          </Accordion.Item>
          <Accordion.Item eventKey={`${props.teamId} chatting`}>
            <h5 onClick={testToggleChattingHandler}>단체채팅</h5>
          </Accordion.Item>
        </Accordion>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default TeamSpaceNavigator;
