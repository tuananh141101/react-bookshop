import React from "react";
import { Col, Container, Nav, Row, Tab  } from "react-bootstrap";
import { LuMapPin } from "react-icons/lu";
import { LuCircleUser } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";

import "./style/Settings.scss"; 

const Settings = () => {
    return (
        <section className="settings">
            <Container>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
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
                                <Tab.Pane eventKey="first" className="account">First tab content</Tab.Pane>
                                <Tab.Pane eventKey="second" className="address">Second tab content</Tab.Pane>
                                <Tab.Pane eventKey="third" className="logout">Third tab content</Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </section>
    );
}

export default Settings;