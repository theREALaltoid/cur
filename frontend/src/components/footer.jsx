import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faReddit
} from "@fortawesome/free-brands-svg-icons";

import { Container, Row, Col } from "reactstrap";
import "../css/navbar.min.css";

class PageFooter extends React.PureComponent {
  render() {
    return (
      <div className="Pagefooter">
        <Container>
          <Row>
            <Col md="4"></Col>
            <Col md="4">
              <h1>Plantr</h1>
            </Col>
            <Col md="4"></Col>
          </Row>
          <Row>
            {" "}
            <Col md="4">
              <p>All rights reserved 2019 – </p>
            </Col>
            <Col md="4"></Col>
            <Col md="4">
              <FontAwesomeIcon icon={faReddit} size="2x" />
              <FontAwesomeIcon icon={faTwitter} size="2x" />
              <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PageFooter;
