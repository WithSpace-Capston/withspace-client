import React, { useState } from "react";
import styled from "styled-components";
import CategoryColorModal from "./CategoryColorModal";
import Button from 'react-bootstrap/Button';

interface Category {
  id: number;
  name: string;
  color: string;
}

const AddCategory: React.FC = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedColor, setSelectedColor] = useState("");

  const [modalShow, setModalShow] = React.useState(false);

  const saveSelectedColor = (color: any) => {
    // 색 저장하는 로직
    console.log("Selected color:", color);
  };
  
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: Date.now(),
      name: name,
      color: selectedColor
    };
    setCategories([...categories, newCategory]);
    setName("");
  };

  return (
    <Wrapper>
      <Title>Add Category</Title>
      <C_Title selectedColor={selectedColor}>
        <input
          type="text"
          placeholder="새 카테고리 입력"
          value={name}
          onChange={handleNameChange}
        />
      </C_Title>
      
      <CategoryColorModal onSaveColor={saveSelectedColor}/>
      {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        
      </Button> */}
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

const C_Title = styled.div<{ selectedColor: string }>`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-bottom: 20px;
  ::placeholder {
    color: #999;
  }
  input {
    border: 5px solid ${props => props.selectedColor || "#999"};
  }
`;
