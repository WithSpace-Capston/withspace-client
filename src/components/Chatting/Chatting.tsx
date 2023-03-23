import { Offcanvas } from "react-bootstrap";

import Chats from "./Chats";
import InputChat from "./InputChat";
import { useUIState, useUIDispatch } from "../../contexts/UIContext";
import "./Chatting.css";

function Chatting() {
  const uiState = useUIState();
  const uiDispatch = useUIDispatch();

  const closeChattingHandler = () => {
    uiDispatch({ type: "TOGGLE_CHATTING" });
  };

  return (
    <Offcanvas
      show={uiState.isOpenChatting}
      onHide={closeChattingHandler}
      placement="end"
    >
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body className="chatting">
        <Chats />
        <InputChat />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Chatting;
