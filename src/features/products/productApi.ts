import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL || "https://websitebook-api.vercel.app";
interface FetchProductsParams {
    page?: number;
    limit?: number;
    search?: string;
    categories?: string[];
    yearpublished?: number;
}
export const fetchProducts = createAsyncThunk(
    "products/fetchListProducts",
    async () => {
        const res = await axios.get(`${API_URL}/products`);
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
})