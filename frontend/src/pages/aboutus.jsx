import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../css/aboutUs.min.css";
import aboutusTwo from "../img/aboutustwo.jpg";
import aboutUs from "../img/aboutUs.jpg";
class Products extends React.PureComponent {
  render() {
    return (
      <div>
        <Container>
          <Row className="aboutUs">
            <Col md="6">
              <img src={aboutUs} alt="Smiley " />
            </Col>
            <Col md="6">
              <h1>Why Does Plantr Exist?</h1>
              <h2>
                Plantr started in 2019 in order to fufill its creators belief
                that all people should have access to homegrown produce and that
                society should take steps towards reducing food waste and CO2
                emissions.
              </h2>
            </Col>
          </Row>
          <Row className="aboutUs">
            <Col md="6">
              <img src={aboutusTwo} alt="Smiley face" />
            </Col>
            <Col md="6">
              <h1>What Does Plantr Do?</h1>
              <h2>
                Plantr allows people to connect with people in their community,
                build relationships, gain access to fresh produce, and reduce
                their carbon footprint.
              </h2>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Products;
