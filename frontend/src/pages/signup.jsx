import React from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import "../css/signup.min.css";
import { Link, Redirect } from "react-router-dom";
import Navigation from "../components/navbar";
import Cookies from "universal-cookie";
import { apiBaseUrl } from "../assets/urlAssets";
const cookies = new Cookies();
const axios = require("axios");
class Signup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      formValid: false,
      statusCode: 401
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(postToLogin, event) {
    //To be done:check for empty values before hitting submit
    let payload = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post(apiBaseUrl + "/users/signup", payload, {
        validateStatus: function(status) {
          if (status === 500) {
            alert(payload);
          }
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      })

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

  handleChange(evt) {
    // check it out: we get the evt.target.name
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState({ [name]: value });
  }
  handlePassword(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    if (this.state.password === this.state.confirmPassword) {
      this.setState({ formValid: true });
    } else {
      this.setState({ formValid: false });
    }
  }

  render() {
    if (this.state.statusCode === 200) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <Navigation />
        <Container>
          <Form>
            <FormGroup>
              <Label for="username">username</Label>
              <Input
                name="username"
                onChange={evt => this.handleChangeUserName(evt)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                name="password"
                type="password"
                onChange={evt => this.handlePassword(evt)}
              />
              <Label for="Password">Confirm Password</Label>
              <Input
                name="password"
                type="password"
                onChange={evt => this.handlePassword(evt)}
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
              Or <Link to="/signin">Login</Link>
            </p>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Signup;
