import { Offcanvas } from "react-bootstrap";

import Chats from "./Chats";
import InputChat from "./InputChat";
import { useUIState, useUIDispatch } from "../../contexts/UIContext";

function Chatting() {
  const uiState = useUIState();
  const uiDispatch = useUIDispatch();

  const closeChattingHandler = () => {
    uiDispatch({ type: "TOGGLE_CHATTING" });
  };

  return (
    <div>
      <Offcanvas
        show={uiState.isOpenChatting}
        onHide={closeChattingHandler}
        placement="end"
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <Chats />
          <InputChat />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Chatting;
