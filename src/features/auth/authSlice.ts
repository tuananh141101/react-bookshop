/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice,Draft,PayloadAction } from "@reduxjs/toolkit";
import { fetchLogin, fetchRegister } from "./authApi";
import { toastUtils } from "../../common/utils/Toastutils";

interface AuthState {
    id: number | null,
    email: string,
    username: string,
    password: string,
    loadingAuth: boolean
}

const initialState: AuthState = {
    id: null, 
    email: "",
    username: "",
    password: "",
    loadingAuth: false
}

const authSLice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearEmailPass: (state) => {
            state.email = "";
            state.password = "";
        },
        toggleChangeValue: <K extends keyof AuthState>(
            state: Draft<AuthState>,
            action: PayloadAction<{
                key: keyof AuthState;
                value: AuthState[k]
            }>
        ) => {
            const {key,value} = action.payload;
            (state as any)[key] = value;
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchLogin.pending, (state) => {
                state.loadingAuth = true
            })
            .addCase(fetchLogin.fulfilled, (state,action) => {
                state.loadingAuth = false;
                toastUtils.success(`Login success`);
            })
            .addCase(fetchLogin.rejected, (state,action) => {
                state.loadingAuth = false;
                const actionPayLoad = action.payload as any;
                toastUtils.error(`${actionPayLoad.data}`, "");
            })
        builder
            .addCase(fetchRegister.pending, (state) => {
                state.loadingAuth = true;
            })
            .addCase(fetchRegister.fulfilled, (state,action) => {
                state.loadingAuth = false;
                toastUtils.success(`Login success`);
            })
            .addCase(fetchRegister.rejected, (state,action) => {
                state.loadingAuth = false;
                const actionPayLoad = action.payload as any;
                toastUtils.error(`${actionPayLoad.data}`, "");
            })
    }
})


export const {clearEmailPass, toggleChangeValue} = authSLice.actions;
export default authSLice.reducer;