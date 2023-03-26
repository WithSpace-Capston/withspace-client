import { Routes, Route, BrowserRouter } from "react-router-dom";

import SideMenuBar from "./components/SideMenuBar/SideMenuBar";
import TopMenuBar from "./components/TopMenuBar/TopMenuBar";
import MyCalendar from "./components/Schedule/MyCalendar";
import RootNavigator from "./RootNavigator";
import SpaceNavigator from "./components/Workspace/SpaceNavigator";
import { useUIState } from "./contexts/UIContext";

import "./App.css";

function App() {
  const uiState = useUIState();

  return (
    <BrowserRouter>
      <div className="app">
        <div className="side">
          <SideMenuBar />
        </div>
        <div className="main">
          <TopMenuBar />
          <Routes>
            <Route path="/" element={<RootNavigator />} />
            <Route path="/:userId/space" element={<SpaceNavigator />} />
            <Route path="/:userId/calendar" element={<MyCalendar />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
