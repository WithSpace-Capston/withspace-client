import { KeyboardEvent, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import axios from "axios";

import { ICategory } from "../interfaces/ICategory";
import { editingState } from "../stores/editing";
import useOutsideRef from "../hooks/useOutsideRef";
import useInput from "../hooks/useInput";
import useTodo from "../hooks/useHandleTodo";
import { ReactComponent as ThreeDot } from "../images/three-dots.svg";
import { ReactComponent as TodoCheck } from "../images/todo-check.svg";

import { useScheduleDispatch } from "../../../../contexts/ScheduleContext";

interface InputFormProps {
  category: ICategory;
  id?: string;
  initialValue?: string;
}

const InputForm = ({ category, initialValue = " ", id }: InputFormProps) => {
  const scheduleDispatch = useScheduleDispatch();
  const { value, onChange, resetValue } = useInput(initialValue);
  const { insertTodo, editTodo } = useTodo();
  const [editing, setEditing] = useRecoilState(editingState);
  const createNew = editing === category.label;
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  const onCreate = async () => {
    const token = localStorage.getItem("withspace_token");
    const response = await axios.post(
      `/category/${category.categoryid}/todo`,
      {
        description: value,
        completed: false,
      },
      { headers: { "JWT-Authorization": `Bearer ${token}` } }
    );
    console.log(response);

    insertTodo(value, category);
    setEditing(null);
    resetValue();
  };
  const onEdit = () => {
    editTodo(value, id!);
    setEditing(null);
    resetValue();
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (e.nativeEvent.isComposing === false) {
        if (createNew) {
          onCreate();
          if (value !== "") {
            setEditing(category.label);
          } else {
            setEditing(null);
          }
        } else {
          onEdit();
        }
        e.preventDefault();
      }
    }
  };
  const inputRef = useOutsideRef(createNew ? onCreate : onEdit, value);

  return (
    <>
      <Wrapper>
        <div>
          <TodoCheck fill="#DBDDDF" />
          <input
            placeholder="입력"
            autoFocus
            ref={inputRef}
            value={value}
            onChange={onChange}
            onKeyDown={onEnter}
          />
        </div>
        <ThreeDot />
      </Wrapper>
      <Border color={category.color} />
    </>
  );
};

export default InputForm;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
  & > div {
    display: flex;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    width: 100%;
    input {
      margin-left: 8px;
      width: 100%;
      border: none;
      padding: 0;
      font-size: 16px;
      font-weight: 400;
      line-height: 21px;
      &:focus {
        outline: none !important;
      }
    }
  }
`;

const Border = styled.div`
  height: 2px;
  width: calc(100% - 30px);
  transform: translateX(30px);
  background-color: ${({ color }) => color};
  @keyframes fadeIn {
    from {
      background-color: white;
    }
    to {
      background-color: ${({ color }) => color};
    }
  }
  animation: fadeIn 0.5s ease;
`;
