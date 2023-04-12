import { useState } from "react";
import { Form, Button } from "react-bootstrap";

import "./CreateAccountForm.css";

type CreateAccountFormProps = {
  onSubmit: (email: string, password: string, username: string) => void;
};

function CreateAccountForm(props: CreateAccountFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [validated, setValidated] = useState(false);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    props.onSubmit(email, password, username);
  };

  return (
    <Form
      className="create-account-form"
      noValidate
      validated={validated}
      onSubmit={submitHandler}
    >
      <h1>Create Account</h1>
      <Form.Group className="form-group" controlId="formGroupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="form-group" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="form-group" controlId="formGroupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Button
        className="create-account-form-button"
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
}

export default CreateAccountForm;
