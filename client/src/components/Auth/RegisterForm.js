import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/authContext";
import AlertMessage from "../AlertMessage/AlertMessage";

const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [checkConfirmPass, setCheckConfirmPass] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  const onChangeForm = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "confirmPassword") {
      if (value !== password) {
        setCheckConfirmPass(true);
      } else {
        setCheckConfirmPass(false);
      }
    }
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        setAlert({
          variant: "primary",
          message: `${registerData.message}. Please login to start learning`,
        });
        setIsRegisterSuccess(true);
      } else {
        setAlert({
          variant: "danger",
          message: `${registerData.message}`,
        });
        setIsRegisterSuccess(false);
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={onSubmitForm}>
        <AlertMessage info={alert} />
        {!isRegisterSuccess && (
          <>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="username"
                name="username"
                required
                value={username}
                onChange={onChangeForm}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                required
                value={password}
                onChange={onChangeForm}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="re-enter password"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={onChangeForm}
                isInvalid={checkConfirmPass}
              ></Form.Control>
              {checkConfirmPass && (
                <Form.Control.Feedback type="invalid">
                  Re-enter Password Incorrect
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button variant="success" type="submit">
              Register
            </Button>
          </>
        )}
      </Form>
      <p>
        Already have account ?
        <Link to="/login">
          <Button variant="info" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
