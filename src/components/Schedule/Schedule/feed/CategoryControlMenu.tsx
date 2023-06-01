import { OverlayTrigger, Popover, Card } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { MenuButton } from "../../../TopMenuBar/TopMenuBar";
import useBottomSheet from "../hooks/useBottomSheet";
import { ICategory } from "../interfaces/ICategory";
import { editingState } from "../stores/editing";

import edit from "../images/edit.png";
import bin from "../images/bin.png";
import { BottomSheet } from "react-spring-bottom-sheet";

interface CategoryButtonProps {
  selectedCategory: ICategory | null;
}
function CategoryControlMenu({ selectedCategory }: CategoryButtonProps) {
  const { isOpen, onDismiss, selectedItem } = useBottomSheet(false);
  const setEditingItem = useSetRecoilState(editingState);

  const handleEditCategory = () => {
    onDismiss();
    setEditingItem(selectedItem!.id);
  };

  const handleDeleteCategory = () => {
    onDismiss();
  };

  // const editCategoryHandler = () => {
  //   if (selectedCategory) {
  //     setEditingItem(selectedCategory!.categoryid);
  //   }  };

  // const deleteCategoryHandler = () => {};

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Body style={{ padding: "0" }}>
            <OptionCard body onClick={handleEditCategory}>
              수정
            </OptionCard>
            <OptionCard body onClick={handleDeleteCategory}>
              삭제
            </OptionCard>
          </Popover.Body>
        </Popover>
      }
    >
      <MenuButton>
        <CategoryMenuButton fontSize={25} />
      </MenuButton>
    </OverlayTrigger>
  );
}

export default CategoryControlMenu;

const OptionCard = styled(Card)`
  cursor: pointer;

  &:hover {
    background-color: #f7f7f5;
    transition: 0.5s;
  }
`;

const CategoryMenuButton = styled(BsThreeDots)`
  margin: auto 0;

  &:hover {
    cursor: pointer;
  }
`;

const StyledBottomSheet = styled(BottomSheet)`
  & > div:nth-child(2) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const Content = styled.div`
  padding: 24px;
  h2 {
    font-size: 16px;
    font-weight: 600;
  }
  & > div {
    margin-top: 18px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
  }
`;

const Button = styled.div`
  width: 100%;
  height: 68px;
  border-radius: 6px;
  cursor: pointer;
  img {
    height: 24px;
    width: 24px;
    margin-bottom: 4px;
  }
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
