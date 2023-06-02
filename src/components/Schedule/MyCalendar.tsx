import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Calender from "./Schedule/calender/Calender";
import Feed from "./Schedule/feed/Feed";
import { useRecoilState } from "recoil";
import { categoryState } from "./Schedule/stores/category";
import { ICategory } from "./Schedule/interfaces/ICategory";
import { todoState } from "./Schedule/stores/todos";
import { todosByCategory } from "./Schedule/stores/todos";

const PROXY =
  window.location.hostname === "localhost"
    ? ""
    : "https://api.withspace-api.com";

type CategoryType = {
  categoryId: number;
  title: string;
  color: string;
};

const MyCalendar = () => {
  const params = useParams();
  const [categories, setCategories] = useRecoilState(categoryState);

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
        const categories: ICategory[] = scheduleData.categories.map(
          (category: CategoryType) => {
            return {
              categoryid: category.categoryId,
              label: category.title,
              color: category.color,
            };
          }
        );
        setCategories(categories);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchSchedules();
  }, [params.scheduleId, setCategories]);

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
