import styled from "styled-components";

import Chat from "./Chat";

function Chats() {
  return (
    <ChatsWrapper>
      <Chat myChat={false} />
      <Chat myChat={true} />
      <Chat myChat={false} />
      <Chat myChat={true} />
      <Chat myChat={false} />
      <Chat myChat={true} />
    </ChatsWrapper>
  );
}

export default Chats;

const ChatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding: 16px;
`;
