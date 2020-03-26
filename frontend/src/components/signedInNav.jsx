import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText,
  NavbarBrand
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faCoins, faSun } from "@fortawesome/free-solid-svg-icons";
import "../css/navbar.min.css";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { changeDarkModeState } from "../redux/actions/index";
const cookies = new Cookies();
const SignedNavigation = props => {
  const [isOpen, setIsOpen] = useState(true);
  const [isloggedOut, setisloggedOut] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const logout = props => {
    localStorage.clear();
    cookies.remove("jwt");
    setisloggedOut(true);
  };
  if (isloggedOut === true) {
    return <Redirect to="/" push={true} />;
  }
  return (
    <Navbar>
      <NavbarBrand>
        <Link to="/">
          <FontAwesomeIcon icon={faCoins} size="2x" />
        </Link>
      </NavbarBrand>
      <NavbarToggler className="navbar-dark" onClick={toggle} />

      <Collapse isOpen={!isOpen} navbar="navbar" className="navbar-dark">
        <Nav>
          <NavItem>
            <Button onClick={logout}>Logout</Button>
          </NavItem>
          <NavbarText>
            <div onClick={props.changeDarkModeState}>
              <FontAwesomeIcon icon={props.dark ? faMoon : faSun} size="2x" />
            </div>
          </NavbarText>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
const MapStateToProps = state => {
  return {
    dark: state.dark
  };
};
const MapDispatchToProps = dispatch => {
  return {
    changeDarkModeState: () => dispatch(changeDarkModeState)
  };
};
export default connect(
  MapStateToProps,
  MapDispatchToProps
)(SignedNavigation);
