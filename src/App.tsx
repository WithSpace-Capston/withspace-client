import { useState } from "react";

import Workspace from "./components/Workspace/Workspace";
import Chatting from "./components/Chatting/Chatting";

import classes from "./App.module.css";
import MyCalendar from "./components/Workspace/Schedule/MyCalendar";

function App() {
  const [isChattingOpen, setIsChattingOpen] = useState(false);

  const openChattingHandler = () => setIsChattingOpen(true);

  const closeChattingHandler = () => setIsChattingOpen(false);

  return (
    <div>
      <MyCalendar />
      <button onClick={openChattingHandler}>
        채팅 슬라이딩 패널 테스트 버튼
      </button>
      <Workspace />
      <Chatting
        isChattingOpen={isChattingOpen}
        onCloseChatting={closeChattingHandler}
      />
    </div>
  );
}

export default App;
