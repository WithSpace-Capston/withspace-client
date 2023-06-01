import { OverlayTrigger, Popover, Card } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import styled from "styled-components";

import { MenuButton } from "../../../TopMenuBar/TopMenuBar";

function CategoryMenu() {
  const editCategoryHandler = () => {};

  const deleteCategoryHandler = () => {};

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Body style={{ padding: "0" }}>
            <OptionCard body onClick={editCategoryHandler}>
              수정
            </OptionCard>
            <OptionCard body onClick={deleteCategoryHandler}>
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

export default CategoryMenu;

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
