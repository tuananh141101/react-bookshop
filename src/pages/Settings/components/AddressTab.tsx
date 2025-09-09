import { Field, Form, Formik } from "formik";
import React from "react";

const AddressTab = () => {
    const SignUpSchema = {};

    return (
        <>
            <div className="address-heading">
                <p>Address</p>
                <span>Manage your billing and/or shipping addresses</span>
                <br/>
                <span className="title">The following addresses will be used on the checkout page by default.</span>
            </div>
            <div className="address-form">
                <Formik
                    // initialValues={}
                    enableReinitialize
                    validationSchema={SignUpSchema}
                    onSubmit={(value, {resetForm}) => {
                        console.log("value", value)
                    }}
                >
                    <Form>
                        <div className="billingAddress">
                            <p>Billing address:</p>

                            <div className="form-wrapper">
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Billing full name<span style={{color:"red"}}>*</span></label>
                                    <Field
                                        id="billingFullName"
                                        name="field_BillingFullName"
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
                                    <label className="label-name">Billing address<span style={{color:"red"}}>*</span></label>
                                    <Field
                                        id="billingAddress"
                                        name="field_BillingAddress"
                                        maxLength={100}
                                    />
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Billing email<span style={{color:"red"}}>*</span></label>
                                    <Field
                                        id="billingEmail"
                                        name="field_BillingEmail"
                                        maxLength={100}
                                    />
                                </div>    
                            </div>
                            
                        </div>
                        <div className="shippingAddress">
                            <p>Shipping address</p>

                            <div className="form-wrapper">
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Shipping full name<span style={{color:"red"}}>*</span></label>
                                    <Field
                                        id="shippingFullName"
                                        name="field_ShippingFullName"
                                        maxLength={100}
                                    />
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Shipping phone<span style={{color:"red"}}>*</span></label>
                                    <Field
                                        id="shippingPhone"
                                        name="field_ShippingPhone"
                                        maxLength={100}
                                    />
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Shipping address<span style={{color:"red"}}>*</span></label>
                                    <Field
                                        id="shippingAddress"
                                        name="field_ShippingAddress"
                                        maxLength={100}
                                    />
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default AddressTab;