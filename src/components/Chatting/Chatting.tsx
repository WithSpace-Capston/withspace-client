import { FormEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Offcanvas } from "react-bootstrap";
import styled from "styled-components";
import { Client } from "@stomp/stompjs";

import Chats from "./Chats";
import InputChat from "./InputChat";
import { uiState } from "../../contexts/UIState";
import { userInfoState } from "../../contexts/UserInfoState";

export type MessageType = {
  senderId: number;
  senderName: string;
  message: string;
};

function Chatting() {
  const [uiInfo, setUiInfo] = useRecoilState(uiState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const client = useRef<Client>();

  const connect = () => {
    client.current = new Client({
      brokerURL: "wss://api.withspace-api.com/ws",
      debug: () => {},
      onConnect: () => {
        subscribe();
      },
    });
    client.current.activate();
  };

  const subscribe = () => {
    client.current?.subscribe(
      `/sub/${userInfo.activeChattingRoomId}`,
      (data) => {
        const message: MessageType = {
          senderId: JSON.parse(data.body).senderId,
          senderName: JSON.parse(data.body).senderName,
          message: JSON.parse(data.body).message,
        };
        setMessages((messages) => [...messages, message]);
      }
    );
  };

  const disconnect = () => {
    client.current?.deactivate();
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const hideChatting = () => {
    client.current?.deactivate();
    setUserInfo({ ...userInfo, activeChattingRoomId: null });
    setUiInfo({ isChatting: false });
  };

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    client.current?.publish({
      destination: `/pub/${userInfo.activeChattingRoomId}/message/${userInfo.id}`,
      body: JSON.stringify({
        senderId: userInfo.id,
        senderName: userInfo.name,
        message: message,
      }),
    });
    setMessage("");
  };

  return (
    <Offcanvas show={uiInfo.isChatting} onHide={hideChatting} placement="end">
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <OffcanvasBody>
        <Chats messages={messages} />
        <InputChat
          sendMessage={sendMessage}
          message={message}
          changeMessage={setMessage}
        />
      </OffcanvasBody>
    </Offcanvas>
  );
}

export default Chatting;

const OffcanvasBody = styled(Offcanvas.Body)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
`;
