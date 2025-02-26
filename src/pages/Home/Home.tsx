import "./styles/Home.scss";
import BannerSlide from "./components/BannerSlide/BannerSlide";
import Categories from "./components/Categories/Categories";
import Authormonth from "./components/Authormonth/Authormonth";
import ProductItems from "./components/ProductItems/ProductItems";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store"; // Import AppDispatch
import { useEffect } from "react";
import { fetchProducts } from "../../features/products/productApi";
import Bookselected from "./components/BookSelected/Bookselected";
import Blogsection from "./components/BlogSection/Blogsection";
import {
    useBlogStore,
    useCategoriesStore,
    useCommentStore,
    useProductStore,
} from "../../common/hooks/useCustomHooks";
import { fetchCategories } from "../../features/categories/categoriesApi";
import { fetchBlogs } from "../../features/blog/blogApi";
import { fetchComments } from "../../features/comments/commentApi";
import React from "react";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { listProducts } = useProductStore();
    const { listBlogs } = useBlogStore();
    const { listCategories } = useCategoriesStore();
    const { listComments } = useCommentStore();

    useEffect(() => {
        if (!listProducts.length) {
            dispatch(fetchProducts());
        }
        if (!listCategories.length) {
            dispatch(fetchCategories());
        }
        if (!listBlogs.length) {
            dispatch(fetchBlogs());
        }
        if (!listComments.length) {
            dispatch(fetchComments());
        }
    }, [
        dispatch,
        listProducts.length,
        listCategories.length,
        listBlogs.length,
        listComments.length
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
