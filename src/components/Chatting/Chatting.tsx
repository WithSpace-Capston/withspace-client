import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Offcanvas } from "react-bootstrap";
import styled from "styled-components";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import Chats from "./Chats";
import InputChat from "./InputChat";
import { uiState } from "../../contexts/UIState";
import { userInfoState } from "../../contexts/UserInfoState";

const PROXY =
  window.location.hostname === "localhost"
    ? ""
    : "https://api.withspace-api.com";

function Chatting() {
  const [uiInfo, setUiInfo] = useRecoilState(uiState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const client = useRef<Client>();

  useEffect(() => {
    const connect = () => {
      const token = localStorage.getItem("withspace_token");
      const socket = new SockJS(`${PROXY}/chat`);

      client.current = new Client({
        webSocketFactory: () => socket,
        beforeConnect: () => {
          console.log("beforeConnect");
        },
        connectHeaders: {
          Authorization: `${token}`,
        },
        onConnect: () => {
          console.log(new Date());
          subscribe();
        },
        debug: (str) => {
          console.log(`Debug: ${str}`);
        },
      });
      client.current.activate();
    };

    const disconnect = () => {
      client.current?.deactivate();
    };

    const subscribe = () => {
      client.current?.subscribe(
        `/topic/chat/${userInfo.activeChattingRoomId}`,
        (body) => {
          const message = JSON.parse(body.body);
          console.log(message);
        }
      );
    };

    connect();
    return () => disconnect();
  }, [userInfo.activeChattingRoomId]);

  const hideChatting = () => {
    setUserInfo({ ...userInfo, activeChattingRoomId: null });
    setUiInfo({ isChatting: false });
  };

  return (
    <Offcanvas show={uiInfo.isChatting} onHide={hideChatting} placement="end">
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <OffcanvasBody>
        <Chats />
        <InputChat />
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
