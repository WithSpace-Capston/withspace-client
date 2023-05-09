import { Card, Badge } from "react-bootstrap";
import styled from "styled-components";

type MemberType = {
  memberName: String;
  status: Boolean;
};

function Member(props: MemberType) {
  return (
    <MemberCard body>
      <Badge pill bg={props.status ? "success" : "danger"}>
        &nbsp;
      </Badge>
      &nbsp;
      {props.memberName}
    </MemberCard>
  );
}

export default Member;

export const MemberCard = styled(Card)`
  cursor: pointer;

  &:hover {
    background-color: #f7f7f5;
    transition: 0.5s;
  }
`;
