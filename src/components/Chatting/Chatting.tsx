import { Offcanvas } from "react-bootstrap";

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
          <h1>Sliding Pane Test</h1>
          <p>채팅 UI 구현하기</p>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Chatting;
