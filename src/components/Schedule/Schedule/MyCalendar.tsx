import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { GlobalStyle } from "./styles/global-style";
import axios from "axios";

import Calender from "./calender/Calender";
import Feed from "./feed/Feed";
import { userInfoState } from "../../../contexts/UserInfoState";

const MyCalendar = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Header></Header>
      <Main>
        <LeftSide>
          <Calender />
        </LeftSide>
        <Feed />
      </Main>
    </Wrapper>
  );
};

export default MyCalendar;

const Wrapper = styled.div`
  width: 100%;
  min-width: 800px;
  height: 100vh;
`;

const Header = styled.div`
  height: 64px;
  width: 100%;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 346px auto;
  grid-gap: 60px;
  width: 100%;
  padding: 0 48px;
`;

const LeftSide = styled.div`
  margin-top: 24px;
`;
