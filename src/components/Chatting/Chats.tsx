import Chat from "./Chat";

import "./Chats.css";

function Chats() {
  return (
    <div className="chatting__chats">
      <Chat myChat={false} />
      <Chat myChat={true} />
      <Chat myChat={false} />
      <Chat myChat={true} />
      <Chat myChat={false} />
      <Chat myChat={true} />
    </div>
  );
}

export default Chats;
