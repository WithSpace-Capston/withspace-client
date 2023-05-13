import { Card, Badge, OverlayTrigger, Popover } from "react-bootstrap";
import styled from "styled-components";

type MemberType = {
  memberName: string;
  status: boolean;
  isFriend: boolean;
};

function Member(props: MemberType) {
  return (
    <div>
      {props.isFriend && (
        <OverlayTrigger
          placement="right"
          trigger="click"
          overlay={
            <OptionPopover>
              <MemberCard body>채팅</MemberCard>
              <MemberCard body>삭제</MemberCard>
            </OptionPopover>
          }
        >
          <MemberCard body>
            <Badge pill bg={props.status ? "success" : "danger"}>
              &nbsp;
            </Badge>
            &nbsp;
            {props.memberName}
          </MemberCard>
        </OverlayTrigger>
      )}
      {!props.isFriend && (
        <MemberCard body>
          <Badge pill bg={props.status ? "success" : "danger"}>
            &nbsp;
          </Badge>
          &nbsp;
          {props.memberName}
        </MemberCard>
      )}
    </div>
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

const OptionPopover = styled(Popover)`
  display: flex;
  flex-direction: row;
`;
