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
