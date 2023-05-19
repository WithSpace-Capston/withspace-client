import styled from "styled-components";
import { Card } from "react-bootstrap";

type ChatType = {
  myChat: boolean;
  name: string;
  message: string;
};

function Chat(props: ChatType) {
  return (
    <ChatWrapper $myChat={props.myChat}>
      <span>{props.name}</span>
      <Card>
        <Card.Body>{props.message}</Card.Body>
      </Card>
    </ChatWrapper>
  );
}

export default Chat;

const ChatWrapper = styled.div<{ $myChat: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  padding-left: ${(props) => props.$myChat && "10%"};
  padding-right: ${(props) => !props.$myChat && "10%"};

  span {
    text-align: ${(props) => (props.$myChat ? "right" : "left")};
    padding-left: ${(props) => !props.$myChat && "10px"};
    padding-right: ${(props) => props.$myChat && "10px"};
  }
`;
