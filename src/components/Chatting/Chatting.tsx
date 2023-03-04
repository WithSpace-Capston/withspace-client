import { ReactSlidingPane } from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import { useUIState, useUIDispatch } from "../../contexts/UIContext";

function Chatting() {
  const uiState = useUIState();
  const uiDispatch = useUIDispatch();

  const closeChattingHandler = () => {
    uiDispatch({ type: "TOGGLE_CHATTING" });
  };

  return (
    <div>
      <ReactSlidingPane
        isOpen={uiState.isOpenChatting}
        width="25%"
        onRequestClose={closeChattingHandler}
      >
        <h1>Sliding Pane Test</h1>
        <p>채팅 UI 구현하기</p>
      </ReactSlidingPane>
    </div>
  );
}

export default Chatting;
