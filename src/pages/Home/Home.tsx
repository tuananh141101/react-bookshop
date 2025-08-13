import "./styles/Home.scss";
import BannerSlide from "./components/BannerSlide/BannerSlide";
import Categories from "./components/Categories/Categories";
import Authormonth from "./components/Authormonth/Authormonth";
import ProductItems from "./components/ProductItems/ProductItems";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store"; // Import AppDispatch
import { useEffect } from "react";
import { fetchFeatCategories, fetchProducts, fetchShopCategories } from "../../features/products/productApi";
import Bookselected from "./components/BookSelected/Bookselected";
import Blogsection from "./components/BlogSection/Blogsection";
import { useBlogStore } from "../../common/hooks/useCustomHooks";
import { fetchBlogs } from "../../features/blog/blogApi";
import React from "react";
import { changeLimitNum } from "../../features/products/productSlice";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    // const { listProducts, categories, featCategories } = useProductStore();
    const { listBlogs } = useBlogStore();

    useEffect(() => {
        dispatch(changeLimitNum(100));
        dispatch(fetchProducts());
        dispatch(fetchBlogs());
        dispatch(fetchShopCategories());
        dispatch(fetchFeatCategories());
    },[dispatch])

    return (
        <>
            <BannerSlide />
            <Categories />
            <Authormonth />
            <ProductItems />
            <Bookselected />
            {listBlogs.length > 0 ? <Blogsection /> : <p>Loading Blogs...</p>}
        </>
    );
};

export default Home;
