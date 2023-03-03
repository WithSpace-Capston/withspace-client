import Members from "./Members";
import Alarms from "./Alarms";
import Search from "./Search";
import Update from "./Update";
import ETCMenu from "./ETCMenu";
import classes from "./TopMenuBar.module.css";

function TopMenuBar() {
  return (
    <div className={classes.menu}>
      <h3>Calendar/Workspace</h3>
      <h3>Chatting Open/Close</h3>
      <Members />
      <Alarms />
      <Search />
      <Update />
      <ETCMenu />
    </div>
  );
}

export default TopMenuBar;
