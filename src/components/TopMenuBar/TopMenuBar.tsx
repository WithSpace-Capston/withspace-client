import styled from "styled-components";

import Members from "./Members/Members";
import Alarms from "./Alarms";
import Search from "./Search";
import Update from "./Update";
import ETCMenu from "./ETCMenu";

function TopMenuBar() {
  return (
    <Menu>
      <Members />
      <Alarms />
      <Search />
      <Update />
      <ETCMenu />
    </Menu>
  );
}

export default TopMenuBar;

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;
  height: 35px;

  h3 {
    font-weight: normal;
    font-size: 20px;
    margin: 0 15px;
  }
`;
