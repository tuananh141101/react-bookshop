import { ErrorMessage, Field, Form, Formik } from "formik"
import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { RiLogoutBoxLine } from "react-icons/ri"
import * as Yup from 'yup';
import { useAuthStore } from "../../../common/hooks/useCustomHooks"
import "../style/ForgetPass.scss"
import { yupFields } from "../../../common/utils/Utils";
import { useNavigate } from "react-router-dom";

const ForgetpassLink = () => {
    const {newPass,confirmNewPass} = useAuthStore();
    const navigate = useNavigate();

    return (
        <>
            <section className="forgetPassWordLink">
                <Container>
                    <Row>
                        <Col className="forgetPassLink-form d-flex align-items-center justify-content-center">
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
                                                    field_newPass: yupFields.password,
                                                    field_confirmNewPass: yupFields.confirmPassword
                                                })
                                            }
                                            onSubmit={(value) => {
                                                console.log("check value", value)
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
                                                <button className="btnSubmit" type="submit">Reset password</button>
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
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ForgetpassLink