import React from "react";
import "./style/Checkout.scss";
import { Col, Container, Row } from "react-bootstrap";

const Checkout = () => {
    return (
        <section className="checkout">
            <Container>
                <Row>
                    <Col className="checkout-customer" md={9}>left</Col>
                    <Col className="checkout-order" md={3}>
                        <div className="checkout-order__coupon d-flex flex-column">
                            <p className="coupon-title mb-0">Coupon</p>
                            <div className="coupon-input">
                                <label>Gift or discount</label>
                                <div className="input-warpper">
                                    <input type="text" name="coupon" />
                                    <button>Apply</button>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-order__abcart d-flex flex-column">
                            <p className="abcart-title mb-0">About cart</p>
                            <div className="abcart-body">
                                <div className="checkout-summary">
                                    <table className="checkout-sumary__block">
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
                                                <td>-12.00$</td>
                                            </tr>
                                        </tbody>
                                        <tbody>
                                            <tr>
                                                <td>Total:</td>
                                                <td>122.99$</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="checkout-submit">
                                    <button>Buy now</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Checkout