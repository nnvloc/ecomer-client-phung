import React, {memo} from "react";
import { Container, Row, Col } from "react-bootstrap";

import './styles.css';

const Footer = (props) => {
  return (
    <div className="footer-container">
      <Container className="main-footer">
        <Row>
          <Col className="footer-infor">
            <a href="/contact-us">Contact Us</a>
          </Col>
          <Col className="footer-infor">
            <a href="/about-us">About Us</a>
          </Col>
          <Col className="footer-infor">
            <a href="/store">Stores</a>
          </Col>
          <Col className="footer-infor">
            <a href="/policy">Policy</a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default memo(Footer);
