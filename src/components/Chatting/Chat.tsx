import { Card, Image } from "react-bootstrap";

import "./Chat.css";

type ChatType = {
  myChat: boolean;
};

function Chat(props: ChatType) {
  return (
    <div className={`chat ${props.myChat ? "my-chat" : "other-chat"}`}>
      <div className="chat-profile-image">
        <Image
          style={{ marginBottom: "5px" }}
          width={"35px"}
          src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
          rounded={true}
        />
      </div>
      <Card>
        <Card.Body>short test</Card.Body>
      </Card>
    </div>
  );
}

export default Chat;
