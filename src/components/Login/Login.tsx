import axios from "axios";

import LoginForm from "./LoginForm";
import "./Login.css";

function Login() {
  const loginHandler = async (
    email: string,
    password: string,
    rememberEmail: boolean
  ) => {
    const response = await axios.post(
      "http://ec2-3-35-150-39.ap-northeast-2.compute.amazonaws.com/login-process",
      {
        email: email,
        password: password,
        "remember-me": rememberEmail,
      }
    );

    console.log(response);
  };

  return (
    <div className="login-form-container">
      <LoginForm onSubmit={loginHandler} />
    </div>
  );
}

export default Login;
