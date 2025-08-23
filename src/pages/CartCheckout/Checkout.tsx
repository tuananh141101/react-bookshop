import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPhoneVolume } from "react-icons/fa6";
import { Field, Form, Formik } from "formik";
import { yupFields } from "../../common/utils/Utils";
import { useDispatch } from "react-redux";
import { toggleChangeValue } from "../../features/checkout/checkoutSlice";
import { useCheckoutStore } from "../../common/hooks/useCustomHooks";
import * as Yup from 'yup';
import "./style/Checkout.scss";
import { fetchListDistrict, fetchListProvince, fetchListWard } from "../../features/checkout/checkoutApi";
import { AppDispatch } from "../../app/store";


const Checkout = () => {
    const dispatch = useDispatch<AppDispatch>();
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
        ward,
        dataProvince,
        dataDistrict,
        dataWard
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
    });

    useEffect(() => {
        dispatch(fetchListProvince())
    },[])

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
                            console.log("check value submit", value);
                            resetForm()
                        }}
                    >
                        <Form>
                            <Row>
                                <Col className="checkout-customer" md={8}>
                                    <div className="checkout-customer__stepuser d-flex align-items-center flex-column">
                                        <p className="title d-flex align-items-center gap-3">
                                            <span>1</span> Customer Information
                                        </p>
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
                                            <input type="checkbox" name="checkbox" id="checkbox" 
                                                onClick={(e:React.MouseEvent<HTMLInputElement>) => 
                                                dispatch(toggleChangeValue({key: 'isDifferentBilling', value: (e.target as HTMLInputElement).checked}))}
                                            />
                                            <label htmlFor="checkbox">The payment details are different from the shipping details</label>
                                        </div>
                                        {!isDifferentBilling && 
                                        <div className="billing">
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Billing name<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="billingFullName"
                                                    name="field_BillingFullName"
                                                    maxLength={100}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Billing address<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="billingAddress"
                                                    name="field_BillingAddress"
                                                    maxLength={100}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Billing phone<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="billingPhone"
                                                    name="field_BillingPhone"
                                                    maxLength={100}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <select name="province" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                                    dispatch(toggleChangeValue({key: 'province', value: e.target.value}))
                                                    dispatch(fetchListDistrict());
                                                }}>
                                                    <option value="">- Select province/city -</option>
                                                    {dataProvince ? dataProvince.map((item:any) => {
                                                        return <option key={item?.id} value={item?.id} >{item?.name}</option>
                                                    }) : ""}
                                                </select>
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <select name="district" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                                    dispatch(toggleChangeValue({key: "district", value: e.target.value}))
                                                    dispatch(fetchListWard());
                                                }}>
                                                    <option value="">- Select district -</option>
                                                    {dataDistrict ? dataDistrict.map((item:any) => {
                                                        return <option key={item?.id} value={item?.id}>{item?.name}</option>
                                                    }) : ""}
                                                </select>
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <select name="ward" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                                }}>
                                                    <option value="">- Select ward -</option>
                                                    {dataWard ? dataWard.map((item:any) => {
                                                        return <option key={item?.id} value={item?.id}>{item?.name}</option>
                                                    }) : ""}
                                                </select>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className="checkout-customer__order-products border-top border-bottom">
                                        <div className="item-cart d-flex align-items-center">
                                            <div className="item-cart__product-base d-flex">
                                                <div className="image">
                                                    <img src="https://picsum.photos/200/300" alt="" />
                                                </div>
                                                <div className="title">
                                                    <p className="name-book">Blessing in Disguise: A Novel</p>
                                                    <p className="vendor mb-0">
                                                        <span>Vendor:</span> Bookstore
                                                    </p>
                                                </div>
                                            </div>
                                            <ul className="item-cart__exinfo d-flex">
                                                <li className="exinfo-item exinfo-price">price</li>
                                                <li className="exinfo-item exinfo-qty">qty</li>
                                                <li className="exinfo-item exinfo-amount">amount</li>
                                            </ul>
                                            <div className="item-cart__exinfo-remove">remove</div>
                                        </div>
                                    </div>
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