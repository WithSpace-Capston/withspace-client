import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import Chat from "./Chat";
import { userInfoState } from "../../contexts/UserInfoState";
import { MessageType } from "./Chatting";

type ChatsType = {
  messages: MessageType[];
};

function Chats(props: ChatsType) {
  const userInfo = useRecoilValue(userInfoState);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current instanceof HTMLDivElement) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [props.messages]);

  return (
    <ChatsWrapper ref={scrollRef}>
      {props.messages.map((message) => {
        return (
          <Chat
            key={Math.random()}
            name={message.senderName}
            message={message.message}
            myChat={message.senderId === userInfo.id}
          />
        );
      })}
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
