import { useRecoilValue } from "recoil";
import styled from "styled-components";

import Members from "./Members/Members";
import Alarms from "./Alarms";
// import Search from "./Search";
// import Update from "./Update";
import ETCMenu from "./ETCMenu";
import SaveButton from "./SaveButton";
import { spaceState } from "../Workspace/recoil/SpaceState";

function TopMenuBar() {
  const space = useRecoilValue(spaceState);

  return (
    <Menu>
      <div>{space.edited && <EditedInfo>편집됨</EditedInfo>}</div>
      <MenuButtonsWrapper>
        <SaveButton />
        <Members />
        <Alarms />
        {/* <Search /> */}
        {/* <Update /> */}
        <ETCMenu />
      </MenuButtonsWrapper>
    </Menu>
  );
}

export default TopMenuBar;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  height: 35px;

  h3 {
    font-weight: normal;
    font-size: 20px;
    margin: 0 15px;
  }
`;

const EditedInfo = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
`;

const MenuButtonsWrapper = styled.div`
  display: flex;
`;

export const MenuButton = styled.h3`
  margin: 0;
  padding: 10px;

  &:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
`;
