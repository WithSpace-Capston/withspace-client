import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Accordion } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import axios from "axios";

import { userInfoState } from "../../contexts/UserInfoState";
import { uiState } from "../../contexts/UIState";
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
  const navigate = useNavigate();
  const params = useParams();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const setUiInfo = useSetRecoilState(uiState);
  const [pageListInfo, setPageListInfo] = useState<PageListType | undefined>();

  useEffect(() => {
    const fetchTeamSpace = async () => {
      const token = localStorage.getItem("withspace_token");
      const response = await axios.get(`/team/${props.teamId}/space`, {
        headers: { "JWT-Authorization": `Bearer ${token}` },
      });
      const pageList = response.data.data;
      setPageListInfo(pageList);
    };

    fetchTeamSpace();
  }, [props.teamId]);

  const addNewPageHandler = async () => {
    const token = localStorage.getItem("withspace_token");

    const fetchTeamSpaceRes = await axios.get(`/team/${props.teamId}/space`, {
      headers: { "JWT-Authorization": `Bearer ${token}` },
    });
    const spaceId = fetchTeamSpaceRes.data.data.spaceId;

    const addNewPageRes = await axios.post(
      `/space/${spaceId}/page`,
      {
        title: "새로운 페이지",
      },
      { headers: { "JWT-Authorization": `Bearer ${token}` } }
    );
    const createdPageId = addNewPageRes.data.data.pageId;

    navigate(`/space/${createdPageId}`);
    window.location.reload();
  };

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
                      <EndPointCustomH5
                        key={page.pageId}
                        className="page-item"
                        $active={params.pageId === page.pageId.toString()}
                        onClick={() => {
                          setUserInfo({
                            ...userInfo,
                            inPersonal: false,
                            activeTeamId: props.teamId,
                          });
                          navigate(`/space/${page.pageId}`);
                        }}
                      >
                        {page.title}
                      </EndPointCustomH5>
                    );
                  }
                })}
                <EndPointCustomH5 $active={false} onClick={addNewPageHandler}>
                  <MdOutlineAddBox /> Add Page
                </EndPointCustomH5>
              </NestedAccordionBody>
            </Accordion>
          </Accordion.Item>
          <Accordion.Item eventKey={`${props.teamId} schedule`}>
            <EndPointCustomH5
              $active={false}
              onClick={() => {
                setUserInfo({
                  ...userInfo,
                  inPersonal: false,
                  activeTeamId: props.teamId,
                });
                navigate(`/schedule/${pageListInfo?.spaceId}`);
              }}
            >
              스케줄
            </EndPointCustomH5>
          </Accordion.Item>
          <Accordion.Item eventKey={`${props.teamId} chatting`}>
            <EndPointCustomH5
              $active={false}
              onClick={() => setUiInfo({ isChatting: true })}
            >
              단체채팅
            </EndPointCustomH5>
          </Accordion.Item>
        </Accordion>
      </NestedAccordionBody>
    </Accordion.Item>
  );
}

export default TeamSpaceNavigator;
