import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://websitebook-api.vercel.app/products";

export const fetchProducts = createAsyncThunk(
    "products/fetchListProducts",
    async () => {
        const res = await axios.get(API_URL);
        return res.data;
    }
);

export const fetchDetailProduct = createAsyncThunk("products/fetchDetailProduct", async (idProduct: number) => {
    const res = await axios.get(`${API_URL}/${idProduct}`);
    return res.data;
})