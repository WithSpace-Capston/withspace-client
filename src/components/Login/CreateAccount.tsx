import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CreateAccountForm from "./CreateAccountForm";
import "./CreateAccount.css";

function CreateAccount() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const test = async () => {
      const response = await axios.get(
        "http://ec2-3-35-150-39.ap-northeast-2.compute.amazonaws.com/member/1"
      );
      console.log(response);
    };
    test();
  }, []);

  const submitHandler = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const response = await axios.post(
        "http://ec2-3-35-150-39.ap-northeast-2.compute.amazonaws.com/member",
        {
          email: email,
          password: password,
          memberName: username,
        }
      );

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
