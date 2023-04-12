import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";

type LoginFormProps = {
  onSubmit: (email: string, password: string, rememberEmail: boolean) => void;
};

function LoginForm(props: LoginFormProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberEmail, setRememberEmail] = useState(false);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(email, password, rememberEmail);
  };

  return (
    <div>
      <Form className="login-form" onSubmit={submitHandler}>
        <h1>Login</h1>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Check
          className="login-form-remember"
          type="checkbox"
          label="Remember Email"
          checked={rememberEmail}
          onChange={(e) => setRememberEmail(e.target.checked)}
        />
        <Button
          className="login-form-button"
          variant="outline-primary"
          type="submit"
          onClick={() => navigate("/create-account")}
        >
          Create Account
        </Button>
        <Button className="login-form-button" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
