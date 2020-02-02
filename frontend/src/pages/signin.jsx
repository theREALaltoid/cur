import React from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

import { Link } from "react-router-dom";
import "../css/form.min.css";
function clickTest() {
  alert("testt");
}
class Contacts extends React.PureComponent {
  render() {
    return (
      <Container>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="email"
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password"
            />
          </FormGroup>
          <div className="signInButtonGroup">
            <FormGroup>
              <Button onClick="clickTest">Sign In</Button>{" "}
              <Button>Sign Up</Button>
            </FormGroup>
          </div>
        </Form>
        <p>
          Or <Link to="/signup">Register</Link>
        </p>
      </Container>
    );
  }
}

export default Contacts;
