import React, { useEffect } from "react";
import { Col, Container, Nav, Row, Tab  } from "react-bootstrap";
import { LuMapPin } from "react-icons/lu";
import { LuCircleUser } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";

import "./style/Settings.scss"; 
import AccountTab from "./components/AccountTab";
import AddressTab from "./components/AddressTab";
import { useAuthStore } from "../../common/hooks/useCustomHooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchGetDataUser, fetchListProvinceData } from "../../features/auth/authApi";
import { getCookie } from "../../common/utils/Utils";

const Settings = () => {
    const { email,username,listProvice } = useAuthStore();
    const dispatch = useDispatch<AppDispatch>();
    const getNameIdCookie = getCookie("idUser");

    useEffect(() => {dispatch(fetchGetDataUser(getNameIdCookie));},[dispatch, email, username]);
    useEffect(() => {dispatch(fetchListProvinceData());},[])

    return (
        <section className="settings">
            <Container>
                <Tab.Container id="left-tabs-example" defaultActiveKey="second">
                    <Row>
                        <Col className="col-dashboard" sm={12} xl={3}>
                            <Nav variant="pills" className="d-flex flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first" className="d-flex">
                                        <span><LuCircleUser/></span>
                                        Account detail
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second" className="d-flex">
                                        <span><LuMapPin/></span>
                                        Address
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third" className="d-flex">
                                        <span><LuLogOut/></span>
                                        Logout
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>

                        <Col className="col-main" sm={12} xl={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first" className="account">
                                    <AccountTab/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second" className="address">
                                    <AddressTab/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third" className="logout">Logout</Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </section>
    );
}

export default Settings;