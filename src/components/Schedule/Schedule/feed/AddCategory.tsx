import React, { useState } from "react";
import styled from "styled-components";
import CategoryColorBottomSheet from "./CategoryColorBottomSheet";

interface Category {
  id: number;
  name: string;
}

const AddCategory: React.FC = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: Date.now(),
      name: name,
    };
    setCategories([...categories, newCategory]);
    setName("");
  };

  return (
    <Wrapper>
      <Title>Add Category</Title>
      <C_Title>
        <input
          type="text"
          placeholder="새 카테고리 입력"
          value={name}
          onChange={handleNameChange}
        />
      </C_Title>
      
      <CategoryColorBottomSheet />
      <button onClick={handleAddCategory}>Add</button>
    </Wrapper>
  );
};

export default AddCategory;

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const C_Title = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-bottom: 20px;
  ::placeholder {
    color: #999;
  }
`;
