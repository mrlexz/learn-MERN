import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import LearnitLogo from "../../assets/logo.svg";
import LogoutIcon from "../../assets/logout.svg";
import { AuthContext } from "../../contexts/AuthContext/authContext";

const NavbarMenu = () => {
  const { authState, logoutUser } = useContext(AuthContext);

  const logout = () => logoutUser();
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder text-white">
        <img
          src={LearnitLogo}
          alt="hihi"
          width="32"
          height="32"
          className="mr-2"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome, {authState?.user?.username?.toUpperCase()}
          </Nav.Link>
          <Button
            variant="secondary"
            onClick={logout}
            className="font-weight-bolder text-white"
          >
            <img
              src={LogoutIcon}
              alt="hihi"
              width="32"
              height="32"
              className="mr-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
