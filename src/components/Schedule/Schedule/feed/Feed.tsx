import FeedItemList from "./FeedItemList";
import { categoryState } from "../stores/category";
import MenuBottomSheet from "./MenuBottomSheet";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

const Feed = () => {
  const categories = useRecoilValue(categoryState);

  return (
    <Wrapper>
      <div>Feed</div>
      <List>
        {categories.map((category) => (
          <FeedItemList category={category} key={category.label} />
        ))}
      </List>
      <MenuBottomSheet />
    </Wrapper>
  );
};

export default Feed;

const Wrapper = styled.div`
  & > div:first-child {
    height: 100px;
    display: flex;
    align-items: center;
    font-weight: 800;
    font-size: 36px;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;
