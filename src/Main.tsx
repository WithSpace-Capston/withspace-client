import { Routes, Route } from "react-router-dom";
import MyCalendar from "./components/Schedule/MyCalendar";

import SideMenuBar from "./components/SideMenuBar/SideMenuBar";
import TopMenuBar from "./components/TopMenuBar/TopMenuBar";
import Workspace from "./components/Workspace/Workspace";

function Main() {
  return (
    <>
      <div className="side">
        <SideMenuBar />
      </div>
      <div className="main">
        <TopMenuBar />
        <Routes>
          <Route path="space" element={<Workspace />} />
          <Route path="calendar" element={<MyCalendar />} />
        </Routes>
      </div>
    </>
  );
}

export default Main;
