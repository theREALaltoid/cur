import React from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import "../css/signup.min.css";
import { Link } from "react-router-dom";
const axios = require("axios");
class Signup extends React.PureComponent {
  handleClick(event) {
    var apiBaseUrl = "http://localhost:3000/users/signup";
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
    axios
      .post(apiBaseUrl, payload, {
        validateStatus: function(status) {
          if (status == 500) {
            alert();
          }
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      })
      .then(function(response) {
        //console.log(response);
        console.log(response);
        if (response.status == 200) {
          if (response.data.user == "exists") {
            alert("username exists");
          }
          console.log("registration successfull");
        }
        return response;
      })
      .catch(function(error) {
        console.log(error.toJSON());
        console.log(response);
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
      <Container>
        <Form>
          <FormGroup>
            <Label for="username">username</Label>
            <Input name="username" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="Password">Confirm Password</Label>
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
            Or <Link to="/login">Login</Link>
          </p>
        </Form>
      </Container>
    );
  }
}

export default Signup;
