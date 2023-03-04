import TopMenuBar from "./components/TopMenuBar/TopMenuBar";
import Workspace from "./components/Workspace/Workspace";
import Chatting from "./components/Chatting/Chatting";
import MyCalendar from "./components/Schedule/MyCalendar";
import { useUIState } from "./contexts/UIContext";

import classes from "./App.module.css";

function App() {
  const uiState = useUIState();

  return (
    <div>
      <TopMenuBar />
      {uiState.isSpaceWorkspace && <Workspace />}
      {!uiState.isSpaceWorkspace && <MyCalendar />}
      <Chatting />
    </div>
  );
}

export default App;
