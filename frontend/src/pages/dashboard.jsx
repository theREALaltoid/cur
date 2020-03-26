import React from "react";
import getSpotPrice from "../assets/priceCall";
import { connect } from "react-redux";
import {
  updateAssetEntry,
  dropdownClickedAction,
  actions
} from "../redux/actions/index";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import "../css/dashboard.min.css";
import dataCall from "../assets/dataCall";
import moment from "moment";
import { apiKey } from "../assets/apikey.jsx";
import { apiBaseUrl, dailySpotPriceURL } from "../assets/urlAssets";

import Entrymodal from "../assets/model";
import SignedNavigation from "../components/signedInNav";
const axios = require("axios");

let sortByDateDesc = function(a, b) {
  if (a.purchaseDate > b.purchaseDate) return -1;
  if (a.purchaseDate < b.purchaseDate) return 1;
  return 0;
};
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: {},
      assetCosts: {},
      userData: [],
      purchaseDate: "",
      asset: "silver",
      spotPrice: 0,
      desiredLength: -1,
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
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  componentDidMount() {
    this.props.fetchData();

    getSpotPrice(dailySpotPriceURL, apiKey).then(data => {
      this.setState({
        spotPrice: data
      });
    });
    dataCall(-1, this.state.spotPrice, apiBaseUrl);
  }

  handleClick(event) {
    this.handleInputChange(event);
    dataCall(event.target.value, this.state.spotPrice, apiBaseUrl);

    this.props.fetchData();
  }

  update(event, assetToUpdateValues) {
    this.props.updateAssetEntry(assetToUpdateValues);
  }
  deleteAsset(event, assetId) {
    axios(
      apiBaseUrl + "/asset",

      {
        method: "delete",
        data: {
          postToDelete: event.target.id
        },
        withCredentials: true
      }
    )
      .then(response => {
        dataCall(this.state.desiredLength, this.state.spotPrice, apiBaseUrl);
        this.props.fetchData();
      })

      .catch(error => console.log(error));
  }
  showModal = event => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    let assetData = this.props.fetch.data;
    assetData.sort(sortByDateDesc);
    let assetTags = <div></div>;
    if (assetData.length > 0) {
      assetTags = assetData.map(asset => (
        //We Divided By 100 because the backend uses mongoose-currency
        // Values are stored multipled by 100 to reduce float errors.
        //More info here:https://github.com/paulcsmith/mongoose-currency
        <div>
          <Card>
            <CardBody assetid={asset._id}>
              <CardTitle>Asset Type: {asset.asset}</CardTitle>
              <CardTitle>
                Purchase Date:{moment(asset.purchaseDate).format("MM-DD-YYYY")}
              </CardTitle>
              <CardTitle>Ounces In: {asset.ouncesIn}</CardTitle>
              <CardTitle>Asset Value: ${asset.assetValue / 100}</CardTitle>

              <CardTitle>
                Purchase Price: ${asset.purchasePrice / 100}
              </CardTitle>

              <Row>
                <Button
                  color="danger"
                  onClick={e => this.deleteAsset(e)}
                  id={asset._id}
                >
                  Delete Entry
                </Button>
                <Button
                  onClick={event =>
                    this.update(event, [
                      { id: asset._id },
                      { assetType: asset.asset },

                      { assetValue: (asset.assetValue / 100).toString() },
                      { assetCost: (asset.purchasePrice / 100).toString() },
                      { totalOunces: asset.ouncesIn },
                      {
                        purchaseDate: moment(asset.purchaseDate).format(
                          "YYYY-MM-DD"
                        )
                      }
                    ])
                  }
                  id={asset._id}
                >
                  Update Entry
                </Button>
              </Row>
            </CardBody>
          </Card>
        </div>
      ));
    }

    let assetValue = this.props.fetch.ouncesIn * this.state.spotPrice;
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
        name="desiredLength"
        value={desired.number}
        onClick={event =>
          this.handleClick(event, desired.number, this.state.spotPrice)
        }
      >
        {desired.string}
      </Button>
    ));

    return (
      <div>
        <SignedNavigation />
        <Container className="dashboardContainer">
          <h1> How is the Portfolio Looking?</h1>

          <div className="VictoryChart">
            <Row>
              <Col md="8">
                <canvas id="myChart" />
                <Row className=" dataButtons justify-content-center">
                  {selectorButtons}
                </Row>

                <h1>Your Portfolio</h1>
                <h1>
                  You have {this.props.fetch.ouncesIn} Troy Ounces in the vault
                </h1>
                <h1>It is worth ${assetValue.toFixed(2)}</h1>
              </Col>
              <Col className="centerCol" md="3">
                {assetTags}
              </Col>
              <Col md="1">
                <Entrymodal {...this.state} />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
const MapStateToProps = state => {
  return {
    modal: state.modal,
    asset: state.asset,
    fetch: state.dataFetch
  };
};
const MapDispatchToProps = (dispatch, data) => {
  return {
    updateAssetEntry: id => dispatch(updateAssetEntry(id)),
    dropdownClickedAction: () => dispatch(dropdownClickedAction),
    fetchData: () => dispatch(actions.fetchData())
  };
};
export default connect(
  MapStateToProps,
  MapDispatchToProps
)(Products);
