import { useState, useEffect } from "react";
import axios from "axios";
import { Accordion } from "react-bootstrap";

import { useUIDispatch } from "../../contexts/UIContext";

type PageListType = {
  pageId: number;
  title: string;
}[];

function PersonalSpaceNavigator() {
  const uiDispatch = useUIDispatch();

  const [pageList, setPageList] = useState<PageListType | undefined>();

  useEffect(() => {
    const fetchPersonalSpaceList = async () => {
      const response = await axios.get(
        `https://withspace-1a085-default-rtdb.firebaseio.com/space/1.json`
      );
      const pageList = response.data.data.pageList;
      setPageList(pageList);
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
          <Accordion.Header>
            <h6>작업공간</h6>
          </Accordion.Header>
          <Accordion.Body>
            {pageList?.map((page) => {
              return (
                <h6 key={page.pageId} onClick={testSpaceToWorkspaceHandler}>
                  {page.title}
                </h6>
              );
            })}
          </Accordion.Body>
        </Accordion>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <h5 onClick={testSpaceToCalendarHandler}>스케줄</h5>
      </Accordion.Item>
    </>
  );
}

export default PersonalSpaceNavigator;
