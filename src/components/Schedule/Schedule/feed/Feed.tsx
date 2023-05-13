import FeedItemList from "./FeedItemList";
import { categoryState } from "../stores/category";
import MenuBottomSheet from "./MenuBottomSheet";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import more from "../images/more.png";
import { useState } from "react";

const Feed = () => {
  const categories = useRecoilValue(categoryState);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Wrapper>
      <Title>
        Feed
        <ButtonWrapper>
          <button onClick={toggleDown}>
            <img src={more} />
            {isOpen && (
              <PositionWrapper>
                <DropdownMenu>
                  <MenuItem>카테고리 추가</MenuItem>
                  <MenuItem>간편일정 등록</MenuItem>
                </DropdownMenu>
              </PositionWrapper>
            )}
          </button>
        </ButtonWrapper>
      </Title>
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
const Title = styled.div`
button {
  border: 0;
  background-color: #fff;
}

}
  button > img {
    width: 36px;
    height: 36px;
`;
const Wrapper = styled.div`
  & > div:first-child {
    height: 100px;
    display: flex;
    align-items: center;
    font-weight: 800;
    font-size: 36px;
    justify-content: space-between;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 5px;
  width: 150px;
  background-color: #f9f9f9;
  padding: 8px;
  border: 1px solid #ccc;
`;

const MenuItem = styled.div`
  padding: 4px;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    background-color: #ddd;
  }
`;

const PositionWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
`;
const ButtonWrapper = styled.div`
  position: relative;
`;