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
import { authorChecked, cateChecked, changePrice, changeSearch } from "../../features/filter/filterSlice";
import StorageService from "../../common/utils/storageService";

const Shop = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation()
    const { categories, listAuthor, paginationProps } = useProductStore();
    const { cate, author } = useFilterStore();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pageParams = searchParams.get("page");
        const cateParams = searchParams.get("category");
        const authorParams = searchParams.get("author");
        const keyParams = searchParams.get("search");
        const minPriceParams = searchParams.get("minPrice");
        const maxPriceParams = searchParams.get("maxPrice");
        const page = pageParams 
            ? parseInt(pageParams) > 1
                ? parseInt(pageParams)
                : 1
            : 1;
        dispatch(setPage(page || 1));
        if (keyParams) dispatch(changeSearch(keyParams.toString()));
        if (minPriceParams) dispatch(changePrice({key: 'minPrice', value: Number(minPriceParams)}))
        if (maxPriceParams) dispatch(changePrice({key: 'maxPrice', value: Number(maxPriceParams)}))
        if (cateParams) {
            const cateArray = cateParams.split(",").filter(Boolean);
            const isDifferent =
                cateArray.length !== cate.length ||
                cateArray.some(c => !cate.includes(c));
            if (isDifferent) dispatch(cateChecked(cateParams));
        };
        if (authorParams) {
            const authorArray = authorParams.split(",").filter(Boolean);
            const isDifferent = authorParams.length !== authorArray.length || authorArray.some(c => !author.includes(c)); 
            if (isDifferent) dispatch(authorChecked(authorParams))
        }

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

    const dataLocal = StorageService.getArrayFromLS("persist:root");
    const dataCartParse =  JSON.parse(dataLocal.cartStore);

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