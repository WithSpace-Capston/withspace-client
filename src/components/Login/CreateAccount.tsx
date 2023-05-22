import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CreateAccountForm from "./CreateAccountForm";
import "./CreateAccount.css";

const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

function CreateAccount() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const response = await axios.post(`${PROXY}/member`, {
        email: email,
        password: password,
        memberName: username,
      });

      const status = response.status;
      const message = response.data.message;

      if (status === 201 && message === "회원가입 완료") {
        navigate("/login");
      }
    } catch (err: any) {
      const status = err.response.data.status;
      const message = err.response.data.message;

      if (status === 409 && message === "이미 존재하는 email 입니다.") {
        setErrorMessage(message);
        return;
      }
    }
  };

  return (
    <div className="create-account-form-container">
      <CreateAccountForm onSubmit={submitHandler} errorMessage={errorMessage} />
    </div>
  );
}

export default CreateAccount;
