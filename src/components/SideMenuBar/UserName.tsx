type UserNameType = {
  name: string | undefined;
};

function UserName(props: UserNameType) {
  return <h5 className="username">{props.name}</h5>;
}

export default UserName;
