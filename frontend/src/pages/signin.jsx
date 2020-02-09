import React from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
const axios = require("axios");

import { Link } from "react-router-dom";
import "../css/form.min.css";
function clickTest() {
  alert("testt");
}
class Contacts extends React.PureComponent {
  handleClick(postToLogin, event) {
    var apiBaseUrl = "http://localhost:3000/users/";
    console.log(
      "values",

      this.state.username,
      this.state.password
    );
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload = {
      username: this.state.username,
      password: this.state.password
    };

    //Login Postt Request After Successful Registration
    axios
      .post(apiBaseUrl + "login", payload, {
        validateStatus: function(status) {
          if (status == 500) {
            console.log(payload);
            alert();
          }
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      })

      .then(function(response, postToLogin) {
        if (response.status == 200) {
          //  this.props.history.push("/");
          localStorage.setItem("JWT", response.data.JWT);
          console.log(response.data.JWT);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [evt.target.name]: evt.target.value });
  }
  render() {
    return (
      <Container className="signInContainer">
        <Form>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input name="username" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="Password">Password</Label>
            <Input
              name="password"
              type="password"
              onChange={this.handleChange}
            />
          </FormGroup>

          <div className="but">
            <Button size="lg" block onClick={event => this.handleClick(event)}>
              Submit
            </Button>
          </div>
          <br />
          <p>All Fields Required</p>
          <p>
            Or <Link to="/signup">Register</Link>
          </p>
        </Form>
      </Container>
    );
  }
}

export default Contacts;
