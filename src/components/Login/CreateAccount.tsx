import axios from "axios";

import CreateAccountForm from "./CreateAccountForm";
import "./CreateAccount.css";

function CreateAccount() {
  const submitHandler = async (
    email: string,
    password: string,
    username: string
  ) => {
    const response = await axios.post(
      "http://ec2-3-35-150-39.ap-northeast-2.compute.amazonaws.com/member",
      {
        email: email,
        password: password,
        memberName: username,
      }
    );
    console.log(response);
  };

  return (
    <div className="create-account-form-container">
      <CreateAccountForm onSubmit={submitHandler} />
    </div>
  );
}

export default CreateAccount;
