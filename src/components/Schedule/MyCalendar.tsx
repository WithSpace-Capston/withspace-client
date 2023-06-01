import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Calender from "./Schedule/calender/Calender";
import Feed from "./Schedule/feed/Feed";

const PROXY =
  window.location.hostname === "localhost"
    ? ""
    : "https://api.withspace-api.com";

const MyCalendar = () => {
  const params = useParams();

  useEffect(() => {
    const fetchSchedules = async () => {
      const token = localStorage.getItem("withspace_token");
      try {
        const response = await axios.get(
          `${PROXY}/space/${params.scheduleId}`,
          {
            headers: { "JWT-Authorization": `Bearer ${token}` },
          }
        );
        const scheduleData = response.data.schedule;
        console.log(scheduleData);
      } catch (err: any) {
        console.log(err + "으잉");
      }
    };

    fetchSchedules();
  }, [params.scheduleId]);

  return (
    <Wrapper>
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
