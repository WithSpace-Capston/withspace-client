import { ReactSlidingPane } from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

type ChattingProps = {
  isChattingOpen: boolean;
  onCloseChatting: () => void;
};

function Chatting(props: ChattingProps) {
  return (
    <div>
      <ReactSlidingPane
        isOpen={props.isChattingOpen}
        width="25%"
        onRequestClose={props.onCloseChatting}
      >
        <h1>Sliding Pane Test</h1>
        <p>채팅 UI 구현하기</p>
      </ReactSlidingPane>
    </div>
  );
}

export default Chatting;
