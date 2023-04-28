import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import axios from "axios";

import {
  NestedAccordionBody,
  NestedAccordionItem,
  CustomH5,
  EndPointCustomH5,
} from "./SideMenuBar";
import { parseJwt } from "../Login/Login";

type PersonalSpaceNavigatorType = {
  userId: number | undefined;
};

type PageListType = {
  spaceId: number;
  pageList: { pageId: number; parentId: number | null; title: string }[];
};

function PersonalSpaceNavigator(props: PersonalSpaceNavigatorType) {
  const navigate = useNavigate();

  const [pageListInfo, setPageListInfo] = useState<PageListType | undefined>();

  useEffect(() => {
    const fetchPersonalSpace = async () => {
      const token = localStorage.getItem("withspace_token");

      if (token === null) {
        navigate("/login");
      } else {
        const now = Math.floor(new Date().getTime() / 1000);
        if (parseJwt(token).exp < now) {
          localStorage.removeItem("withspace_token");
          navigate("/login");
        }
      }

      const response = await axios.get(`/member/${props.userId}/space`, {
        headers: { Authorization: token },
      });
      const pageList = response.data.data;
      setPageListInfo(pageList);
    };

    fetchPersonalSpace();
  }, [props.userId, navigate]);

  return (
    <>
      <Accordion.Item eventKey="0">
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
      <NestedAccordionItem eventKey="1">
        <EndPointCustomH5>스케줄</EndPointCustomH5>
      </NestedAccordionItem>
    </>
  );
}

export default PersonalSpaceNavigator;
