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
            <Accordion.Header>
              <h6>작업공간</h6>
            </Accordion.Header>
            <Accordion.Body>
              <h6 onClick={testSpaceToWorkspaceHandler}>테스트 페이지 1</h6>
              <h6 onClick={testSpaceToWorkspaceHandler}>테스트 페이지 2</h6>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <h6 onClick={testSpaceToCalendarHandler}>스케줄</h6>
        <h6 onClick={testToggleChattingHandler}>단체채팅</h6>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default TeamSpaceNavigator;
