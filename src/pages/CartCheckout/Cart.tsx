import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import "./style/Cart.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useCartStore } from "../../common/hooks/useCustomHooks";
import { BsCartXFill } from "react-icons/bs";
import { typeProductInCart } from "../../common/constant/Constant";
import { decreaseItemQuantity, increaseItemQuantity, removeAllCart, removeCart } from "../../features/cart/cartSlice";


const Index = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {cart} = useCartStore();

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
                        {cart.length > 0 ? (
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
                                    {cart.map((item:typeProductInCart) => (
                                        <tr key={item.id}>
                                            <td className="cart-table__image-block">
                                                <div className="image-wrapper d-flex align-items-center justify-content-center">
                                                    <Link to="">
                                                        <img src={`https://websitebook-api.vercel.app${item?.image}`} alt="" />
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="cart-table__description">
                                                <Link to="">{item.name}  <span className="removeProduct" onClick={() => dispatch(removeCart(item))}><IoIosCloseCircle/></span></Link>
                                            </td>
                                            <td className="cart-table__price">
                                                <p className="mb-0" style={{paddingLeft: "0px"}}>{item.price}$</p>
                                            </td>
                                            <td className="cart-table__qty">
                                                <div className="qty-wrapper">
                                                    <button
                                                        onClick={() => {
                                                            if (item.quantity === 1) dispatch(removeCart(item));
                                                            dispatch(decreaseItemQuantity(item));
                                                        }}
                                                    >-</button>
                                                    <input type="number" name="quantity" value={item.quantity} />
                                                    <button
                                                        onClick={() => dispatch(increaseItemQuantity(item))}
                                                    >+</button>    
                                                </div>
                                            </td>
                                            <td className="cart-table__total">
                                                <p className="mb-0" style={{paddingLeft: "0px"}}>
                                                    {Number(item.price) * Number(item.quantity)}$
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="noItemInCart d-flex align-items-center flex-column justity-content-center">
                                <div className="iconEmptyCart"><BsCartXFill /></div>
                                <p className="title">Your cart is empty</p>
                                <button className="continue-shop"
                                    onClick={() => navigate("/shop")}
                                >Go shopping</button>
                            </div>
                        )}
                    </Col>
                    {cart.length > 0 &&
                        (<>
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
                                        <button
                                            onClick={() => dispatch(removeAllCart())}
                                        >Delete cart</button>
                                    </div>
                                    <div className="btn-right">
                                        <button className="checkout"
                                            onClick={() => navigate("/checkout")}
                                        >Go checkout</button>
                                    </div>
                                </div>
                            </Col>
                        </>)
                    }
                </Row>
            </Container>
        </section>
    )
}

export default Index;