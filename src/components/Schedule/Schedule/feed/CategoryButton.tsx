import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import add from "../images/feedAddButton.png";
import box from "../images/openBox.png";
import { editingState } from "../stores/editing";
import {ICategory} from "../interfaces/ICategory"

interface CategoryButtonProps {
  category: ICategory;
}

const CategoryButton = ({ category }: CategoryButtonProps) => {
  const setEditing = useSetRecoilState(editingState);
  return (
    <Wrapper>
      <div>
        <Inner color={category.color}>
          <img src={box} />
          <div>{category.label}</div>
          <button onClick={() => setEditing(category.label)}>
            <img src={add} />
          </button>
        </Inner>
      </div>
    </Wrapper>
  );
};

export default CategoryButton;

const Wrapper = styled.div`
  & > div {
    display: inline-block;
    height: 36px;
    border-radius: 4px;
    margin: 6px 0;
  }
`;

const Inner = styled.div<{ color: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 8px;
  & > img {
    width: 22px;
    height: 22px;
  }
  button {
    width: 18px;
    height: 18px;
    & > img {
      width: 100%;
      height: auto;
    }
  }
  div {
    font-weight: 800;
    font-size: 15px;
    padding: 0 8px;
    color: ${({ color }) => color};
  }
`;
