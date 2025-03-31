import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useProductStore } from "../../common/hooks/useCustomHooks";

const Shop = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {listProducts} = useProductStore();


    return (
        <>
            <section className="shop">
                <Container>
                    <Row>
                        <Col>
                            <p className="mb-0">Shop</p>
                            <span>Showing 1-12 of 31 results</span>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col className="custom-col side-bar">side bar</Col>
                        <Col className="custom-col side-main">side main</Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Shop;
