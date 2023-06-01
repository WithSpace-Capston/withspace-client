import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Popover, Card } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import styled from "styled-components";
import { Client } from "@stomp/stompjs";
import axios from "axios";

import { MenuButton } from "./TopMenuBar";

const PROXY =
  window.location.hostname === "localhost"
    ? ""
    : "https://api.withspace-api.com";

type ETCMenuProps = {
  client: React.MutableRefObject<Client | undefined>;
};

function ETCMenu(props: ETCMenuProps) {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const token = localStorage.getItem("withspace_token");
    await axios.post(
      `${PROXY}/logout`,
      {},
      {
        headers: {
          "JWT-Authorization": `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("withspace_token");
    localStorage.removeItem("userInfoState");
    props.client.current?.deactivate();
    navigate("/login");
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Body style={{ padding: "0" }}>
            <OptionCard body onClick={logoutHandler}>
              로그아웃
            </OptionCard>
          </Popover.Body>
        </Popover>
      }
    >
      <MenuButton>
        <BsThreeDots />
      </MenuButton>
    </OverlayTrigger>
  );
}

export default ETCMenu;

const OptionCard = styled(Card)`
  cursor: pointer;

  &:hover {
    background-color: #f7f7f5;
    transition: 0.5s;
  }
`;
