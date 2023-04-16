import { useState } from "react";
import axios, { AxiosError } from "axios";

import { useUserInfoDispatch } from "../../contexts/UserInfoContext";
import LoginForm from "./LoginForm";
import "./Login.css";

axios.defaults.withCredentials = true;

export function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function Login() {
  const userInfoDispatch = useUserInfoDispatch();

  const [errorMessage, setErrorMessage] = useState("");

  const processingLogin = async () => {
    const token = localStorage.getItem("withspace_token");
    const response = await axios.get(`/member`, {
      headers: { Authorization: token },
    });
    const userInfo = response.data.data;

    userInfoDispatch({ type: "FETCH_INFO", id: userInfo.id });
  };

  const loginHandler = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    try {
      const response = await axios.post(
        `/login-process`,
        {
          email: email,
          password: password,
          "remember-me": rememberMe,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const token: string = response.data.token;

      localStorage.setItem("withspace_token", token);
      const iat: number = parseJwt(token).iat;
      const exp: number = parseJwt(token).exp;

      setTimeout(() => {
        localStorage.removeItem("withspace_token");
      }, (exp - iat) * 1000);

      processingLogin();
    } catch (error: any) {
      if (error.message === "Network Error") {
        setErrorMessage("존재하지 않는 계정이나 잘못된 비밀번호 입니다.");
        return;
      }
    }
  };

  return (
    <div className="login-form-container">
      <LoginForm onSubmit={loginHandler} errorMessage={errorMessage} />
    </div>
  );
}

export default Login;
