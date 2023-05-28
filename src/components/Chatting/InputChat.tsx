import { FormEvent } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import styled from "styled-components";

type InputChatType = {
  sendMessage: (event: FormEvent) => void;
  message: string;
  changeMessage: (message: string) => void;
};

function InputChat(props: InputChatType) {
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.changeMessage(event.target.value);
  };

  return (
    <ChatInputForm>
      <Form onSubmit={props.sendMessage}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Type a message..."
            value={props.message}
            onChange={handleMessageChange}
          />
          <Button variant="primary" type="submit" onClick={props.sendMessage}>
            Send
          </Button>
        </InputGroup>
      </Form>
    </ChatInputForm>
  );
}

export default InputChat;

const ChatInputForm = styled.div`
  margin: 16px;
`;
