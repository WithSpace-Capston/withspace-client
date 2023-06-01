import { FormEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Offcanvas } from "react-bootstrap";
import styled from "styled-components";
import { Client } from "@stomp/stompjs";
import axios from "axios";

import Chats from "./Chats";
import InputChat from "./InputChat";
import { uiState } from "../../contexts/UIState";
import { userInfoState } from "../../contexts/UserInfoState";

export type MessageType = {
  senderId: number;
  senderName: string;
  content: string;
};

type ChattingProps = {
  client: React.MutableRefObject<Client | undefined>;
};

function Chatting(props: ChattingProps) {
  const [uiInfo, setUiInfo] = useRecoilState(uiState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [subId, setSubId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  // const connect = () => {
  //   const token = localStorage.getItem("withspace_token");
  //   client.current = new Client({
  //     brokerURL: "wss://api.withspace-api.com/ws",
  //     connectHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     debug: () => {},
  //     onConnect: () => {
  //       subscribe();
  //     },
  //   });
  //   client.current.activate();
  // };

  const subscribe = () => {
    props.client.current?.subscribe(
      `/sub/${userInfo.activeChattingRoomId}`,
      (data) => {
        console.log(data);
        const message: MessageType = {
          senderId: JSON.parse(data.body).senderId,
          senderName: JSON.parse(data.body).senderName,
          content: JSON.parse(data.body).message,
        };
        setMessages((messages) => [...messages, message]);
      }
    );
  };

  // const disconnect = () => {
  //   client.current?.deactivate();
  // };

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("withspace_token");
      const fetchMessagesRes = await axios.get(
        `/chat/room/${userInfo.activeChattingRoomId}`,
        {
          headers: { "JWT-Authorization": `Bearer ${token}` },
        }
      );
      const messageList: MessageType[] = fetchMessagesRes.data.data.messageList;
      setMessages(messageList);
    };

    fetchMessages();
    // connect();
    subscribe();

    // return () => disconnect();
  }, []);

  const hideChatting = () => {
    // client.current?.deactivate();
    setUserInfo({ ...userInfo, activeChattingRoomId: null });
    setUiInfo({ isChatting: false });
  };

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    props.client.current?.publish({
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
