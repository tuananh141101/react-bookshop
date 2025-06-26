import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { typeProduct } from "../../common/constant/Constant";
import { RootState } from "../../app/store";

const API_URL = import.meta.env.VITE_API_URL || "https://websitebook-api.vercel.app";
interface FetchProductsResponse {
    data: typeProduct[];
    total: number;
}
export const fetchProducts = createAsyncThunk<
    FetchProductsResponse,
    void,
    {state: RootState}
>(
    "products/fetchListProducts",
    async (_, {getState}) => {
        const { paginationProps } = getState().productStore;
          const {
            page,
            limit,
        } = paginationProps;
        const queryParams = new URLSearchParams();
        queryParams.append('_page', page.toString());
        queryParams.append('_limit', limit.toString());

        const res = await axios.get(`${API_URL}/products?${queryParams.toString()}`);
        return {
            data: res.data,
            total: Number(res.headers['x-total-count'] || 0),
        };
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