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
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import "../css/navbar.min.css";

const Navigation = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar expand="sm">
      <NavbarToggler className="navbar-dark" onClick={toggle} />
      <NavbarBrand>
        {" "}
        <Link to="/">
          {" "}
          <FontAwesomeIcon icon={faCarrot} size="2x" />
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
            <NavItem></NavItem>
            <NavItem>
              <NavLink tag={Link} to="/aboutus">
                About
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation;
