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
    useCategoriesStore,
    useProductStore,
} from "../../common/hooks/useCustomHooks";
import { fetchCategories } from "../../features/categories/categoriesApi";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { listProducts } = useProductStore();
    const { listCategories } = useCategoriesStore();

    useEffect(() => {
        if (!listProducts.length) {
            dispatch(fetchProducts());
        }
        if (!listCategories.length) {
            dispatch(fetchCategories());
        }
    }, [dispatch, listProducts, listCategories]);

    return (
        <>
            <BannerSlide />
            <Categories />
            <Authormonth />
            <ProductItems />
            <Bookselected />
            <Blogsection />
        </>
    );
};

export default Home;
