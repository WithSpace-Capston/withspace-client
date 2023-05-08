import styled from "styled-components";
import { useRecoilValue } from "recoil";

import SideMenuBar from "./components/SideMenuBar/SideMenuBar";
import TopMenuBar from "./components/TopMenuBar/TopMenuBar";
import Workspace from "./components/Workspace/Workspace";
import MyCalendar from "./components/Schedule/MyCalendar";
import Chatting from "./components/Chatting/Chatting";
import { uiState } from "./contexts/UIState";

type MainType = {
  space: string;
};

function Main(props: MainType) {
  const uiInfo = useRecoilValue(uiState);

  console.log(uiInfo);

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
