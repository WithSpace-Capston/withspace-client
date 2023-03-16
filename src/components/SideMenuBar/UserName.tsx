type UserNameType = {
  name: string | undefined;
};

function UserName(props: UserNameType) {
  return <h2>{props.name}</h2>;
}

export default UserName;
