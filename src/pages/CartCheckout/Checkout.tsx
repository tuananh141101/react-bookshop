import React, { useEffect } from "react";
import { Col, Container, NavItem, Row } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { yupFields } from "../../common/utils/Utils";
import { useDispatch } from "react-redux";
import { toggleChangeValue } from "../../features/checkout/checkoutSlice";
import { useCartStore, useCheckoutStore } from "../../common/hooks/useCustomHooks";
import * as Yup from 'yup';
import { IoIosCloseCircle } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import "./style/Checkout.scss";
import { fetchGetDataAddress, fetchListDistrict, fetchListProvince, fetchListWard } from "../../features/checkout/checkoutApi";
import { AppDispatch } from "../../app/store";
import { Link } from "react-router-dom";
import { textarea } from "framer-motion/client";
import { typeProductInCart } from "../../common/constant/Constant";
import { removeCart } from "../../features/cart/cartSlice";
import StorageService from "../../common/utils/storageService";


const Checkout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        fullName,
        address,
        phone,
        email,
        province,
        district,
        ward,
        dataProvince,
        dataDistrict,
        dataWard,
        receiverProvince,
        receiverDistrict,
        receiverWard,
        receiverFullName,
        receiverAddress,
        receiverPhone,
        isPaymentCheck
    } = useCheckoutStore();
    const {cart} = useCartStore();
    const SignupSchema = Yup.object({
        field_FullName: yupFields.name("Full name"),
        field_Email: yupFields.email,
        field_Address: yupFields.name("Address"),
        field_Phone: yupFields.phone,
        field_receiverFullName: yupFields.name("Receiver full name"),
        field_receiverAddress: yupFields.name("Receiver address"),
        field_receiverPhone: yupFields.phone,
    });
    const getUserId = StorageService.getTokenByName("idUser");

    useEffect(() => {
        dispatch(fetchListProvince())
       dispatch(fetchGetDataAddress(getUserId)) 

    },[])

    useEffect(() => {
        if (receiverProvince) dispatch(fetchListDistrict(receiverProvince))
    }, [dispatch, receiverProvince]);
    useEffect(() => {
        if (receiverDistrict) dispatch(fetchListWard(receiverDistrict));
    }, [dispatch, receiverDistrict]);



    return (
        <>
            <section className="checkout">
                <Container>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            field_FullName: fullName,
                            field_Address: address,
                            field_Phone: phone,
                            field_Email: email,
                            field_receiverFullName: receiverFullName,
                            field_receiverPhone: receiverPhone,
                            field_receiverAddress: receiverAddress
                        }}
                        validationSchema={SignupSchema}
                        validateOnBlur={true}
                        validateOnChange={true}
                        onSubmit={(value: any, { resetForm }: any) => {
                            console.log("check value submit", value);
                            resetForm();
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
                                                <ErrorMessage
                                                    name="field_FullName"
                                                    render={msg => (
                                                        <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>
                                                    )}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Address<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="address"
                                                    name="field_Address"
                                                    maxLength={100}
                                                />
                                                <ErrorMessage
                                                    name="field_Address"
                                                    render={msg => (
                                                        <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>
                                                    )}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Phone<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="phone"
                                                    name="field_Phone"
                                                    maxLength={100}
                                                />
                                                <ErrorMessage
                                                    name="field_Phone"
                                                    render={msg => (
                                                        <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>
                                                    )}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Email<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="email"
                                                    name="field_Email"
                                                    maxLength={100}
                                                />
                                                <ErrorMessage
                                                    name="field_Email"
                                                    render={msg => (
                                                        <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="checkbox d-flex align-items-center gap-1">
                                            <input type="checkbox" name="checkbox" id="checkbox" 
                                                onClick={(e:React.MouseEvent<HTMLInputElement>) => 
                                                dispatch(toggleChangeValue({key: 'isDifferentBilling', value: (e.target as HTMLInputElement).checked}))}
                                            />
                                            <label htmlFor="checkbox">The payment details are different from the shipping details</label>
                                        </div> */}
                                        {/* {isDifferentBilling && 
                                        <div className="billing">
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Billing name<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                id="billingFullName"
                                                    name="field_BillingFullName"
                                                    maxLength={100}
                                                />
                                                <ErrorMessage
                                                    name="field_BillingFullName"
                                                    render={msg => (
                                                        <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>
                                                    )}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Billing address<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="billingAddress"
                                                    name="field_BillingAddress"
                                                    maxLength={100}
                                                />
                                                <ErrorMessage
                                                    name="field_BillingAddress"
                                                    render={msg => (
                                                        <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>
                                                    )}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Billing phone<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="billingPhone"
                                                    name="field_BillingPhone"
                                                    maxLength={100}
                                                />
                                                <ErrorMessage
                                                    name="field_BillingPhone"
                                                    render={msg => (
                                                        <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>
                                                    )}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-province">Province</label>
                                                <select name="province" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                                    dispatch(toggleChangeValue({key: 'province', value: e.target.value}))
                                                    dispatch(fetchListDistrict({provinceId: Number(e.target.value), form: "form1" }));
                                                }}>
                                                    <option value="">- Select province/city -</option>
                                                    {dataProvince ? dataProvince.map((item:any) => {
                                                        return <option key={item?.id} value={item?.id} >{item?.name}</option>
                                                    }) : ""}
                                                </select>
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-district">Distict</label>
                                                <select name="district" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                                    dispatch(toggleChangeValue({key: "district", value: e.target.value}))
                                                    dispatch(fetchListWard({districtId: Number(e.target.value), form: "form1"}));
                                                }}>
                                                    <option value="">- Select district -</option>
                                                    {dataDistrict ? dataDistrict.map((item:any) => {
                                                        return <option key={item?.id} value={item?.id}>{item?.name}</option>
                                                    }) : ""}
                                                </select>
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-ward">Ward</label>
                                                <select name="ward">
                                                    <option value="">- Select ward -</option>
                                                    {dataWard ? dataWard.map((item:any) => {
                                                        return <option key={item?.id} value={item?.id}>{item?.name}</option>
                                                    }) : ""}
                                                </select>
                                            </div>
                                        </div>} */}
                                    </div>
                                    <div className="checkout-customer__order-products border-top border-bottom">
                                        <div className="order-header d-flex align-items-center justify-content-between">
                                            <p className="mb-0">Select Products</p>
                                            <div className="icon">
                                                <Link to="/cart" className="d-flex align-items-center"><FiEdit />Edit</Link>
                                            </div>
                                        </div>
                                        
                                        {cart.map((items:typeProductInCart) => (
                                            <div className="item-cart d-flex align-items-start" key={items.id}>
                                                <div className="item-cart__product-base d-flex">
                                                    <div className="image">
                                                        <img src={`https://websitebook-api.vercel.app${items.image}`} alt="" />
                                                    </div>
                                                    <div className="title">
                                                        <p className="name-book">{items.name}l</p>
                                                        <p className="vendor mb-0">
                                                            <span>Vendor:</span> Bookstore
                                                        </p>
                                                    </div>
                                                </div>
                                                <ul className="item-cart__exinfo d-flex justify-content-around">
                                                    <li className="exinfo-item exinfo-price">
                                                        <p className="title">Price</p>
                                                        <p className="title-price mb-0">{items.price}$</p>
                                                    </li>
                                                    <li className="exinfo-item exinfo-qty">
                                                        <p className="title">Quantity</p>
                                                        <p className="title-qty"
                                                            style={{textAlign: "center"}}
                                                        >{items.quantity}</p>
                                                    </li>
                                                    <li className="exinfo-item exinfo-amount">
                                                        <p className="title">Amount</p>
                                                        <p className="title-amount">{Number(items.price) * Number(items.quantity)}$</p>
                                                    </li>
                                                </ul>
                                                <div className="item-cart__exinfo-remove"
                                                    onClick={() => dispatch(removeCart(items))}
                                                >
                                                    <span className="removeCart">
                                                        <IoIosCloseCircle />
                                                    </span>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    <div className="checkout-customer__address border-bottom">
                                        <p className="title d-flex align-items-center gap-3"><span>2</span> Shipping Address</p>
                                        <div className="form-group">
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Full name<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="receiverFullName"
                                                    name="field_receiverFullName"
                                                    maxLength={100}
                                                />
                                                <ErrorMessage
                                                    name="field_receiverFullName"
                                                    render={msg => (
                                                        <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>
                                                    )}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-left flex-column">
                                                <label className="label-name">Phone<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="receiverPhone"
                                                    name="field_receiverPhone"
                                                    maxLength={100}
                                                />
                                                <ErrorMessage
                                                    name="field_receiverPhone"
                                                    render={msg => (
                                                        <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>
                                                    )}
                                                />
                                            </div>
                                            <div className="item-form receiver-pronvince d-flex align-items-left flex-column">
                                                <label className="label-receiverProvince">Province<span style={{color:"red"}}>*</span></label>
                                                <select name="province" 
                                                    onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                                        dispatch(toggleChangeValue({key: 'receiverProvince', value: e.target.value}))
                                                        dispatch(fetchListDistrict(e.target.value));
                                                    }}
                                                    value={receiverProvince || province}
                                                >
                                                    <option value="">- Select province/city -</option>
                                                    {dataProvince ? dataProvince.map((item:any) => {
                                                        return <option key={item?.id} value={item?.id} >{item?.name}</option>
                                                    }) : ""}
                                                </select>
                                            </div>
                                            <div className="item-form receiver-address d-flex align-items-left flex-column">
                                                <label className="label-receiverAddress">Address<span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="receiverAddress"
                                                    name="field_receiverAddress"
                                                    maxLength={100}
                                                />
                                                <ErrorMessage
                                                    name="field_receiverAddress"
                                                    render={msg => (
                                                        <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group2">
                                            <div className="item-form receiver-district d-flex align-items-left flex-column">
                                                <label className="label-receiverDistrict">District<span style={{color:"red"}}>*</span></label>
                                                <select name="province" 
                                                    onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                                        dispatch(toggleChangeValue({key: 'receiverDistrict', value: e.target.value}))
                                                        dispatch(fetchListWard(e.target.value));
                                                    }}
                                                    value={receiverDistrict || district}
                                                >
                                                    <option value="">- Select district -</option>
                                                    {dataDistrict ? dataDistrict.map((item:any) => {
                                                        return <option key={item?.id} value={item?.id} >{item?.name}</option>
                                                    }) : ""}
                                                </select>
                                            </div>
                                            <div className="item-form receiver-ward d-flex align-items-left flex-column">
                                                <label className="label-receiverWard">Ward<span style={{color:"red"}}>*</span></label>
                                                <select name="province" 
                                                    onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                                        dispatch(toggleChangeValue({key: 'receiverWard', value: e.target.value}))
                                                    }}
                                                    value={receiverWard || ward}
                                                >
                                                    <option value="">- Select ward -</option>
                                                    {dataWard ? dataWard.map((item:any) => {
                                                        return <option key={item?.id} value={item?.id} >{item?.name}</option>
                                                    }) : ""}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout-customer__payment-method border-bottom">
                                        <p className="title d-flex align-items-center gap-3">
                                            <span>3</span> Payment Methods
                                        </p>
                                        <div className="payway-group d-flex flex-column">
                                            <label htmlFor="checkPayCash">
                                                <div className={`item-paymenthod cash ${isPaymentCheck === "cash" ? "inputCheckedBorder" : ""}`}>
                                                    <div className="img-icon">
                                                        <img src="/public/assets/Icons/cod-paymentmethod.png" alt="" />
                                                    </div>
                                                    <p className="mb-0">Cash on Delivery (COD)</p>
                                                    <div className="checkbox d-flex align-items-center justify-content-center">
                                                        <input type="radio" name="checkBoxPayment" id="checkPayCash" value="cash" onChange={(e:React.ChangeEvent<HTMLInputElement>) => dispatch(toggleChangeValue({key: 'isPaymentCheck', value: e.target.value}))}/>
                                                    </div>
                                                </div>
                                            </label>
                                            <label htmlFor="checkPayMomo">
                                                <div className={`item-paymenthod momo ${isPaymentCheck === "momo" ? "inputCheckedBorder" : ""}`}>
                                                    <div className="img-icon">
                                                        <img src="/public/assets/Icons/momo-paymentmethod.png" alt="" />
                                                    </div>
                                                    <p className="mb-0">Momo</p>
                                                    <div className="checkbox d-flex align-items-center justify-content-center">
                                                        <input type="radio" name="checkBoxPayment" id="checkPayMomo" value="momo" onChange={(e:React.ChangeEvent<HTMLInputElement>) => dispatch(toggleChangeValue({key: 'isPaymentCheck', value: e.target.value}))}/>
                                                    </div>
                                                </div>
                                            </label>
                                            <label htmlFor="checkPayZalopay">
                                                <div className={`item-paymenthod zalopay ${isPaymentCheck === "zalopay" ? "inputCheckedBorder" : ""}`}>
                                                    <div className="img-icon">
                                                        <img src="/public/assets/Icons/zalo-paymentmethod.jpg" alt="" />
                                                    </div>
                                                    <p className="mb-0">Bank Card, ZaloPay Wallet</p>
                                                    <div className="checkbox d-flex align-items-center justify-content-center">
                                                        <input type="radio" name="checkBoxPayment" id="checkPayZalopay" value="zalopay" onChange={(e:React.ChangeEvent<HTMLInputElement>) => dispatch(toggleChangeValue({key: 'isPaymentCheck', value: e.target.value}))}/>
                                                    </div>
                                                </div>
                                            </label>
                                            <label htmlFor="checkPayShoppepay">
                                                <div className={`item-paymenthod shoppepay ${isPaymentCheck === "shoppepay" ? "inputCheckedBorder" : ""}`}>
                                                    <div className="img-icon">
                                                        <img src="/public/assets/Icons/shoppepay-paymentmethod.jpg" alt="" />
                                                    </div>
                                                    <p className="mb-0">Shoppe pay</p>
                                                    <div className="checkbox d-flex align-items-center justify-content-center">
                                                        <input type="radio" name="checkBoxPayment" id="checkPayShoppepay" value="shoppepay" onChange={(e:React.ChangeEvent<HTMLInputElement>) => dispatch(toggleChangeValue({key: 'isPaymentCheck', value: e.target.value}))}/>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="warning">
                                            <p className="mb-0">
                                                Beware of Scams - Protect Your Personal Information!
                                                We will never ask you to transfer money in advance to a personal bank account.
                                                Please make your payment only through the method you selected when placing your order.
                                                Thank you for trusting and supporting Phuong Nam Bookstore.
                                            </p>
                                            <br />
                                            After completing your online payment, please wait a few seconds for the system to update the successful status. Thank you!
                                        </div>
                                    </div>
                                    <div className="checkout-customer__note">
                                        <p className="title">Notes</p>
                                        <Field name="notes" placeholder="Notes" component={textarea} className="notes-field"/>
                                    </div>
                                </Col>
                                <Col className="checkout-order" md={4}>
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
