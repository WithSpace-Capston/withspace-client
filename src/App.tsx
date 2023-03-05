import SideMenuBar from "./components/SideMenuBar/SideMenuBar";
import TopMenuBar from "./components/TopMenuBar/TopMenuBar";
import Workspace from "./components/Workspace/Workspace";
import Chatting from "./components/Chatting/Chatting";
import MyCalendar from "./components/Schedule/MyCalendar";
import { useUIState } from "./contexts/UIContext";

import "./App.css";

function App() {
  const uiState = useUIState();

  return (
    <div className="app">
      <div className="side">
        <SideMenuBar />
      </div>
      <div className="main">
        <TopMenuBar />
        {uiState.isSpaceWorkspace && <Workspace />}
        {!uiState.isSpaceWorkspace && <MyCalendar />}
        <Chatting />
      </div>
    </div>
  );
}

export default App;
