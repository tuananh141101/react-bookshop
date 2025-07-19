import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useProductStore } from "../../common/hooks/useCustomHooks";
import "./styles/Shop.scss";
import FilterProduct from "./components/FilterProduct/FilterProduct";
import ListProduct from "./components/ListProduct/ListProduct";
import { fetchProducts, fetchShopCategories, fetchListAuthors } from "../../features/products/productApi";

const Shop = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { listProducts, categories, listAuthor } = useProductStore();

    useEffect(() => {
        if (!categories.length) {
            dispatch(fetchShopCategories())
        }
        if (!listAuthor.length) {
            dispatch(fetchListAuthors())
        }
    }, []);

    useEffect(() => {
        if (!listProducts.length) {
            dispatch(fetchProducts())
        }
    },[dispatch, listProducts.length]);

    return (
        <>
            <section className="shop">
                <Container>
                    <Row>
                        <Col>
                            <p className="mb-0">Shop</p>
                            {/* <span>Showing 1-12 of {listProducts.length > 0 ? () : ()} results</span> */}
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col className="custom-col side-bar" lg={3}>
                            <FilterProduct />
                        </Col>
                        <Col className="custom-col side-main" lg={9}>
                            <ListProduct />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Shop;