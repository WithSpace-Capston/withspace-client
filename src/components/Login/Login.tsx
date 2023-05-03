import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { userInfoState } from "../../contexts/UserInfoState";
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
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("withspace_token")) {
      processingLogin();
    }
  });

  const processingLogin = async () => {
    const token = localStorage.getItem("withspace_token");

    const userInfoResponse = await axios.get(`/member`, {
      headers: { Authorization: token },
    });
    const fetchedUserInfo = userInfoResponse.data.data;
    const userId = fetchedUserInfo.id;

    setUserInfo({ ...userInfo, id: userId, logined: true });

    const pageInfoResponse = await axios.get(`/member/${userInfo.id}/space`, {
      headers: { Authorization: token },
    });
    const pageInfo = pageInfoResponse.data.data;
    const pageId = pageInfo.pageList[0].pageId;

    setUserInfo({ ...userInfo, defaultPageId: pageId });
    navigate(`/space/${userInfo.defaultPageId}`);
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
