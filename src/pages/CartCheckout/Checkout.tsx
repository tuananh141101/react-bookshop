import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPhoneVolume } from "react-icons/fa6";
import "./style/Checkout.scss";

const Checkout = () => {
    return (
        <>
            <div className="litecheckout-header border-bottom">
                <Container>
                    <Row>
                        <Col className="d-flex align-items-center justify-content-between">
                            <p className="logo mb-0">bookstore</p>
                            <div className="contact">
                                <span className="icon"><FaPhoneVolume/></span>
                                <span className="number">1900 4040</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <section className="checkout">
                <Container>
                    <Row>
                        <Col className="checkout-customer" md={8}>
                            <div className="checkout-customer__stepuser">step user</div>
                            <div className="checkout-customer__order-products">order products</div>
                            <div className="checkout-customer__address">address</div>
                            <div className="checkout-customer__payment-method">payment method</div>
                        </Col>
                        <Col className="checkout-order sticky-top" md={4}>
                            <div className="checkout-order__coupon d-flex flex-column">
                                <p className="coupon-title">Coupon</p>
                                <div className="coupon-input">
                                    <label>Gift or discount</label>
                                    <div className="input-wrapper d-flex align-items-center">
                                        <input type="text" name="coupon" />
                                        <button>Apply</button>
                                    </div>
                                </div>
                            </div>
                            <div className="checkout-order__abcart d-flex flex-column">
                                <p className="abcart-title">About cart</p>
                                <div className="abcart-body">
                                    <div className="checkout-summary">
                                        <table className="checkout-summary__block">
                                            <tbody>
                                                <tr>
                                                    <td>Quantity product:</td>
                                                    <td>4 products</td>
                                                </tr>
                                                <tr>
                                                    <td>Into monkey:</td>
                                                    <td>133.99$</td>
                                                </tr>
                                                <tr>
                                                    <td>Shipping cost:</td>
                                                    <td>133.991</td>
                                                </tr>
                                                <tr>
                                                    <td>Coupon:</td>
                                                    <td style={{color: "#f75454"}}>-12.00$</td>
                                                </tr>
                                            </tbody>
                                            <tbody className="total">
                                                <tr>
                                                    <td>Total:</td>
                                                    <td>122.99$</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="checkout-submit">
                                        <button>Buy now (122.99$)</button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Checkout