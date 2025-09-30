import { Field, Formik, Form, ErrorMessage } from "formik";
import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useAuthStore } from "../../../common/hooks/useCustomHooks";
import * as Yup from 'yup';
import { yupFields } from "../../../common/utils/Utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import "../style/ForgetPass.scss";
import { fetchForgetEmail } from "../../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { toastUtils } from "../../../common/utils/Toastutils";
import { toggleChangeValue } from "../../../features/checkout/checkoutSlice";

const ForgetPass = () => {
    const isForgetPassForm = location.pathname === "/forget-password";
    const isForgetPassSent =  location.pathname === "/forget-password/check-mail";
    const [searchParams] = useSearchParams();
    const mailParam = searchParams.get("mail");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const {email, loadingSentResetPassLink} = useAuthStore();

    return (
        <>
            <section className="forgetPassWord">
                <Container>
                    <Row>
                        {isForgetPassForm && (
                            <Col className="forgetPass-form d-flex align-items-center justify-content-center">
                                <div className="forgetPass-form-wrapper d-flex flex-column align-items-center">
                                    <div className="heading">
                                        <p className="heading-title">Forget Password</p>
                                        <p className="mb-0 heading-description">No worries, we'll sent you reset instruction</p>
                                    </div>

                                    <div className="form d-flex flex-column">
                                        <div className="item-form d-flex align-items-center flex-column">
                                            <Formik
                                                enableReinitialize
                                                initialValues={{
                                                    field_email: email
                                                }}
                                                validationSchema={
                                                    Yup.object({
                                                        field_email: yupFields.email
                                                    })
                                                }
                                                onSubmit={(value) => {
                                                    dispatch(toggleChangeValue({
                                                        key: email,
                                                        value: value.field_email
                                                    }))
                                                    dispatch(fetchForgetEmail(value.field_email))
                                                        .unwrap()
                                                        .then((res) => {
                                                            if (res.valid === true) {
                                                                navigate({
                                                                    pathname: "/forget-password/check-mail",
                                                                    search: `?mail=${value.field_email}`
                                                                })
                                                            }
                                                            toastUtils.success("If the email exist, a reset link has been sent")
                                                        })
                                                        .catch((err: any) => {
                                                            console.error("err", err)
                                                        })
z                                                }}
                                            >
                                                <Form>
                                                    <div className="item-form d-flex align-items-center flex-column">
                                                        <label htmlFor="field_email">Email</label>
                                                        <Field
                                                            id="email"
                                                            name="field_email"
                                                            maxLength={100}
                                                            placeholder="Enter your email"
                                                        />
                                                        <ErrorMessage
                                                            name="field_email"
                                                            render={msg => (
                                                                <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>
                                                            )}
                                                        />
                                                    </div>
                                                    <button className="btnSubmitEmail" type="submit" disabled={loadingSentResetPassLink}>
                                                        {loadingSentResetPassLink ? "Loading..." : "Reset Password"}
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
                            </Col>
                        )}
                        {isForgetPassSent && (
                            <Col className="forgetPass-sent d-flex align-items-center justify-content-center">
                                <div className="forgetPass-sent-wrapper d-flex flex-column align-items-center">
                                    <div className="heading">
                                        <p className="heading-title">Check your email</p>
                                        <p className="mb-0 heading-description">
                                            We sent a password reset link to
                                            <br/> 
                                            {mailParam}
                                        </p>
                                    </div>

                                    <div className="form d-flex flex-column">
                                        <button className="btnCheckEmail" 
                                            onClick={() => window.open("https://mail.google.com", "_blank", "noopener")}
                                        >Open email app</button>
                                        <div className="resentLink d-flex align-items-center justify-content-center">
                                            <p className="mb-0">Did't receiver the email?</p><span
                                                onClick={() => {
                                                    if (mailParam) {
                                                        dispatch(fetchForgetEmail(mailParam))
                                                        .unwrap()
                                                        .then((res) => {
                                                            if (res.valid === true) toastUtils.success("If the email exist, a reset link has been sent")
                                                        })
                                                        .catch((err: any) => {
                                                            console.error("err", err)
                                                        })
                                                    }
                                                }}
                                            >Click to resent</span>
                                        </div>
                                        <div className="backToLogin d-flex align-items-center justify-content-center">
                                            <RiLogoutBoxLine />
                                            <p className="mb-0"
                                                onClick={() => {
                                                    navigate("/forget-password");
                                                }}
                                            >Back</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ForgetPass