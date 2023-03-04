import Members from "./Members";
import Alarms from "./Alarms";
import Search from "./Search";
import Update from "./Update";
import ETCMenu from "./ETCMenu";
import classes from "./TopMenuBar.module.css";
import { useUIDispatch } from "../../contexts/UIContext";

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
    <div className={classes.menu}>
      <h3 onClick={testSpaceToWorkspaceHandler}>Workspace</h3>
      <h3 onClick={testSpaceToCalendarHandler}>Calendar</h3>
      <h3 onClick={testToggleChattingHandler}>Chatting Open/Close</h3>
      <Members />
      <Alarms />
      <Search />
      <Update />
      <ETCMenu />
    </div>
  );
}

export default TopMenuBar;
