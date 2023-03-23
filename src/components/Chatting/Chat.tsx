import { Card, Image } from "react-bootstrap";

import "./Chat.css";

function Chat() {
  return (
    <div className="chat">
      <Image
        style={{ marginBottom: "5px" }}
        width={"35px"}
        src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
        rounded={true}
      />
      <Card>
        <Card.Body>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
          similique nihil magni blanditiis ratione ullam voluptate? Dicta
          deserunt inventore ipsum, tempore quas veritatis maiores, nihil illum,
          blanditiis sit consequatur non?
        </Card.Body>
      </Card>
    </div>
  );
}

export default Chat;
