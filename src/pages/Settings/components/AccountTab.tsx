import { Field, Form, Formik } from "formik";
import React from "react";
import { useAuthStore } from "../../../common/hooks/useCustomHooks";
import { yupFields } from "../../../common/utils/Utils";
import * as Yup from 'yup';

const AccountTab = () => {
    const { email,username,password,newPass } = useAuthStore();
    const SignUpSchema = Yup.object({
        field_UserName: yupFields.name("user name"),
        field_Email: yupFields.email,
        field_CurrentPass: yupFields.password,
        field_NewPass: yupFields.password,
        field_ConfirmPass: yupFields.confirmPassword
    });

    return (
        <>
            <div className="account-heading">
                <p>My account</p>
                <span>Edit your account details or change your password</span>
            </div>
            <div className="account-form">
                <Formik
                    initialValues={{
                        field_UserName: username,
                        field_Email: email,
                        field_CurrentPass: password,
                        field_NewPass: newPass,
                    }}
                    enableReinitialize
                    validationSchema={SignUpSchema}
                    onSubmit={(value) => {
                        console.log("check", value);
                    }}
                >
                    <Form className="d-flex flex-column">
                        <div className="item-form d-flex align-items-left flex-column">
                            <label className="label-name">User name</label>
                            <Field
                                id="username"
                                name="field_UserName"
                                maxLength={200}
                            />
                        </div>
                        <div className="item-form d-flex align-items-left flex-column">
                            <label className="label-name">Email</label>
                            <Field
                                id="email"
                                name="field_Email"
                                maxLength={200}
                            />
                        </div>
                        <div className="password-wrapper">
                            <p className="heading">Password change</p>
                            <div className="item-form d-flex align-items-left flex-column">
                                <label className="label-name">Current password (leave blank to leave unchanged)</label>
                                <Field
                                    name="field_CurrentPass"
                                    maxLength={200}
                                />
                            </div>
                            <div className="item-form d-flex align-items-left flex-column">
                                <label className="label-name">New password (leave blank to leave unchanged)</label>
                                <Field
                                    name="field_NewPass"
                                    maxLength={200}
                                />
                            </div>
                            <div className="item-form d-flex align-items-left flex-column">
                                <label className="label-name">Confirm new password</label>
                                <Field
                                    name="field_ConfirmPass"
                                    maxLength={200}
                                />
                            </div>
                        </div>
                        <button type="submit">
                            Save changes
                        </button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default AccountTab;