import "./styles/Home.scss";
import BannerSlide from "./components/BannerSlide/BannerSlide";
import Categories from "./components/Categories/Categories";
import Authormonth from "./components/Authormonth/Authormonth";
import ProductItems from "./components/ProductItems/ProductItems";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store"; // Import AppDispatch
import { useEffect } from "react";
import { fetchProducts } from "../../features/products/productApi";
import Bookselected from "./components/BookSelected/Bookselected";
import Blogsection from "./components/BlogSection/Blogsection";
import {
    useBlogStore,
    useCategoriesStore,
    useProductStore,
} from "../../common/hooks/useCustomHooks";
import { fetchCategories } from "../../features/categories/categoriesApi";
import { fetchBlogs } from "../../features/blog/blogApi";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { listProducts } = useProductStore();
    const { listBlogs } = useBlogStore();
    const { listCategories } = useCategoriesStore();

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
    }, [
        dispatch,
        listProducts.length,
        listCategories.length,
        listBlogs.length,
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
