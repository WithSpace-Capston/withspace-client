import { useParams } from "react-router-dom";

import SideMenuBar from "./components/SideMenuBar/SideMenuBar";
import TopMenuBar from "./components/TopMenuBar/TopMenuBar";
import Workspace from "./components/Workspace/Workspace";
import MyCalendar from "./components/Schedule/MyCalendar";

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
        {props.space === "schedule" && <MyCalendar />}
      </div>
    </>
  );
}

export default Main;
