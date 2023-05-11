import styled from "styled-components";

import Chat from "./Chat";

function Chats() {
  return (
    <ChatsWrapper>
      <Chat myChat={false} name="이동준" message="채팅입니다." />
      <Chat myChat={false} name="서한슬" message="채팅입니다." />
      <Chat myChat={false} name="한지수" message="채팅입니다." />
      <Chat myChat={false} name="이동준" message="채팅입니다." />
      <Chat myChat={false} name="서한슬" message="채팅입니다." />
      <Chat myChat={true} name="이지석" message="채팅입니다." />
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
