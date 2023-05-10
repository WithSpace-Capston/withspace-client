import { BottomSheet } from "react-spring-bottom-sheet";
import styled from "styled-components";
import useBottomSheet from "../hooks/useBottomSheet";

const AddCategory = () => {
  const {isOpen, onDismiss, selectedItem} = useBottomSheet(false);

  return (
    <StyledBottomSheet open={isOpen} onDismiss={onDismiss}>
      <Name>
        <div>
          <div></div>
        </div>
      </Name>
    </StyledBottomSheet>
  );
};

export default AddCategory;

const StyledBottomSheet = styled(BottomSheet)`
  & > div:nth-child(2) {
    max-width: 700px;
    margin: 0 auto;
  }
`;

const Name = styled.div`
  width: 100%;
  height: 100%;
`;
