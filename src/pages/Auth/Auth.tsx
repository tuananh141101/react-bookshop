import React from "react";
import { Col, Container, Row } from "react-bootstrap"
import { yupFields } from "../../common/utils/Utils";
import { RiLogoutBoxLine } from "react-icons/ri";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import "./style/Auth.scss";
import { useAuthStore } from "../../common/hooks/useCustomHooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchLogin, fetchRegister } from "../../features/auth/authApi";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


const Auth = () => {
    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { email,username,password,loadingAuth } = useAuthStore();
    const SignupSchemaLogin = Yup.object({
        field_email: yupFields.email,
        field_passWord: yupFields.password,
    });
    const SignupSchemaRegister = Yup.object({
        field_registerEmail: yupFields.email,
        field_registerUserName: yupFields.name("Username"),
        field_registerPassword: yupFields.password,
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
                                        initialValues={{
                                            field_email: email,
                                            field_passWord: password,
                                        }}
                                        validationSchema={SignupSchemaLogin}
                                        onSubmit={(value: any, { resetForm }: any) => {
                                            dispatch(fetchLogin({
                                                body: { 
                                                email: value.field_email, 
                                                password: value.field_passWord 
                                            }
                                            })).unwrap().then(() => {
                                                navigate("/")
                                                resetForm();
                                            });
                                        }}
                                    >
                                        <Form>
                                            <div className="item-form d-flex align-items-center flex-column">
                                                <label htmlFor="">Email address <span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="email"
                                                    name="field_email"
                                                    maxLength={100}
                                                />
                                                <ErrorMessage component="span" name="field_email" />
                                            </div>
                                            <div className="item-form item-form-pass d-flex align-items-center flex-column">
                                                <label htmlFor="">Password <span style={{color:"red"}}>*</span></label>
                                                <Field
                                                    id="password"
                                                    type="password"
                                                    name="field_passWord"
                                                    maxLength={100}
                                                />
                                                <span className="icon-eye">
                                                    <FaRegEye className="eye-open"/>
                                                    <FaRegEyeSlash className="eye-close"/>
                                                </span>
                                                <ErrorMessage component="span" name="field_passWord" />
                                            </div>
                                            {/* <div className="remembermeChecked d-flex align-items-center">
                                                <input type="checkbox" name="" id="checkSaveInfo" />
                                                <label htmlFor="checkSaveInfo">Remember me</label>
                                            </div> */}
                                            <button className="btnSubmit" 
                                                type="submit"
                                                disabled={loadingAuth}
                                            >{loadingAuth ? "Loading..." : "Login"}</button>
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
                                    <Formik 
                                        enableReinitialize 
                                        validationSchema={SignupSchemaRegister}
                                        onSubmit={(value: any) => {
                                            dispatch(fetchRegister({
                                                email: value.field_registerEmail,
                                                password: value.field_registerPassword,
                                                username: value.field_registerUserName,
                                                role: "user"
                                            }))
                                        }}
                                        initialValues={{
                                            field_registerEmail: email,
                                            field_registerUserName: username,
                                            field_registerPassword: password
                                        }}
                                    >
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
                                            <button className="btnSubmit"
                                                disabled={loadingAuth}
                                            >{loadingAuth ? "Loading..." : "Register"}</button>
                                            <div className="backtoLogin d-flex align-items-center"
                                                onClick={() => navigate("/login")}
                                            >
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