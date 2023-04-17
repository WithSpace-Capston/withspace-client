import { useParams } from "react-router-dom";
import MyCalendar from "./components/Schedule/MyCalendar";

import SideMenuBar from "./components/SideMenuBar/SideMenuBar";
import TopMenuBar from "./components/TopMenuBar/TopMenuBar";
import Workspace from "./components/Workspace/Workspace";

type MainType = {
  space: string;
};

function Main(props: MainType) {
  const params = useParams();
  console.log(params);

  return (
    <>
      <div className="side">
        <SideMenuBar />
      </div>
      <div className="main">
        <TopMenuBar />
        {props.space === "space" && <Workspace />}
        {props.space === "calendar" && <MyCalendar />}
      </div>
    </>
  );
}

export default Main;
