import styled from "styled-components";

type UserNameType = {
  name: string | null;
};

function UserName(props: UserNameType) {
  return <UsernameH5 className="username">{props.name}</UsernameH5>;
}

export default UserName;

const UsernameH5 = styled.div`
  text-align: center;
  font-size: 30px;
  margin: 20px 0;
`;
