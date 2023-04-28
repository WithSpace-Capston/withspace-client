import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import axios from "axios";

import { NestedAccordionBody, CustomH5, EndPointCustomH5 } from "./SideMenuBar";

type TeamSpaceNavigatorType = {
  teamId: number;
  teamName: String;
};

type PageListType = {
  spaceId: number;
  pageList: { pageId: number; parentId: number | null; title: string }[];
};

function TeamSpaceNavigator(props: TeamSpaceNavigatorType) {
  const [pageListInfo, setPageListInfo] = useState<PageListType | undefined>();

  useEffect(() => {
    const fetchTeamSpace = async () => {
      const token = localStorage.getItem("withspace_token");
      const response = await axios.get(`/team/${props.teamId}/space`, {
        headers: { Authorization: token },
      });
      const pageList = response.data.data;
      setPageListInfo(pageList);
      console.log(pageList);
    };

    fetchTeamSpace();
  }, [props.teamId]);

  return (
    <Accordion.Item eventKey={`${props.teamId}`}>
      <Accordion.Header>
        <CustomH5>{props.teamName} Space</CustomH5>
      </Accordion.Header>
      <NestedAccordionBody>
        <Accordion alwaysOpen flush>
          <Accordion.Item eventKey={`${props.teamId} workspace`}>
            <Accordion alwaysOpen flush>
              <Accordion.Header>
                <CustomH5>작업공간</CustomH5>
              </Accordion.Header>
              <NestedAccordionBody>
                {pageListInfo?.pageList.map((page) => {
                  if (page.parentId === null) {
                    return (
                      <EndPointCustomH5 key={page.pageId} className="page-item">
                        {page.title}
                      </EndPointCustomH5>
                    );
                  }
                })}
              </NestedAccordionBody>
            </Accordion>
          </Accordion.Item>
          <Accordion.Item eventKey={`${props.teamId} schedule`}>
            <EndPointCustomH5>스케줄</EndPointCustomH5>
          </Accordion.Item>
          <Accordion.Item eventKey={`${props.teamId} chatting`}>
            <EndPointCustomH5>단체채팅</EndPointCustomH5>
          </Accordion.Item>
        </Accordion>
      </NestedAccordionBody>
    </Accordion.Item>
  );
}

export default TeamSpaceNavigator;
