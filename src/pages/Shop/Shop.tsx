import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useFilterStore, useProductStore } from "../../common/hooks/useCustomHooks";
import "./styles/Shop.scss";
import FilterProduct from "./components/FilterProduct/FilterProduct";
import ListProduct from "./components/ListProduct/ListProduct";
import { fetchShopCategories, fetchListAuthors, fetchProducts } from "../../features/products/productApi";
import { changeLimitNum, setPage } from "../../features/products/productSlice";
import { useLocation } from "react-router-dom";
import { cateChecked } from "../../features/filter/filterSlice";

const Shop = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation()
    const { categories, listAuthor, paginationProps } = useProductStore();
    const { cate, author, search } = useFilterStore();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pageParams = searchParams.get("page");
        const cateParams = searchParams.get("category");
        const page = pageParams 
            ? parseInt(pageParams) > 1
                ? parseInt(pageParams)
                : 1
            : 1;
        dispatch(setPage(page || 1));
        if (cateParams) {
            const cateArray = cateParams.split(",").filter(Boolean);
            const isDifferent =
                cateArray.length !== cate.length ||
                cateArray.some(c => !cate.includes(c));
            if (isDifferent) {
                dispatch(cateChecked(cateParams));
            }
        };

        dispatch(fetchProducts())
    },[location.search, dispatch])

    useEffect(() => {
        if (!categories.length) {
            dispatch(fetchShopCategories())
        }
        if (!listAuthor.length) {
            dispatch(fetchListAuthors())
        }
        if  (paginationProps.limit !==  10) {
            dispatch(changeLimitNum(10));
        }
    }, []);
   
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