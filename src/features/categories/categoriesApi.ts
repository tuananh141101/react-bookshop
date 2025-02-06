import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://websitebook-api.vercel.app/categories";

export const fetchCategories = createAsyncThunk(
    "categories/fetchListcategories",
    async () => {
        const res = await axios.get(API_URL);
        return res.data;
    }
);
