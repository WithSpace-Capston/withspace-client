import styled from "styled-components";
import { Card, Image } from "react-bootstrap";

type ChatType = {
  myChat: boolean;
};

function Chat(props: ChatType) {
  return (
    <ChatWrapper $myChat={props.myChat}>
      <span>이지석</span>
      <Card>
        <Card.Body>short test</Card.Body>
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
