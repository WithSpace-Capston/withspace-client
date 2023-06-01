import { useNavigate, useParams } from "react-router-dom";
import { OverlayTrigger, Popover, Card } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import styled from "styled-components";

import { MenuButton } from "../../../TopMenuBar/TopMenuBar";

function CategoryMenu() {
  const navigate = useNavigate();
  const params = useParams();

  const addCategoryHandler = () => {
    navigate(`/AddCategory/${params.scheduleId}`);
  };

  const addEasyTodoHandler = () => {
    navigate(`/EasyTodo/${params.scheduleId}`);
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Body style={{ padding: "0" }}>
            <OptionCard body onClick={addCategoryHandler}>
              카테고리 추가
            </OptionCard>
            <OptionCard body onClick={addEasyTodoHandler}>
              간편일정 등록
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