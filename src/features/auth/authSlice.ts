import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { fetchLogin } from "./authApi";

interface AuthSlice {
    id: number | null,
    email: string,
    username: string,
    password: string,
    wishlist: unknown[],
    cart: unknown[],
    loadingAuth: boolean
}

const initialState: AuthSlice = {
    id: null, 
    email: "",
    username: "",
    password: "",
    wishlist: [],
    cart: [],
    loadingAuth: false
}

const authSLice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearEmailPass: (state) => {
            state.email = "";
            state.password = "";
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchLogin.pending, (state) => {
                state.loadingAuth = true
            })
            .addCase(fetchLogin.fulfilled, (state,action) => {
                state.loadingAuth = false;
                console.log("check actionpayload login",action.payload)
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.loadingAuth = true
            })
    }
})


export const {clearEmailPass} = authSLice.actions;
export default authSLice.reducer;