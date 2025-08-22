import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPhoneVolume } from "react-icons/fa6";
import { Field, Form, Formik } from "formik";
import { yupFields } from "../../common/utils/Utils";
import { useDispatch } from "react-redux";
// import { toggleChangeValue } from "../../features/checkout/checkoutSlice";
import { useCheckoutStore } from "../../common/hooks/useCustomHooks";
import * as Yup from 'yup';
import "./style/Checkout.scss";


const Checkout = () => {
    const dispatch = useDispatch();
    const {
        fullName,
        address,
        phone,
        email,
        isDifferentBilling,
        billingFullName,
        billingAddress,
        billingPhone,
        province,
        district,
        ward
    } = useCheckoutStore();

    const SignupSchema = Yup.object({
        field_FullName: yupFields.name("Full name"),
        field_Email: yupFields.email,
        field_Address: yupFields.name("Address"),
        field_Phone: yupFields.phone,
        field_BillingFullName: yupFields.name("Billing full name"),
        field_BillingAddress: yupFields.name("Billing address"),
        field_BillingPhone: yupFields.phone,
        field_Province: yupFields.name("Province"),
        field_District: yupFields.name("District"),
        field_Ward: yupFields.name("Ward")
    })

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
                    <Formik
                        enableReinitialize
                        initialValues={{
                            field_FullName: fullName,
                            field_Address: address,
                            field_Phone: phone,
                            field_Email: email,
                            field_DiffirentBilling: isDifferentBilling,
                            field_BillingFullName: billingFullName,
                            field_BillingAddress: billingAddress,
                            field_BillingPhone: billingPhone,
                            field_Province: province,
                            field_District: district,
                            field_Ward: ward
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(value: any, { resetForm }: any) => {
                            console.log("check value submit", value)
                        }}
                    >
                        <Form>
                            <Row>
                                <Col className="checkout-customer" md={8}>
                                    <div className="checkout-customer__stepuser d-flex align-items-center flex-column">
                                        <div className="user">
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Full name<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="fullName"
                                                    name="field_FullName"
                                                    maxLength={100}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Address<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="address"
                                                    name="field_Address"
                                                    maxLength={100}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Phone<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="phone"
                                                    name="field_Phone"
                                                    maxLength={100}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Email<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="email"
                                                    name="field_Email"
                                                    maxLength={100}
                                                />
                                            </div>
                                        </div>

                                        <div className="checkbox d-flex align-items-center gap-1">
                                            <input type="checkbox" name="checkbox" id="checkbox" />
                                            <label for="checkbox">The payment details are different from the shipping details</label>
                                        </div>

                                        <div className="billing">billing</div>
                                    </div>

                                    <div className="checkout-customer__order-products">order products</div>
                                    <div className="checkout-customer__address">address</div>
                                    <div className="checkout-customer__payment-method">payment method</div>
                                    <div className="checkout-customer__note">note</div>
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
                                                <button type="submit">Buy now (122.99$)</button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>        
                        </Form>
                    </Formik>
                    
                </Container>
            </section>
        </>
    )
}

export default Checkout