import axios from "axios";
import qs from "query-string";

import LoginForm from "./LoginForm";
import "./Login.css";

function Login() {
  const loginHandler = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    const data = {
      email: email,
      password: password,
      "remember-me": rememberMe,
    };

    const options = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    const response = await axios.post(
      "http://ec2-3-35-150-39.ap-northeast-2.compute.amazonaws.com/login-process",
      qs.stringify(data),
      options
    );

    console.log(response.data);
  };

  return (
    <div className="login-form-container">
      <LoginForm onSubmit={loginHandler} />
    </div>
  );
}

export default Login;
