import React from "react";
import { useRecoilValue } from "recoil";
import { BsFillTrashFill } from "react-icons/bs";
import styled from "styled-components";
import axios from "axios";

import CategoryButton from "./CategoryButton";
import TodoItem from "./TodoItem";
import selectedDateState from "../stores/selectedDate";
import selectedProfileState from "../stores/selectedProfile";
import InputForm from "./InputForm";
import CategoryControlMenu from "./CategoryControlMenu";
import { ICategory } from "../interfaces/ICategory";
import { editingState } from "../stores/editing";
import { todosByCategory } from "../stores/todos";

import { ReactComponent as ThreeDot } from "../images/three-dots.svg";
import useBottomSheet from "../hooks/useBottomSheet";
import { categoryState } from "../stores/category";

const PROXY =
  window.location.hostname === "localhost"
    ? ""
    : "https://api.withspace-api.com";

const FeedItemList = ({ category }: { category: ICategory }) => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedProfile = useRecoilValue(selectedProfileState);

  const { onCategory } = useBottomSheet(false);

  const todos = useRecoilValue(
    todosByCategory({
      todoItemKey: [selectedDate, selectedProfile],
      categoryLabel: category.label,
    })
  );
  const editing = useRecoilValue(editingState);

  const deleteCategoryHandler = async () => {
    const token = localStorage.getItem("withspace_token");
    console.log(category);
    const response = await axios.delete(
      `${PROXY}/category/${category.categoryid}`,
      {
        headers: { "JWT-Authorization": `Bearer ${token}` },
      }
    );
    window.location.reload();
  };

  return (
    <>
      <CategoryButtonWrapper>
        <CategoryButton category={category} />
        {/* <CategoryControlMenu selectedCategory={category} /> */}
        {/* <ThreeDot onClick={() => onCategory(category)} /> */}
        <DeleteButton fontSize={25} onClick={deleteCategoryHandler} />
      </CategoryButtonWrapper>

      {todos.map((todo) =>
        editing === todo.id ? (
          <InputForm
            category={category}
            initialValue={todo.label}
            id={todo.id}
          />
        ) : (
          <TodoItem item={todo} key={todo.id} />
        )
      )}
      {editing === category.label && <InputForm category={category} />}
    </>
  );
};

export default FeedItemList;

const CategoryButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled(BsFillTrashFill)`
  margin: auto 0;
  opacity: 50%;
  :hover {
    cursor: pointer;
  }
`;
