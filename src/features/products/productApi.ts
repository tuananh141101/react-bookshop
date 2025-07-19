import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { typePagination, typeProduct } from "../../common/constant/Constant";
import { RootState } from "../../app/store";

const API_URL = import.meta.env.VITE_API_URL || "https://websitebook-api.vercel.app";
interface FetchProductsResponse {
    data: typeProduct[];
    pagination: typePagination[];
}
export const fetchProducts = createAsyncThunk<
    FetchProductsResponse,
    void,
    {state: RootState}
>(
    "products/fetchListProducts",
    async (_, {getState}) => {
        const { paginationProps, filter } = getState().productStore;
        const { currentPage, limit } = paginationProps;
        const { search, author, cate, sortBy, minPrice, maxPrice } = filter;
        const queryParams = [
            currentPage ? `_page=${currentPage.toString()}` : "",
            limit ? `_limit=${limit.toString()}` : "",
            search ? `search=${search.toString()}` : "",
            author.length > 0 && author ? `author=${author.toString()}` : "",
            cate.length > 0 && cate ? `category=${cate.toString()}` : "",
            sortBy !== "None" && sortBy ? `sortBy=${sortBy.toString()}` : "",
            minPrice ? `minPrice=${minPrice.toString()}` : "",
            maxPrice ? `maxPrice=${maxPrice.toString()}` : "",
        ].filter(Boolean).join("&");

        const res = await axios.get(`${API_URL}/products?${queryParams.toString()}`);
        return res.data;
    }
);
export const fetchShopCategories = createAsyncThunk("shopCategories/fetchShopCategories", 
    async () => {
        const res = await axios.get(`${API_URL}/shopCategories`);
        return res.data;
    }
);
export const fetchDetailProduct = createAsyncThunk("products/fetchDetailProduct", async (idProduct: number) => {
    const res = await axios.get(`${API_URL}/products/${idProduct}`);
    return res.data;
});
export const fetchFeatCategories = createAsyncThunk("featCategories/fetchFeatCategories", async () => {
    const res = await axios.get(`${API_URL}/featCategories`);
    return res.data;
});
export const fetchListAuthors = createAsyncThunk("listAuthors/featListAuthors", async() => {
    const res = await axios.get(`${API_URL}/listAuthors`);
    return res.data;
})