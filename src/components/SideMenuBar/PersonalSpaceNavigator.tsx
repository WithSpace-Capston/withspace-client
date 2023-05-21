import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { MdOutlineAddBox } from "react-icons/md";
import axios from "axios";

import {
  NestedAccordionBody,
  NestedAccordionItem,
  CustomH5,
  EndPointCustomH5,
} from "./SideMenuBar";
import { userInfoState } from "../../contexts/UserInfoState";

type PersonalSpaceNavigatorType = {
  userId: number | undefined;
};

type PageListType = {
  spaceId: number;
  pageList: { pageId: number; parentId: number | null; title: string }[];
};

function PersonalSpaceNavigator(props: PersonalSpaceNavigatorType) {
  const navigate = useNavigate();
  const params = useParams();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [pageListInfo, setPageListInfo] = useState<PageListType | undefined>();
  const [mostParentPageId, setMostParentPageId] = useState(-1);

  useEffect(() => {
    const fetchPersonalSpace = async () => {
      const token = localStorage.getItem("withspace_token");
      const response = await axios.get(`/member/${props.userId}/space`, {
        headers: { "JWT-Authorization": `Bearer ${token}` },
      });
      const pageList = response.data.data;
      setPageListInfo(pageList);
    };

    const fetchMostParentPageId = async () => {
      const token = localStorage.getItem("withspace_token");
      const response = await axios.get(`/page/${params.pageId}/hierarchy`, {
        headers: { "JWT-Authorization": `Bearer ${token}` },
      });
      setMostParentPageId(response.data[0].pageId);
    };

    fetchPersonalSpace();
    fetchMostParentPageId();
  }, [props.userId, params.pageId]);

  const addNewPage = async () => {
    const token = localStorage.getItem("withspace_token");

    const userInfoFetchRes = await axios.get(`/member/${userInfo.id}/space`, {
      headers: { "JWT-Authorization": `Bearer ${token}` },
    });
    const spaceId = userInfoFetchRes.data.data.spaceId;

    const addPageRes = await axios.post(
      `/space/${spaceId}/page`,
      {
        title: "새로운 페이지",
      },
      { headers: { "JWT-Authorization": `Bearer ${token}` } }
    );

    navigate(`/space/${addPageRes.data.data.pageId}`);
  };

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
                  <EndPointCustomH5
                    $active={mostParentPageId === page.pageId}
                    key={page.pageId}
                    className="page-item"
                    onClick={() => {
                      setUserInfo({
                        ...userInfo,
                        inPersonal: true,
                        activeTeamId: null,
                      });
                      navigate(`/space/${page.pageId}`);
                    }}
                  >
                    {page.title}
                  </EndPointCustomH5>
                );
              }
            })}
            <EndPointCustomH5 $active={false} onClick={addNewPage}>
              <MdOutlineAddBox /> Add Page
            </EndPointCustomH5>
          </NestedAccordionBody>
        </Accordion>
      </Accordion.Item>
      <NestedAccordionItem eventKey="1">
        <EndPointCustomH5
          $active={false}
          onClick={() => {
            setUserInfo({ ...userInfo, inPersonal: true, activeTeamId: null });
            navigate(`/schedule/${pageListInfo?.spaceId}`);
          }}
        >
          스케줄
        </EndPointCustomH5>
      </NestedAccordionItem>
    </>
  );
}

export default PersonalSpaceNavigator;
