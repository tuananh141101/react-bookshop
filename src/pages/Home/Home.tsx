import "./styles/Home.scss";
import BannerSlide from "./components/BannerSlide/BannerSlide";
import Categories from "./components/Categories/Categories";
import Authormonth from "./components/Authormonth/Authormonth";
import ProductItems from "./components/ProductItems/ProductItems";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store"; // Import AppDispatch
import { useEffect } from "react";
import { fetchProducts, fetchShopCategories, fetchFeatCategories } from "../../features/products/productApi";
import Bookselected from "./components/BookSelected/Bookselected";
import Blogsection from "./components/BlogSection/Blogsection";
import {
    useBlogStore,
    useProductStore,
} from "../../common/hooks/useCustomHooks";
import { fetchBlogs } from "../../features/blog/blogApi";
import React from "react";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { listProducts, categories } = useProductStore();
    const { listBlogs } = useBlogStore();

    useEffect(() => {
        console.log("runnning outside if home");
        if (!listProducts.length) {
            dispatch(fetchProducts());
            console.log("run product in home")
        }
        if (!listBlogs.length) {
            dispatch(fetchBlogs());
        }
        if (!categories.length) {
            dispatch(fetchShopCategories())
        }
    }, [
        dispatch,
        listProducts.length,
        listBlogs.length,
        categories.length,
    ]);

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
