import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { useAuthStore } from "../../../common/hooks/useCustomHooks";
import { toggleChangeValue } from "../../../features/auth/authSlice";
import { fetchChangeAddress, fetchListDistrictData, fetchListWard } from "../../../features/auth/authApi";
import { toastUtils } from "../../../common/utils/Toastutils";

const AddressTab = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { shippingAddress,listProvice, listDistrict, billingAddress, listWard, provinceId, districtId, wardId } = useAuthStore();
    const SignupSchema = Yup.object({
        // field_BillingFullName: yupFields.name("Billing fullname"),
        // field_BillingEmail: yupFields.email,
        // field_BillingAddress: yupFields.name("Billing address"),
        // field_BillingPhone: yupFields.phone,
        // field_ShippingFullName: yupFields.name("Shipping fullname"),
        // field_ShippingPhone: yupFields.phone,
        // field_ShippingAddress: yupFields.name("Shipping address")
    });

    useEffect(() => {
        if (shippingAddress.proviceId) dispatch(fetchListDistrictData(shippingAddress.proviceId));
    }, [dispatch, shippingAddress.proviceId]);
    useEffect(() => {
        if (shippingAddress.districtId) dispatch(fetchListWard(shippingAddress.districtId));
    }, [dispatch, shippingAddress.districtId]);


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
                        field_BillingFullName: billingAddress?.fullname,
                        field_BillingEmail: billingAddress?.email,
                        field_BillingAddress: billingAddress?.address,
                        field_BillingPhone: billingAddress?.phone,
                        field_ShippingFullName: shippingAddress?.fullname,
                        field_ShippingPhone: shippingAddress?.phone,
                        field_ShippingAddress: shippingAddress?.address,
                    }}
                    enableReinitialize
                    validationSchema={SignupSchema}
                    onSubmit={(values, {setSubmitting }) => {
                        console.log("values", values);
                        dispatch(fetchChangeAddress({
                            billingAddress: {
                                type: "billing",
                                fullname: values.field_BillingFullName,
                                address: values.field_BillingAddress,
                                phone: values.field_BillingPhone,
                                email: values.field_BillingEmail
                            },
                            shippingAddress: {
                                type: "shipping",
                                fullname: values.field_ShippingFullName,
                                address: values.field_ShippingAddress,
                                phone: values.field_ShippingPhone,
                                proviceId: provinceId,
                                districtId: districtId,
                                wardId: wardId
                            }
                        }))
                        setSubmitting(false);
                    }}
                >
                    {() => (
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
                                    <ErrorMessage component="span" name="field_BillingFullName" />
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Billing phone </label>
                                    <Field
                                        id="billingPhone"
                                        name="field_BillingPhone"
                                        maxLength={100}
                                    />
                                    <ErrorMessage component="span" name="field_BillingPhone" />
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Billing address </label>
                                    <Field
                                        id="billingAddress"
                                        name="field_BillingAddress"
                                        maxLength={100}
                                    />
                                    <ErrorMessage component="span" name="field_BillingAddress" />
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Billing email </label>
                                    <Field
                                        id="billingEmail"
                                        name="field_BillingEmail"
                                        maxLength={100}
                                    />
                                    <ErrorMessage component="span" name="field_BillingEmail" />
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
                                    <ErrorMessage component="span" name="field_ShippingFullName" />
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Shipping phone </label>
                                    <Field
                                        id="shippingPhone"
                                        name="field_ShippingPhone"
                                        maxLength={100}
                                    />
                                    <ErrorMessage component="span" name="field_ShippingPhone" />
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-name">Shipping address </label>
                                    <Field
                                        id="shippingAddress"
                                        name="field_ShippingAddress"
                                        maxLength={100}
                                    />
                                    <ErrorMessage component="span" name="field_ShippingAddress" />
                                </div>
                            </div>
                            <div className="farm-wrapper farm-wrapper-2">
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-province">Province</label>
                                    <select name="province" 
                                        onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                            dispatch(toggleChangeValue({key: 'provinceId', value: e.target.value}));
                                            dispatch(fetchListDistrictData(e.target.value.toString()));
                                        }}
                                        value={shippingAddress.proviceId || provinceId}
                                    >
                                        <option value="">- Select province/city -</option>
                                        {listProvice &&
                                            listProvice.map((item: any) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-district">District</label>
                                    <select name="district" 
                                        onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                            dispatch(toggleChangeValue({key: "districtId", value: e.target.value}));
                                            dispatch(fetchListWard(e.target.value.toString()));
                                        }}
                                        value={shippingAddress.districtId || districtId}
                                    >
                                        <option value="">- Select district -</option>
                                        {listDistrict &&
                                            listDistrict.map((item:any) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="item-form d-flex align-items-left flex-column">
                                    <label className="label-ward">Ward</label>
                                    <select name="ward" 
                                        onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                                            dispatch(toggleChangeValue({key: "wardId", value: e.target.value}));
                                        }}
                                        value={shippingAddress.wardId || wardId}
                                    >
                                        <option value="">- Select ward -</option>
                                        {listWard &&
                                            listWard.map((item:any) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                        </div>
                        <button className="btnSubmit" type="submit">Save address</button>
                    </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default AddressTab;