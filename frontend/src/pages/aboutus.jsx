import React from "react";
import moment from "moment";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
import Chart from "chart.js";

import "../css/aboutUs.min.css";
import aboutusTwo from "../img/aboutustwo.jpg";
import aboutUs from "../img/aboutUs.jpg";

const axios = require("axios");
import ReactDOM from "react-dom";
import dataCall from "../assets/dataCall";
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: {},
      assetValues: {}
    };
  }
  handleClick(event, desiredLength) {
    dataCall(desiredLength);
  }

  render() {
    return (
      <Container>
        <h1> How is the Portfolio Looking</h1>
        <div className="VictoryChart">
          <canvas id="myChart" />
          <Button size="lg" block onClick={event => this.handleClick(event, 7)}>
            Submit
          </Button>
          <Button
            size="lg"
            block
            onClick={event => this.handleClick(event, 10)}
          >
            Submit
          </Button>
          <Button size="lg" block onClick={event => this.handleClick(event, 4)}>
            Submit
          </Button>
          <h1>Recent Activty</h1>
        </div>
      </Container>
    );
  }
}

export default Products;
