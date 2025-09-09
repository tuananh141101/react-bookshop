import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { useAuthStore } from "../../../common/hooks/useCustomHooks";
import { option } from "framer-motion/client";

const AddressTab = () => {
    const SignUpSchema = {};
    const dispatch = useDispatch<AppDispatch>();
    const { shippingAddress,billingAddress,listProvice } = useAuthStore();
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

                            <div className="form-wrapper form-wrapper-1">
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
                            <div className="farm-wrapper farm-wrapper-2">
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-province">Province</label>
                                    <select name="province" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                        console.log("check e", e.target.value);
                                        // dispatch(toggleChangeValue({key: 'province', value: e.target.value}))
                                        // dispatch(fetchListDistrict({provinceId: Number(e.target.value), form: "form1" }));
                                    }}>
                                        {shippingAddress?.proviceId ?
                                            listProvice
                                                ?.filter((item: any) => Number(item.id) === Number(shippingAddress.proviceId))
                                                .map((item: any) => (
                                                <option value={item.id} key={item.id}>
                                                    {item.name}
                                                </option>
                                                )) :
                                            (
                                                <>                                                
                                                    <option value="">- Select province/city -</option>
                                                    {listProvice && listProvice.map((item:any) => {
                                                        return <option key={item?.id} value={item?.id}>{item?.name}</option>
                                                    })}
                                                </>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-district">District</label>
                                    <select name="district" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                        console.log("check e", e.target.value);
                                    }}>
                                        {shippingAddress?.districtId ?
                                            listProvice
                                                ?.filter((item: any) => Number(item.id) === Number(shippingAddress.districtId))
                                                .map((item: any) => (
                                                <option value={item.id} key={item.id}>
                                                    {item.name}
                                                </option>
                                                )) :
                                            (
                                                <>                                                
                                                    <option value="">- Select province/city -</option>
                                                    {listProvice && listProvice.map((item:any) => {
                                                        return <option key={item?.id} value={item?.id}>{item?.name}</option>
                                                    })}
                                                </>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-ward">Ward</label>
                                    <select name="ward" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                        console.log("check e", e.target.value);
                                    }}>
                                        {shippingAddress?.wardId ?
                                            listProvice
                                                ?.filter((item: any) => Number(item.id) === Number(shippingAddress.wardId))
                                                .map((item: any) => (
                                                <option value={item.id} key={item.id}>
                                                    {item.name}
                                                </option>
                                                )) :
                                            (
                                                <>                                                
                                                    <option value="">- Select province/city -</option>
                                                    {listProvice && listProvice.map((item:any) => {
                                                        return <option key={item?.id} value={item?.id}>{item?.name}</option>
                                                    })}
                                                </>
                                            )
                                        }
                                    </select>
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