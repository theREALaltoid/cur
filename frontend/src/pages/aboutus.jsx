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
          <Row className="justify-content-center">
            <Button onClick={event => this.handleClick(event, 1)}>1D</Button>
            <Button onClick={event => this.handleClick(event, 7)}>1W</Button>
            <Button onClick={event => this.handleClick(event, 31)}>1M</Button>
            <Button onClick={event => this.handleClick(event, 93)}>3M</Button>
            <Button onClick={event => this.handleClick(event, 365)}>1Y</Button>
            <Button onClick={event => this.handleClick(event, 0)}>ALL</Button>
          </Row>

          <h1>Recent Activty</h1>
        </div>
      </Container>
    );
  }
}

export default Products;
