import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useProductStore } from "../../common/hooks/useCustomHooks";
import "./styles/Shop.scss";
import FilterProduct from "./components/FilterProduct/FilterProduct";
import ListProduct from "./components/ListProduct/ListProduct";
import { fetchProducts, fetchShopCategories, fetchFeatCategories } from "../../features/products/productApi";

const Shop = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {listProducts, categories, featCategories} = useProductStore();
   
    useEffect(() => {
        console.log("runnning outside if shop");
        if (!categories.length) {
            dispatch(fetchShopCategories())
        }
        if (!listProducts.length) {
            dispatch(fetchProducts())
            console.log("run product in shop")
        }
        if (!featCategories.length) {
            dispatch(fetchFeatCategories())
        }
    }, [
        dispatch, 
        categories.length,
        listProducts.length,
        featCategories.length
    ]);

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