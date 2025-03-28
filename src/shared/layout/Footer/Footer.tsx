import "./styles/Footer.scss";
import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import Button from "../../components/Button/Button";
import React from "react";

const Footer = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 992);

    return (
        <>
            <div className="footer">
                <div className="footer-top">
                    <Container>
                        <Row>
                            <Col className="d-flex align-items-center flex-column">
                                <div className="text-center mb-4">
                                    <p className="mb-0">Join Our Newsletter</p>
                                    <span>
                                        Signup to be the first to hear about
                                        exclusive deals, special offers and
                                        upcoming collections
                                    </span>
                                </div>
                                <div className="subcribe-form d-flex align-items-center">
                                    <form
                                        action=""
                                        className="d-flex align-items-center justify-content-center"
                                    >
                                        <InputForm
                                            placeholder="Enter your email for weekly newsletter"
                                            value=""
                                            onChange={(e: any) => {
                                                console.log(
                                                    "check e",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <Button text="Subscribe" />
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="footer-center">
                    <Container>
                        <Row>
                            <Col xxl={4} xl={4} className="col-custom">
                                <Link to="/">BOOKSTORE</Link>
                                <address className="my-3">
                                    141 Hoang Van Thai, Khuong Mai, Thanh Xuan,
                                    Hanoi
                                </address>
                                <ul className="pl-0 mb-3 contact">
                                    <li>sale@bookstore.com</li>
                                    <li>+84 234-345-678</li>
                                </ul>
                                <ul className="d-flex align-items-center social">
                                    <li>
                                        <Link to="/">
                                            <LuMapPin className="icon icon-map" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <FaFacebook className="icon icon-fa" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <FaInstagram className="icon icon-in" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <FaTwitter className="icon icon-tw" />
                                        </Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col xl={2} className="col-custom">
                                <p>Explore</p>
                                <ul>
                                    <li>
                                        <Link to="/">About Us</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Site Map</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Bookmarks</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Sign In/Join</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col xxl={2} xl={2} className="col-custom">
                                <p>Customer Service</p>
                                <ul>
                                    <li>
                                        <Link to="/">Help Center</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Return</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Product Recalls</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Store Pickup</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col xxl={2} xl={2} className="col-custom">
                                <p>Policy</p>
                                <ul>
                                    <li>
                                        <Link to="/">Return Policy</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Term Of Use</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col xxl={2} xl={2} className="col-custom">
                                <p>Categories</p>
                                <ul>
                                    <li>
                                        <Link to="/">Action</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Cooking</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Family</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Drama</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Other</Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="footer-bottom">
                    <Container>
                        <Row className="py-3">
                            <Col
                                className={`d-flex align-items-center ${
                                    isMobile ? "justify-content-center" : ""
                                }`}
                                xxl={6}
                                xl={6}
                                lg={6}
                            >
                                <p className="mb-0">
                                    © Copyright 2023 · Bookstore · All Rights
                                    Reserved
                                </p>
                            </Col>
                            <Col xxl={6} xl={6} lg={6}>
                                <div
                                    className={`d-flex ${
                                        isMobile
                                            ? "justify-content-center"
                                            : "justify-content-end"
                                    }`}
                                >
                                    <img
                                        src="https://bookworm.madrasthemes.com/wp-content/themes/bookworm/assets/img/credit-cards.png"
                                        alt="Payment Methods"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default Footer;
