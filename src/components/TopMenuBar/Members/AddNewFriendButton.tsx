import styled from "styled-components";
import { Card } from "react-bootstrap";
import { MdOutlineAddBox } from "react-icons/md";

function AddNewFriendButton() {
  const addNewFriendHandler = () => {
    console.log("Add new friend handler clicked!");
  };

  return (
    <AddFriendButton body onClick={addNewFriendHandler}>
      <MdOutlineAddBox /> 친구 추가
    </AddFriendButton>
  );
}

export default AddNewFriendButton;

const AddFriendButton = styled(Card)`
  text-align: center;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f5;
    transition: 0.5s;
  }
`;
