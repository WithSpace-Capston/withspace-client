import React from "react";
import { useRecoilValue } from "recoil";
import { BsThreeDots } from "react-icons/bs";
import styled from "styled-components";

import CategoryButton from "./CategoryButton";
import TodoItem from "./TodoItem";
import selectedDateState from "../stores/selectedDate";
import selectedProfileState from "../stores/selectedProfile";
import InputForm from "./InputForm";
import CategoryControlMenu from "./CategoryControlMenu";
import { ICategory } from "../interfaces/ICategory";
import { editingState } from "../stores/editing";
import { todosByCategory } from "../stores/todos";

const FeedItemList = ({ category }: { category: ICategory }) => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedProfile = useRecoilValue(selectedProfileState);
  const todos = useRecoilValue(
    todosByCategory({
      todoItemKey: [selectedDate, selectedProfile],
      categoryLabel: category.label,
    })
  );
  const editing = useRecoilValue(editingState);

  return (
    <>
      <CategoryButtonWrapper>
        <CategoryButton category={category} />
        <CategoryControlMenu />
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
