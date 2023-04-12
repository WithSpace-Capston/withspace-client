import LoginForm from "./LoginForm";

import "./Login.css";

function Login() {
  const loginHandler = (
    email: string,
    password: string,
    rememberEmail: boolean
  ) => {
    console.log(
      `email: ${email}, password: ${password}, remember: ${rememberEmail}`
    );
  };

  return (
    <div className="login-form-container">
      <LoginForm onSubmit={loginHandler} />
    </div>
  );
}

export default Login;
