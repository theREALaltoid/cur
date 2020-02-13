import React from "react";
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

class assetWatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: {},
      assetCosts: {}
    };
  }
  render() {
    return (
      <Row>
        <h2>{this.props.assetName}</h2>
        <br />
        <h3>{this.props.amountOwned}</h3>
        <button>placeholder</button>
        <h2>{this.props.assetValue}</h2>
      </Row>
    );
  }
}
