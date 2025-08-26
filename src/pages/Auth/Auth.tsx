import React from "react";
import { Col, Container, Row } from "react-bootstrap"
import { yupFields } from "../../common/utils/Utils";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import "./style/Auth.scss";


const Auth = () => {
    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";
    const navigate = useNavigate();
    const SignupSchema = Yup.object({
        field_userName: yupFields.name("Username"),
        field_passWord: yupFields.name("Password"),
        field_registerEmail: yupFields.email,
        field_registerUserName: yupFields.name("Username"),
        field_registerPassword: yupFields.name("Password"),
    })
    
    return (
        <>
            <section className="auth">
                <Container>
                    <Row>
                        { isLogin &&  
                        <Col className={`auth-item auth-login d-flex align-items-center justify-content-center`}>
                            <div className="login-wrapper d-flex flex-column align-items-center">
                                <div className="heading">
                                    <p className="mb-0 heading-title">Login</p>
                                    <p className="mb-0 heading-description">Manage your account and see your orders</p>
                                </div>

                                <div className="form d-flex flex-column">
                                    <Formik
                                        enableReinitialize
                                        // initialValues={}
                                        validationSchema={SignupSchema}
                                        onSubmit={() => {}}
                                    >
                                        <Form>
                                            <div className="item-form d-flex align-items-center flex-column">
                                                <label htmlFor="">Username or email address <span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="username"
                                                    name="field_userName"
                                                    maxLength={100}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-center flex-column">
                                                <label htmlFor="">Password <span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="password"
                                                    name="field_passWord"
                                                    maxLength={100}
                                                />
                                            </div>
                                            <div className="remembermeChecked d-flex align-items-center">
                                                <input type="checkbox" name="" id="checkSaveInfo" />
                                                <label htmlFor="checkSaveInfo">Remember me</label>
                                            </div>
                                            <button className="btnSubmit" type="submit">Log in</button>
                                            <button className="createAcc"
                                                onClick={() => navigate("/register")}
                                            >Create an account?</button>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </Col> }
                        { isRegister &&
                        <Col className={`auth-item auth-register d-flex align-items-center justify-content-center`}>
                            <div className="register-wrapper d-flex flex-column align-items-center">
                                <div className="heading">
                                    <p className="mb-0 heading-title">Register</p>
                                    <p className="mb-0 heading-description">Create account to manage your orders</p>
                                </div>
                                <div className="form d-flex flex-column">
                                    <Formik enableReinitialize onSubmit={() => {}}>
                                        <Form>
                                            <div className="item-form d-flex align-items-center flex-column">
                                                <label htmlFor="">Enter your email <span style={{color:"red"}}>*</span></label>
                                                 <Field
                                                    id="email"
                                                    name="field_registerEmail"
                                                    maxLength={100}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-center flex-column">
                                                <label htmlFor="">User name <span style={{color:"red"}}>*</span></label>
                                                 <Field
                                                    id="username"
                                                    name="field_registerUserName"
                                                    maxLength={100}
                                                />
                                            </div>
                                            <div className="item-form d-flex align-items-center flex-column">
                                                <label htmlFor="">Password <span style={{color:"red"}}>*</span></label>
                                                 <Field
                                                    id="password"
                                                    name="field_registerPassword"
                                                    maxLength={100}
                                                />
                                            </div>
                                            <button className="btnSubmit">Register</button>
                                            <div className="backtoLogin d-flex align-items-center">
                                                <RiLogoutBoxLine />
                                                <span>Log in</span>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </Col>
                        }
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Auth