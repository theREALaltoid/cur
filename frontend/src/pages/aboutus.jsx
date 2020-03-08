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
import Modal from "../assets/model";
const axios = require("axios");
import ReactDOM from "react-dom";
import dataCall from "../assets/dataCall";
import getOuncesCall from "../assets/ouncesCall";

import apiKey from "../assets/apikey.jsx";

let apiUrl =
  "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=XAG&to_currency=USD&apikey=";
import getSpotPrice from "../assets/priceCall";
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: {},
      assetCosts: {},
      spotPrice: 0,
      ouncesIn: 0,
      assetValue: 0,
      show: false
    };
  }

  componentDidMount() {
    getOuncesCall().then(data => {
      this.setState({
        ouncesIn: data
      });
    });
    getSpotPrice(apiUrl, apiKey).then(data => {
      this.setState({
        spotPrice: data
      });
    });
    let spotPrice = this.state.spotPrice;
    dataCall(0, spotPrice);
  }

  handleClick(event, desiredLength, spotPrice) {
    dataCall(desiredLength, spotPrice);
    getOuncesCall().then(data => {
      this.setState({
        ouncesIn: data
      });
    });
  }
  showModal = event => {
    this.setState({
      show: !this.state.show
    });
  };
  createEntry(event) {
    axios
      .post("/http://localhost:3000/asset", {
        asset: this.state.asset,
        purchaseDate: this.state.purchaseDate,
        sellDate: this.state.purchaseDate,
        purchasePrice: this.state.purchaseDate,
        sellPrice: this.state.sellPrice,
        ouncesIn: this.state.ouncesIn,
        assetValue: this.state.assetValue
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    let assetValue = this.state.ouncesIn * this.state.spotPrice;
    const desiredNumberString = [
      { number: 7, string: "7D" },
      { number: 31, string: "1M" },
      { number: 93, string: "3M" },
      { number: 186, string: "6M" },
      { number: 365, string: "1Y" },
      { number: -1, string: "ALL" }
    ];
    const selectorButtons = desiredNumberString.map(desired => (
      <Button
        onClick={event =>
          this.handleClick(event, desired.number, this.state.spotPrice)
        }
      >
        {desired.string}
      </Button>
    ));
    return (
      <Container>
        <Modal value="Create Entry" />
        <Button
          class="toggle-button"
          id="centered-toggle-button"
          onClick={event => {
            this.showModal(event);
          }}
        >
          Toggle
        </Button>
        <h1> How is the Portfolio Looking</h1>
        <div className="VictoryChart">
          <canvas id="myChart" />
          <Row className="justify-content-center">{selectorButtons}</Row>

          <h1>Your Portfolio</h1>
          <h1>You have {this.state.ouncesIn} Troy Ounces in the vault</h1>
          <h1>It is worth ${assetValue.toFixed(2)}</h1>

          <Row className="justify-content-center"></Row>
        </div>
      </Container>
    );
  }
}

export default Products;
