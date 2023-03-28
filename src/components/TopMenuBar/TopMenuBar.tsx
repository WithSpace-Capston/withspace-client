import Members from "./Members/Members";
import Alarms from "./Alarms";
import Search from "./Search";
import Update from "./Update";
import ETCMenu from "./ETCMenu";
import "./TopMenuBar.css";

function TopMenuBar() {
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
