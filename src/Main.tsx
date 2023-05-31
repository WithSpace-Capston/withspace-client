import { useEffect } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import SideMenuBar from "./components/SideMenuBar/SideMenuBar";
import TopMenuBar from "./components/TopMenuBar/TopMenuBar";
import Workspace from "./components/Workspace/Workspace";
import MyCalendar from "./components/Schedule/MyCalendar";
import Chatting from "./components/Chatting/Chatting";
import { uiState } from "./contexts/UIState";
import { userInfoState } from "./contexts/UserInfoState";
import { parseJwt } from "./components/Login/Login";

type MainType = {
  space: string;
};

const PROXY =
  window.location.hostname === "localhost"
    ? ""
    : "https://api.withspace-api.com";

function Main(props: MainType) {
  const navigate = useNavigate();

  const uiInfo = useRecoilValue(uiState);
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    const fetchInitialUserInfo = async () => {
      const token = localStorage.getItem("withspace_token");

      // 만약 토큰이 없거나, 유효기간이 지났다면 로그인 화면으로 디라이렉트
      if (token === null) {
        localStorage.removeItem("userInfoState");
        navigate("/login");
        return;
      }

      const now = Math.floor(new Date().getTime() / 1000);
      if (parseJwt(token).exp < now) {
        localStorage.removeItem("withspace_token");
        localStorage.removeItem("userInfoState");
        navigate("/login");
        return;
      }

      const memberInfoRes = await axios.get(`${PROXY}/member`, {
        headers: { "JWT-Authorization": `Bearer ${token}` },
      });
      const userInfo = memberInfoRes.data.data;

      const spaceInfoRes = await axios.get(
        `${PROXY}/space/${userInfo.spaceId}`,
        {
          headers: { "JWT-Authorization": `Bearer ${token}` },
        }
      );
      const spaceInfo = spaceInfoRes.data;
      const defaultPageId = spaceInfo.pageList[0].pageId;

      console.log(`id -> ${userInfo.id}`);
      console.log(`name -> ${userInfo.memberName}`);

      setUserInfo({
        id: userInfo.id,
        name: userInfo.memberName,
        logined: false,
        defaultPageId: defaultPageId,
        inPersonal: true,
        activeTeamId: null,
        activeChattingRoomId: null,
        teamList: userInfo.teamList,
      });

      return <Navigate to={`/space/${defaultPageId}`} />;
    };

    fetchInitialUserInfo();
  }, [setUserInfo, navigate]);

  return (
    <>
      <SideWrapper>
        <SideMenuBar />
      </SideWrapper>
      <div className="main">
        <TopMenuBar />
        {props.space === "space" && <Workspace />}
        {props.space === "schedule" && <MyCalendar />}
      </div>
      {uiInfo.isChatting && <Chatting />}
    </>
  );
}

export default Main;

const SideWrapper = styled.div`
  overflow: scroll;
  width: 20%;
  height: 100vh;
  background-color: #f7f7f5;
`;
