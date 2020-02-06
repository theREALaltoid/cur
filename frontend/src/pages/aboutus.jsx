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

import "../css/aboutUs.min.css";
import aboutusTwo from "../img/aboutustwo.jpg";
import aboutUs from "../img/aboutUs.jpg";
let accessString = localStorage.getItem("JWT");
let apiBaseUrl = "http://localhost:3000/";
const axios = require("axios");
import ReactDOM from "react-dom";
import * as V from "victory";
import {
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryContainer
} from "victory";
const data = [
  {
    quarter: moment()
      .subtract(10, "days")
      .format(),
    earnings: 13000
  },
  {
    quarter: moment()
      .subtract(10, "days")
      .format(),
    earnings: 16500
  },
  {
    quarter: moment()
      .subtract(10, "days")
      .format(),
    earnings: 14250
  },
  {
    quarter: moment()
      .subtract(10, "days")
      .format(),
    earnings: 19000
  }
];

class Products extends React.Component {
  render() {
    return (
      <Container>
        <h1>Recent Activty</h1>
        <div className="VictoryChart">
          <VictoryChart
            className="VictoryChart"
            theme={VictoryTheme.material}
            style={{ parent: { maxWidth: "50%" } }}
          >
            <VictoryAxis
              scale={{ x: "time" }}
              style={{
                axis: { stroke: "#756f6a" },
                axisLabel: { fontSize: 20, padding: 30 },
                grid: { stroke: ({ tick }) => (tick > 0.5 ? "red" : "grey") },
                ticks: { stroke: "grey", size: 0.011 },
                tickLabels: { fontSize: 5, padding: 5 }
              }}
              tickValues={[
                moment()
                  .subtract(10, "days")
                  .format(),
                moment()
                  .subtract(9, "days")
                  .format(),
                moment()
                  .subtract(8, "days")
                  .format(),
                moment()
                  .subtract(7, "days")
                  .format(),
                moment()
                  .subtract(6, "days")
                  .format(),
                moment()
                  .subtract(5, "days")
                  .format(),
                moment()
                  .subtract(4, "days")
                  .format(),

                moment()
                  .subtract(3, "days")
                  .format(),
                moment()
                  .subtract(2, "days")
                  .format(),
                moment()
                  .subtract(1, "days")
                  .format()
              ]}
              tickFormat={t => moment(t).format("MM-DD")}
            />
            <VictoryAxis
              height={1}
              dependentAxis
              style={{
                axis: { stroke: "#756f6a" },
                axisLabel: { fontSize: 20, padding: 30 },
                grid: { stroke: ({ tick }) => (tick > 0.5 ? "red" : "grey") },
                ticks: { stroke: "grey", size: 0.011 },
                tickLabels: { fontSize: 5, padding: 5 }
              }}
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            />
          </VictoryChart>
        </div>
      </Container>
    );
  }
}

export default Products;
