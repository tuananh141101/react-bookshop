import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { useAuthStore } from "../../../common/hooks/useCustomHooks";
import { toggleChangeValue } from "../../../features/auth/authSlice";
import { fetchListDistrictData, fetchListWard } from "../../../features/auth/authApi";
import { yupFields } from "../../../common/utils/Utils";

const AddressTab = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { shippingAddress,listProvice, listDistrict, billingAddress } = useAuthStore();
    const SignupSchema = Yup.object({
        field_BillingFullName: yupFields.name("Full name"),
        field_BillingEmail: yupFields.email,
        field_BillingAddress: yupFields.name("Address"),
        field_BillingPhone: yupFields.phone,
    });


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
                    initialValues={{
                        field_BillingFullName: billingAddress.fullname,
                        field_BillingEmail: billingAddress.email,
                        field_BillingAddress: billingAddress.address,
                        field_BillingPhone: billingAddress.phone
                    }}
                    enableReinitialize
                    validationSchema={SignupSchema as any}
                    onSubmit={(value) => {
                        console.log("value", value)
                    }}
                >
                    <Form className="d-flex flex-column">
                        <div className="billingAddress">
                            <p>Billing address:</p>
                            <div className="form-wrapper">
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Billing full name </label>
                                    <Field
                                        id="billingFullName"
                                        name="field_BillingFullName"
                                        maxLength={100}
                                    />
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Billing phone </label>
                                    <Field
                                        id="billingPhone"
                                        name="field_BillingPhone"
                                        maxLength={100}
                                    />
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Billing address </label>
                                    <Field
                                        id="billingAddress"
                                        name="field_BillingAddress"
                                        maxLength={100}
                                    />
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Billing email </label>
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
                                    <label className="label-name">Shipping full name </label>
                                    <Field
                                        id="shippingFullName"
                                        name="field_ShippingFullName"
                                        maxLength={100}
                                    />
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Shipping phone </label>
                                    <Field
                                        id="shippingPhone"
                                        name="field_ShippingPhone"
                                        maxLength={100}
                                    />
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Shipping address </label>
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
                                        dispatch(toggleChangeValue({key: 'provinceId', value: e.target.value}));
                                        dispatch(fetchListDistrictData(e.target.value.toString()));
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
                                        dispatch(toggleChangeValue({key: "districtId", value: e.target.value}));
                                        dispatch(fetchListWard(e.target.value.toString()));
                                    }}>
                                        {shippingAddress?.districtId ?
                                            listDistrict
                                                ?.filter((item: any) => Number(item.id) === Number(shippingAddress.districtId))
                                                .map((item: any) => (
                                                <option value={item.id} key={item.id}>
                                                    {item.name}
                                                </option>
                                                )) :
                                            (
                                                <>                                                
                                                    <option value="">- Select province/city -</option>
                                                    {listDistrict && listDistrict.map((item:any) => {
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
                                        dispatch(toggleChangeValue({key: "wardId", value: e.target.value}));
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

                        <button className="btnSubmit" type="submit">Save address</button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default AddressTab;