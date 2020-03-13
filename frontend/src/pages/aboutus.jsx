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
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { Link } from "react-router-dom";
import Chart from "chart.js";

import "../css/aboutUs.min.css";
import aboutusTwo from "../img/aboutustwo.jpg";
import aboutUs from "../img/aboutUs.jpg";
import Example from "../assets/model";
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
      labelsAndAsValObjs: {},
      purchaseDate: "",
      asset: "silver",
      spotPrice: 0,
      desiredDate: -1,
      sellPrice: 0,
      purchasePrice: 0,
      ouncesIn: 0,
      assetValue: 0,
      show: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.name === "isGoing" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  componentDidMount() {
    getOuncesCall().then(data => {
      let ouncesIn = 0;
      for (var i = 0; i < data.length; i++) {
        if (data[i].ouncesIn) {
          ouncesIn = ouncesIn + data[i].ouncesIn;
        }
      }
      this.setState({
        labelsAndAsValObjs: data,
        ouncesIn: ouncesIn
      });
    });
    getSpotPrice(apiUrl, apiKey).then(data => {
      this.setState({
        spotPrice: data
      });
    });
    let spotPrice = this.state.spotPrice;
    dataCall(-1, spotPrice);
  }

  handleClick(event, desiredLength, spotPrice) {
    dataCall(desiredLength, spotPrice);
    getOuncesCall().then(data => {
      let ouncesIn = 0;
      for (var i = 0; i < data.length; i++) {
        if (data[i].ouncesIn) {
          ouncesIn = ouncesIn + data[i].ouncesIn;
        }
      }
      this.setState({
        labelsAndAsValObjs: data,
        ouncesIn: ouncesIn
      });
    });
    this.handleInputChange(event);
  }
  showModal = event => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    const assetData = this.state.labelsAndAsValObjs;
    console.log(assetData);
    let assetTags = <div></div>;
    if (assetData.length > 0) {
      assetTags = assetData.map(asset => (
        <div>
          <Card>
            <CardBody>
              <CardTitle>Purchase Date:{asset.date}</CardTitle>
              <CardSubtitle>Ounces In: {asset.ouncesIn}</CardSubtitle>
              <CardText>{asset.description}</CardText>
            </CardBody>
          </Card>
        </div>
      ));
    }

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
        name="desiredDate"
        onClick={event =>
          this.handleClick(event, desired.number, this.state.spotPrice)
        }
      >
        {desired.string}
      </Button>
    ));

    return (
      <Container>
        <h1> How is the Portfolio Looking</h1>
        <div className="VictoryChart">
          <Row>
            <Col md="8">
              <canvas id="myChart" />
              <Row className="justify-content-center">{selectorButtons}</Row>

              <h1>Your Portfolio</h1>
              <h1>You have {this.state.ouncesIn} Troy Ounces in the vault</h1>
              <h1>It is worth ${assetValue.toFixed(2)}</h1>
            </Col>
            <Col className="centerCol" md="3">
              {assetTags}
            </Col>
            <Col md="1">
              <Example />
            </Col>
          </Row>

          <Row className="justify-content-center"></Row>
        </div>
      </Container>
    );
  }
}

export default Products;
