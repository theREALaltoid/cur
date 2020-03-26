import React from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

import { Link, Redirect } from "react-router-dom";
import "../css/form.min.css";
import Navigation from "../components/navbar";
import Cookies from "universal-cookie";
import { apiBaseUrl } from "../assets/urlAssets";

const cookies = new Cookies();
const axios = require("axios");

class Contacts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      statusCode: 401
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    return <Redirect to="/dashboard" />;
  }
  handleChange(evt) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleClick(postToLogin, event) {
    //To be done:check for empty values before hitting submit
    let payload = {
      username: this.state.username,
      password: this.state.password
    };

    //Login Postt Request After Successful Registration
    axios
      .post(apiBaseUrl + "/users/login", payload, {
        validateStatus: function(status, response) {
          if (status === 500 || status === 401) {
          }
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      })
      //If status is 200 store jwt, else if code is server error alert error
      .then(response => {
        if (response.status === 200) {
          this.setState({ statusCode: response.status });
          cookies.set("jwt", response.data.JWT, { maxAge: 36000 });
        } else if (response.status === 500 || response.status === 401) {
          alert(response.data.err.message);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.statusCode === 200) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <Navigation />
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
              <Button
                size="lg"
                block
                onClick={event => this.handleClick(event)}
              >
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
      </div>
    );
  }
}

export default Contacts;
