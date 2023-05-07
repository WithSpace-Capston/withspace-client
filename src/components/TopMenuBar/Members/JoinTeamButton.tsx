import styled from "styled-components";
import { Card } from "react-bootstrap";

function JoinTeamButton() {
  return <Button body>팀 가입</Button>;
}

export default JoinTeamButton;

const Button = styled(Card)`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f5;
    transition: 0.5s;
  }
`;
