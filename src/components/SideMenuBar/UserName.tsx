import styled from "styled-components";

type UserNameType = {
  name: string | undefined;
};

function UserName(props: UserNameType) {
  console.log(`UserName -> ${props.name}`);
  return <UsernameH5 className="username">{props.name}</UsernameH5>;
}

export default UserName;

const UsernameH5 = styled.div`
  text-align: center;
  font-size: 30px;
  margin: 20px 0;
`;
