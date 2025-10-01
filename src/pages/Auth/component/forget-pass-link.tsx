import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { RiLogoutBoxLine } from "react-icons/ri"
import * as Yup from 'yup';
import { useAuthStore } from "../../../common/hooks/useCustomHooks"
import "../style/ForgetPass.scss"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { fetchResetPassWord, fetchVerifyResetToken } from "../../../features/auth/authApi";
import Skeleton from "react-loading-skeleton";
import { toastUtils } from "../../../common/utils/Toastutils";

const ForgetpassLink = () => {
    const {newPass,confirmNewPass} = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { isResetToken, loadingResetPass } = useAuthStore();
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token");
    console.log("loadingResetPass", loadingResetPass)


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tokenParams = searchParams.get("token") ?? "";
        dispatch(fetchVerifyResetToken(tokenParams))
    },[location.search, dispatch]);

    return (
        <>
            <section className="forgetPassWordLink">
                <Container>
                    <Row>
                        <Col className="forgetPassLink-form d-flex align-items-center justify-content-center">
                            {isResetToken === null ? (
                                <div className="forgetPassLink-form-loading d-flex flex-column align-items-center">
                                    <div className="heading-loading">
                                        <Skeleton className="heading-title"/>
                                        <Skeleton className="heading-description"/>
                                    </div>
                                    <div className="form-loading d-flex align-items-center flex-column">
                                        <Skeleton className="loading-skeleton"/>
                                    </div>
                                </div>
                            ) : isResetToken === "Invalid token" || isResetToken === "Token expired" || isResetToken === "" ? (
                                <div className="resetLinkInvalid d-flex flex-column align-items-center">
                                    <p>This link is invalid or has expired.</p>
                                    <button onClick={() => navigate("/forget-password")}>Request new password link</button>
                                </div>
                            ) : isResetToken === "Valid token" ? (
                                <div className="forgetPassLink-form-wrapper d-flex flex-column align-items-center">
                                    <div className="heading">
                                        <p className="heading-title">Set new password</p>
                                        <p className="mb-0 heading-description">Your new password mush be different to previously used password.</p>
                                    </div>

                                    <div className="form d-flex flex-column">
                                        <div className="item-form d-flex align-items-center flex-column">
                                            <Formik
                                                enableReinitialize
                                                initialValues={{
                                                    field_newPass: newPass,
                                                    field_confirmNewPass: confirmNewPass 
                                                }}
                                                validationSchema={
                                                    Yup.object({
                                                        field_newPass: Yup.string()
                                                            .min(5, 'Password must be at least 5 characters')
                                                            .required('Password is required'),
                                                        field_confirmNewPass: Yup.string()
                                                            .oneOf([Yup.ref('field_newPass')], 'Passwords must match')
                                                            .required('Confirm Password is required'),
                                                    })
                                                }
                                                onSubmit={(value) => {
                                                    dispatch(fetchResetPassWord({
                                                        newPassword: value.field_confirmNewPass,
                                                        token: tokenParam ?? ""
                                                    }))
                                                    .unwrap()
                                                    .then((res:any) => {
                                                        console.log("check res", res)
                                                        // if (res.valid === true) {}
                                                        toastUtils.success("Password reset successfully")
                                                    })
                                                    .catch((err:any) => {console.error("Err", err)})
                                                }}
                                            >
                                                <Form>
                                                    <div className="item-form d-flex align-items-center flex-column">
                                                        <label htmlFor="field_newPass">Password</label>
                                                        <Field
                                                            id="email"
                                                            name="field_newPass"
                                                            maxLength={100}
                                                        />
                                                        <ErrorMessage
                                                            name="field_newPass"
                                                            render={msg => (
                                                                <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="item-form d-flex align-items-center flex-column">
                                                        <label htmlFor="field_confirmNewPass">Confirm password</label>
                                                        <Field
                                                            id="email"
                                                            name="field_confirmNewPass"
                                                            maxLength={100}
                                                        />
                                                        <ErrorMessage
                                                            name="field_confirmNewPass"
                                                            render={msg => (
                                                                <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>
                                                            )}
                                                        />
                                                    </div>
                                                    <button className="btnSubmit" type="submit" disabled={loadingResetPass}>
                                                        {loadingResetPass ? "Loading..." : "Reset password"}
                                                    </button>
                                                    <div className="backToLogin d-flex align-items-center justify-content-center" onClick={() => navigate("/login")}>
                                                        <RiLogoutBoxLine />
                                                        <p className="mb-0">Back to login</p>
                                                    </div>
                                                </Form>
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            ) : ""}
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ForgetpassLink