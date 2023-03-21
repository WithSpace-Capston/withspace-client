import { Card, Badge } from "react-bootstrap";

type MemberType = {
  memberName: String;
  status: Boolean;
};

function Member(props: MemberType) {
  return (
    <Card body>
      <Badge pill bg={props.status ? "success" : "danger"}>
        &nbsp;
      </Badge>
      &nbsp;
      {props.memberName}
    </Card>
  );
}

export default Member;
