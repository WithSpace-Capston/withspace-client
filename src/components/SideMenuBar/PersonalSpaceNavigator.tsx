import { useState, useEffect } from "react";
import axios from "axios";
import { Accordion } from "react-bootstrap";

import { useUIDispatch } from "../../contexts/UIContext";

type PersonalSpaceNavigatorType = {
  memberId: number | undefined;
};

function PersonalSpaceNavigator(props: PersonalSpaceNavigatorType) {
  const uiDispatch = useUIDispatch();

  useEffect(() => {
    const fetchPersonalSpaceList = async () => {
      const response = await axios.get(
        `https://withspace-1a085-default-rtdb.firebaseio.com/space/${props.memberId}.json`
      );
      const pageList = response.data;
      console.log(`memberId: ${props.memberId}`);
      console.log(response);
    };

    fetchPersonalSpaceList();
  }, []);

  const testSpaceToWorkspaceHandler = () => {
    uiDispatch({ type: "OPEN_WORKSPACE" });
  };

  const testSpaceToCalendarHandler = () => {
    uiDispatch({ type: "OPEN_CALENDAR" });
  };

  return (
    <>
      <Accordion.Item eventKey="0">
        <Accordion alwaysOpen flush>
          <Accordion.Header>작업공간</Accordion.Header>
          <Accordion.Body>
            <Accordion alwaysOpen flush></Accordion>
          </Accordion.Body>
        </Accordion>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <h3 onClick={testSpaceToCalendarHandler}>스케줄</h3>
      </Accordion.Item>
    </>
  );
}

export default PersonalSpaceNavigator;
