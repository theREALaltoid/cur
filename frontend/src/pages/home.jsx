import React from "react";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppStore, faAndroid } from "@fortawesome/free-brands-svg-icons";
import "../css/generalStyle.min.css";
import screenshot from "../img/screenshot.png";
class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="homepageupper">
          <Container>
            <Row>
              <Col md="6">
                <h1 className="pageheading">Currency Name</h1>
              </Col>
              <Col md="6">
                <h1>Keep Track of All of Your Investments in One Place</h1>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
