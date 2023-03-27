import { Routes, Route, BrowserRouter } from "react-router-dom";

import SideMenuBar from "./components/SideMenuBar/SideMenuBar";
import TopMenuBar from "./components/TopMenuBar/TopMenuBar";
import MyCalendar from "./components/Schedule/MyCalendar";
import RootNavigator from "./RootNavigator";
import { useUIState } from "./contexts/UIContext";

import "./App.css";
import Workspace from "./components/Workspace/Workspace";

function App() {
  return (
    <BrowserRouter>
      {/* <div className="app">
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
      </div> */}
      <Routes>
        <Route path="/" element={<RootNavigator />} />
        <Route
          path="/:userId/space"
          element={
            <div className="app">
              <div className="side">
                <SideMenuBar />
              </div>
              <div className="main">
                <TopMenuBar />
                <Workspace />
              </div>
            </div>
          }
        />
        <Route
          path="/:userId/calendar"
          element={
            <div className="app">
              <div className="side">
                <SideMenuBar />
              </div>
              <div className="main">
                <TopMenuBar />
                <MyCalendar />
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
