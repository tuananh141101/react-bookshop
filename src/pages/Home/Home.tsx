import "./styles/Home.scss";
import BannerSlide from "./components/BannerSlide/BannerSlide";
import Categories from "./components/Categories/Categories";
import Authormonth from "./components/Authormonth/Authormonth";
import ProductItems from "./components/ProductItems/ProductItems";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store"; // Import AppDispatch
import { useEffect } from "react";
import { fetchProducts } from "../../features/products/productApi";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const getProducts = useSelector(
        (state: RootState) => state.productStore.listProducts
    );

    useEffect(() => {
        if (getProducts.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, getProducts]);

    return (
        <>
            <BannerSlide />
            <Categories />
            <Authormonth />
            <ProductItems />
        </>
    );
};

export default Home;
