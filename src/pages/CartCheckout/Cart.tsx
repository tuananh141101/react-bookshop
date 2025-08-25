import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";


import "./style/Cart.scss";

const Index = () => {
    const navigate = useNavigate()
    return (
        <section className="cart">
            <Container>
                <Row>
                    <Col className="cart-content-btn" xs={12}>
                        <p className="mb-0">delivery details</p>   
                        <div className="cart-btn d-flex align-items-center justify-content-between">
                            <button className="continue-shop"
                                onClick={() => navigate("/shop")}
                            >Continue shopping</button>
                            <button className="go-checkout"
                                onClick={() => navigate("/checkout")}
                            >Go checkout</button>
                        </div>                     
                    </Col>
                    <Col className="cart-detail" xs={12}>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th className="title">Product</th>
                                    <th className="title">&nbsp;</th>
                                    <th className="title">Price</th>
                                    <th className="title">Quantity</th>
                                    <th className="title">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="cart-table__image-block">
                                        {/* <span>Product</span> */}
                                        <div className="image-wrapper d-flex align-items-center justify-content-center">
                                            <Link to="">
                                                <img src="https://picsum.photos/200/300" alt="" />
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="cart-table__description">
                                        <Link to="">Born a Crime: Stories from a South African Childhood  <span className="removeProduct"><IoIosCloseCircle/></span></Link>
                                    </td>
                                    <td className="cart-table__price">
                                        <span>Price</span>
                                        <p className="mb-0" style={{paddingLeft: "0px"}}>13.49$</p>
                                    </td>
                                    <td className="cart-table__qty">
                                        <span>Quantity</span>
                                        <div className="qty-wrapper">
                                            <button>-</button>
                                            <input type="number" name="quantity" value={1} />
                                            <button>+</button>    
                                        </div>
                                    </td>
                                    <td className="cart-table__total">
                                        <span>Total</span>
                                        <p className="mb-0" style={{paddingLeft: "0px"}}>13.49$</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="cart-table__image-block">
                                        <div className="image-wrapper d-flex align-items-center justify-content-center">
                                            <Link to="">
                                                <img src="https://picsum.photos/200/300" alt="" />
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="cart-table__description">
                                        <Link to="">Born a Crime: Stories from a South African Childhood <span className="removeProduct"><IoIosCloseCircle/></span></Link>
                                    </td>
                                    <td className="cart-table__price">
                                        <span>13.49$</span>
                                    </td>
                                    <td className="cart-table__qty">
                                        <div className="qty-wrapper">
                                            <button>-</button>
                                            <input type="number" name="quantity" value={1} />
                                            <button>+</button>    
                                        </div>
                                    </td>
                                    <td className="cart-table__total">
                                        <span>13.49$</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="cart-table__image-block">
                                        <div className="image-wrapper d-flex align-items-center justify-content-center">
                                            <Link to="">
                                                <img src="https://picsum.photos/200/300" alt="" />
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="cart-table__description">
                                        <Link to="">Born a Crime: Stories from a South African Childhood <span className="removeProduct"><IoIosCloseCircle/></span></Link>
                                    </td>
                                    <td className="cart-table__price">
                                        <span>13.49$</span>
                                    </td>
                                    <td className="cart-table__qty">
                                        <div className="qty-wrapper">
                                            <button>-</button>
                                            <input type="number" name="quantity" value={1} />
                                            <button>+</button>    
                                        </div>
                                    </td>
                                    <td className="cart-table__total">
                                        <span>13.49$</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col className="cart-total" xs={12}>
                        <div className="cart-total__wrapper da-flex align-items-center border">
                            <div className="cart-total__top d-flex align-items-center justify-content-between border-bottom">
                                <div className="coupon">
                                    <p className="mb-0">Coupon</p>
                                    <form className="d-flex algin-items-center justify-content-center">
                                        <input type="text" name="coupon" id="" placeholder="Enter your coupon!"/>
                                        <button type="submit">Apply</button>
                                    </form>
                                </div>
                                <div className="statistic-list">
                                    <ul className="mb-0">
                                        <li>
                                            <span className="title">Subtotal: </span>
                                            <span className="value">133.99$</span>
                                        </li>
                                        <li style={{textAlign: "center"}}>
                                            <span className="cost">Shipping costs</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="cart-total__bottom">
                                <span className="total-title">Total: </span>
                                <span className="total-value">133.99$</span>

                            </div>
                        </div>
                    </Col>
                    <Col className="cart-bottom-btn" xs={12}>
                        <div className="btn-wrapper d-flex align-items-center justify-content-between">
                            <div className="btn-left">
                                <button className="continue-shop"
                                    onClick={() => navigate("/shop")}
                                >Continue shopping</button>
                                <button>Delete cart</button>
                            </div>
                            <div className="btn-right">
                                <button className="checkout"
                                    onClick={() => navigate("/checkout")}
                                >Go checkout</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Index;