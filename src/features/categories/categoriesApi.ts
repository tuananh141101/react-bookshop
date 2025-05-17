import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL || "https://websitebook-api.vercel.app";

export const fetchCategories = createAsyncThunk(
    "categories/fetchListcategories",
    async () => {
        const res = await axios.get(`${API_URL}/featCategories`);
        return res.data;
    }
);

export const fetchListAllCategories = createAsyncThunk("listCategories/fetchListCategories", async () => {
    const res = await axios.get(`${API_URL}/shopCategories`);
    return res.data;
})
