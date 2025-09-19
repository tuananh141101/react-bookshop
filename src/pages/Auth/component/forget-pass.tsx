import { Field, Formik, Form, ErrorMessage } from "formik";
import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useAuthStore } from "../../../common/hooks/useCustomHooks";
import * as Yup from 'yup';
import { yupFields } from "../../../common/utils/Utils";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import "../style/ForgetPass.scss";

const ForgetPass = () => {
    const isForgetPassForm = location.pathname === "/forget-password";
    const isForgetPassSent =  location.pathname === "/forget-password/sent";
    const navigate = useNavigate();
    const {email} = useAuthStore();

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
                                                    console.log("value submit",value);
                                                }}
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
                                                    <button className="btnSubmitEmail" type="submit">Reset Password</button>
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
                                            "Your email"
                                        </p>
                                    </div>

                                    <div className="form d-flex flex-column">
                                        <button className="btnCheckEmail" 
                                            onClick={() => window.open("https://mail.google.com", "_blank", "noopener")}
                                        >Open email app</button>
                                        <div className="resentLink d-flex align-items-center justify-content-center">
                                            <p className="mb-0">Did't receiver the email?</p><span>Click to resent</span>
                                        </div>
                                        <div className="backToLogin d-flex align-items-center justify-content-center">
                                            <RiLogoutBoxLine />
                                            <p className="mb-0">Back to login</p>
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