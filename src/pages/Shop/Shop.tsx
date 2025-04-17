import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useProductStore } from "../../common/hooks/useCustomHooks";
import "./styles/Shop.scss";
import FilterProduct from "./components/FilterProduct/FilterProduct";
import ListProduct from "./components/ListProduct/ListProduct";

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
                        <Col className="custom-col side-bar">
                            <FilterProduct />
                        </Col>
                        <Col className="custom-col side-main">
                            <ListProduct />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Shop;