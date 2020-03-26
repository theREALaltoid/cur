import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../css/generalStyle.min.css";
import Navigation from "../components/navbar";

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <Navigation />
        <div className="homepageupper">
          <Container>
            <Row>
              <Col md="6">
                <h1 className="pageheading">Currency</h1>
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
