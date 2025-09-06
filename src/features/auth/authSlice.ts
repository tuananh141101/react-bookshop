/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice,Draft,PayloadAction } from "@reduxjs/toolkit";
import { fetchGetDataUser, fetchLogin, fetchRegister } from "./authApi";
import { toastUtils } from "../../common/utils/Toastutils";
import StorageService from "../../common/utils/storageService";

interface AuthState {
    id: string | null,
    email: string,
    username: string,
    password: string,
    loadingAuth: boolean,
    loadingGetData: boolean,
    newPass: string,
}

const initialState: AuthState = {
    id: null, 
    email: "",
    username: "",
    password: "",
    loadingAuth: false,
    loadingGetData: false,
    newPass: ""
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
                value: AuthState[K]
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
            .addCase(fetchLogin.fulfilled, (state,action ) => {
                state.loadingAuth = false;
                state.username = action.payload.data?.username;
                state.email = action.payload.data?.email;
                StorageService.setToken({nameToken: "idUser" ,token: `${action.payload.data.user.id}`});
                StorageService.setToken({token: `${action.payload.data?.accessToken}`});
                StorageService.setLocalStore(`role`, action.payload.data?.user.role);
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
        builder 
            .addCase(fetchGetDataUser.pending, (state) => {
                state.loadingGetData = true
            })
            .addCase(fetchGetDataUser.fulfilled, (state,action) => {
                state.loadingGetData = false;
                state.email = action.payload?.data.email;
                state.username = action.payload?.data.username;
            })
            .addCase(fetchGetDataUser.rejected, (state) => {
                state.loadingGetData = true;
            })
    }
})


export const {clearEmailPass, toggleChangeValue} = authSLice.actions;
export default authSLice.reducer;