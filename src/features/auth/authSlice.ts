import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface AuthSlice {
    id: number | null,
    email: string,
    username: string,
    password: string,
    wishlist: unknown[],
    cart: unknown[]
}

const initialState: AuthSlice = {
    id: null, 
    email: "",
    username: "",
    password: "",
    wishlist: [],
    cart: []
}

const authSLice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
})


export default authSLice.reducer;