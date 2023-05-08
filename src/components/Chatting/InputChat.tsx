import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import styled from "styled-components";

function InputChat() {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
  };

  return (
    <ChatInputForm>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleMessageChange}
          />
          <Button variant="primary" type="submit">
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
