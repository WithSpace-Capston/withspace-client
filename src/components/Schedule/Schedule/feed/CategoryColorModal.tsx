import React, { useState } from "react";
// import Modal from "react-modal";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const colorList = [
  "#ffcac9",
  "#fcb7a3",
  "#f6b0b6",
  "#e57a72",
  "#ff5c55",
  "#CCFFFF",
  "#CCEEFF",
  "#CCCCFF",
  "#CCBBFF",
  "#CCAAFF",
  "#D1FFD8",
  "#C1F0B4",
  "#90D48D",
  "#b6cfb6",
  "#A1AC80",
];

interface CategoryColorModalProps {
  onSaveColor: (color: string) => void;
}

const CategoryColorModal: React.FC<CategoryColorModalProps> = ({
  onSaveColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSaveColor = () => {
    onSaveColor(selectedColor);
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button className="btn" variant="outline-primary" onClick={openModal}>
        카테고리 색상 설정
      </Button>

      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">색상</Modal.Title>
          <CancelButton onClick={closeModal}>취소</CancelButton>
          <SaveButton onClick={handleSaveColor}>저장</SaveButton>
        </Modal.Header>
        <Modal.Body>
          <ColorList>
            {/* <ColorItem
              color="#ffcac9"
              onClick={() => setSelectedColor("#ffcac9")}
              className={selectedColor === "#ffcac9" ? "selected" : ""}
            />
            <ColorItem
              color="#fcb7a3"
              onClick={() => setSelectedColor("#fcb7a3")}
              className={selectedColor === "#fcb7a3" ? "selected" : ""}
            />{" "}
            <ColorItem
              color="#f6b0b6"
              onClick={() => handleColorSelect("#f6b0b6")}
              className={selectedColor === "#f6b0b6" ? "selected" : ""}
            />
            <ColorItem color="#e57a72" />
            <ColorItem color="#ff5c55" />
            <ColorItem color="#CCFFFF" />
            <ColorItem color="#CCEEFF" />
            <ColorItem color="#CCCCFF" />
            <ColorItem color="#CCBBFF" />
            <ColorItem color="#CCAAFF" />
            <ColorItem color="#D1FFD8" />
            <ColorItem color="#C1F0B4" />
            <ColorItem color="#90D48D" />
            <ColorItem color="#b6cfb6" />
            <ColorItem color="#A1AC80" /> */}
            {colorList.map((color) => {
              return (
                <ColorItem
                  key={color}
                  color={color}
                  onClick={() => setSelectedColor(color)}
                  className={selectedColor === color ? "selected" : ""}
                />
              );
            })}
          </ColorList>
        </Modal.Body>
      </Modal>
    </>
  );
};

// const Button = styled.button`
//   padding: 8px;
//   background-color: #f9f9f9;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `;

const ColorModal = styled(Modal)`
  width: 200px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;
const ModalTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 16px;
`;

const ColorList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin-bottom: 16px;

  li {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
const ColorItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }

  &.selected {
    border: 2px solid #000;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 8px;
  margin-right: 8px;
  background-color: #f9f9f9;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  padding: 8px;
  background-color: #f9f9f9;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default CategoryColorModal;
