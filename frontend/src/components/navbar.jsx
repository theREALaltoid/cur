import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faCoins, faSun } from "@fortawesome/free-solid-svg-icons";
import "../css/navbar.min.css";
import { connect } from "react-redux";
import { changeDarkModeState } from "../redux/actions/index";

const Navigation = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="sm">
      <NavbarToggler className="navbar-dark" onClick={toggle} />
      <NavbarBrand>
        <Link to="/">
          <FontAwesomeIcon icon={faCoins} size="2x" />
        </Link>
      </NavbarBrand>
      <div className="col-md-six mx-auto">
        <Collapse isOpen={isOpen} navbar="navbar" className="navbar-dark">
          <Nav>
            <NavItem>
              <NavLink tag={Link} to="/signin">
                Sign In/Sign Up
              </NavLink>
            </NavItem>

            <NavItem>
              <div onClick={props.changeDarkModeState}>
                <FontAwesomeIcon icon={props.dark ? faMoon : faSun} size="1x" />
              </div>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
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
)(Navigation);
