import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL || "https://websitebook-api.vercel.app";

export const fetchComments = createAsyncThunk("comments/fetchListComments", async () => {
    const res = await axios.get(`${API_URL}/comments`);
    return res.data
});