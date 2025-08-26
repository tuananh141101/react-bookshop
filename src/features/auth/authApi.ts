import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const API_URL = import.meta.env.VITE_API_URL || "https://websitebook-api.vercel.app";

export const fetchLogin = createAsyncThunk("auth/login", async () => {})

export const fetchRegister = createAsyncThunk("auth/register" , async () => {})


