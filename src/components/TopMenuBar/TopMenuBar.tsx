import Members from "./Members/Members";
import Alarms from "./Alarms";
import Search from "./Search";
import Update from "./Update";
import ETCMenu from "./ETCMenu";
import { useUIDispatch } from "../../contexts/UIContext";
import "./TopMenuBar.css";

function TopMenuBar() {
  const uiDispatch = useUIDispatch();

  const testSpaceToWorkspaceHandler = () => {
    uiDispatch({ type: "OPEN_WORKSPACE" });
  };

  const testSpaceToCalendarHandler = () => {
    uiDispatch({ type: "OPEN_CALENDAR" });
  };

  const testToggleChattingHandler = () => {
    uiDispatch({ type: "TOGGLE_CHATTING" });
  };

  return (
    <div className="menu">
      <Members />
      <Alarms />
      <Search />
      <Update />
      <ETCMenu />
    </div>
  );
}

export default TopMenuBar;
