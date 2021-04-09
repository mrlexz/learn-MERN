import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/authContext";
import AlertMessage from "../AlertMessage/AlertMessage";

const LoginForm = () => {
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);
  // context
  const { loginUser } = useContext(AuthContext);

  const { username, password } = userForm;

  const onChangeLoginForm = (event) =>
    setUserForm({
      ...userForm,
      [event.target.name]: event.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = await loginUser(userForm);

      if (!loginData.success) {
        setAlert({
          variant: "danger",
          message: `${loginData.message}!!!`,
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={onSubmit}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          ></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have account ?
        <Link to="/register">
          <Button variant="info" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
