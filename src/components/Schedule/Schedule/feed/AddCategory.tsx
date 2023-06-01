import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CategoryColorModal from "./CategoryColorModal";
import Button from "react-bootstrap/Button";
import axios from "axios";

import { categoryState } from "../stores/category";
import { ICategory } from "../interfaces/ICategory";

const PROXY =
  window.location.hostname === "localhost"
    ? ""
    : "https://api.withspace-api.com";

interface Category {
  id: number;
  name: string;
  color: string;
}

const AddCategory: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  // const [categories, setCategories] = useState<Category[]>([]);
  const [categories, setCategories] = useRecoilState(categoryState);
  const [selectedColor, setSelectedColor] = useState("");

  const [modalShow, setModalShow] = React.useState(false);

  const saveSelectedColor = (color: any) => {
    // 색 저장하는 로직
    console.log("Selected color:", color);
    setSelectedColor(color);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAddCategory = async () => {
    const token = localStorage.getItem("withspace_token");

    // const newCategory: Category = {
    //   id: Date.now(),
    //   name: name,
    //   color: selectedColor,
    // };
    // setCategories([...categories, newCategory]);
    const newCategory: ICategory = {
      categoryid: Date.now(),
      label: name,
      color: selectedColor,
    };
    setCategories([...categories, newCategory]);
    setName("");

    const response = await axios.post(
      `${PROXY}/schedule/${params.scheduleId}/category`,
      {
        title: name,
        publicSetting: "PUBLIC",
        color: selectedColor,
      },
      { headers: { "JWT-Authorization": `Bearer ${token}` } }
    );
    console.log(response);
    navigate(`/schedule/${params.scheduleId}`);
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

      <CategoryColorModal onSaveColor={saveSelectedColor} />
      {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        
      </Button> */}
      <Button style={{ marginLeft: "10px" }} onClick={handleAddCategory}>
        Add
      </Button>
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
    border: 3px solid ${(props) => props.selectedColor || "#999"};
  }
`;
