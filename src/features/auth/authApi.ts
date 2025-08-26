import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL || "https://websitebook-api.vercel.app";

export const fetchLogin = createAsyncThunk("auth/login", async (body: { email: string; password: string }) => {
    const res = await axios.post(`${API_URL}/login`, body);
    return res
})

export const fetchRegister = createAsyncThunk("auth/register" , async () => {})


