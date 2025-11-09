/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice,Draft,PayloadAction } from "@reduxjs/toolkit";
import { 
    fetchChangeAddress, fetchForgetEmail, 
    fetchGetDataUser, fetchListDistrictData, 
    fetchListProvinceData, fetchListWard, 
    fetchLogin, fetchRegister, 
    fetchResetPassWord,fetchSession,fetchVerifyResetToken 
} from "./authApi";
import { toastUtils } from "../../common/utils/Toastutils";
import StorageService from "../../common/utils/storageService";
import Cookies from "js-cookie";

interface AuthState {
    id: string | null,
    email: string,
    username: string,
    password: string,
    loadingAuth: boolean,
    loadingGetData: boolean,
    loadingDataProvince: boolean,
    loadingChangeAddress: boolean,
    loadingVerifyResetTk: boolean,
    loadingSentResetPassLink: boolean,
    isResetToken: "Token expired" | "Invalid token" | "Valid token" | null | "",
    loadingUIForgetLink: boolean,
    loadingResetPass: boolean,
    loadingSetSession: boolean,
    newPass: string,
    confirmNewPass: string,
    provinceId: string,
    districtId: string,
    wardId: string,
    shippingAddress: {
        type: string,
        fullname: string,
        address: string,
        phone: string,
        email: string,
        proviceId: string,
        districtId: string,
        wardId: string
    },
    billingAddress: {
        type: string,
        fullname: string,
        address: string,
        phone: string,
        email:string
    },
    listProvice: unknown[]
    listDistrict: unknown[],
    listWard: unknown[],
}

const initialState: AuthState = {
    id: null, 
    email: "",
    username: "",
    password: "",
    loadingAuth: false,
    loadingGetData: false,
    loadingDataProvince: false,
    loadingChangeAddress: false,
    loadingVerifyResetTk: false,
    loadingSentResetPassLink: false,
    loadingUIForgetLink: false,
    loadingResetPass: false,
    loadingSetSession: false,
    isResetToken: "Valid token",
    newPass: "",
    confirmNewPass: "",
    provinceId: "",
    districtId: "",
    wardId: "",
    shippingAddress: {
        type: "shipping",
        fullname: "",
        address: "",
        phone: "",
        email: "",
        proviceId: "",
        districtId: "",
        wardId: ""
    },
    billingAddress: {
        type:"billing",
        fullname: "",
        address: "",
        phone: "",
        email: "",
    },
    listProvice: [],
    listDistrict: [],
    listWard: []
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
        },
        getUserData: (state,action) => {
            state.listProvice = action.payload;
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
            .addCase(fetchRegister.fulfilled, (state) => {
                state.loadingAuth = false;
                toastUtils.success(`Confirmation link has been sent to your email`);
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
                state.id = action.payload?.data.id;
                state.loadingGetData = false;
                state.email = action.payload?.data.email;
                state.username = action.payload?.data.username;
                state.billingAddress = action.payload?.data.billingAddress;
                state.shippingAddress = action.payload?.data.shippingAddress;
            })
            .addCase(fetchGetDataUser.rejected, (state) => {
                state.loadingGetData = true;
            })
        builder
            .addCase(fetchChangeAddress.pending, (state) => {state.loadingChangeAddress = true})
            .addCase(fetchChangeAddress.fulfilled, (state) => {
                state.loadingChangeAddress = false;
                toastUtils.success("Update seccess!");
            })
        builder
            .addCase(fetchListProvinceData.pending, (state) => {
                state.loadingDataProvince = true
            })
            .addCase(fetchListProvinceData.fulfilled, (state,action) => {
                state.loadingDataProvince = false;
                state.listProvice = action.payload.data;
            })
            .addCase(fetchListProvinceData.rejected, (state) => {
                state.loadingDataProvince = true;
            })
        builder
            .addCase(fetchListDistrictData.pending, (state) => {
                state.loadingGetData = true;
            })
            .addCase(fetchListDistrictData.fulfilled, (state,action) => {
                state.loadingGetData = false;
                state.listDistrict = action.payload.data;
            })
            .addCase(fetchListDistrictData.rejected, (state) => {
                state.loadingGetData = true;
            })
        builder
            .addCase(fetchListWard.pending, (state) => {
                state.loadingGetData = true;
            })
            .addCase(fetchListWard.fulfilled, (state,action) => {
                state.loadingGetData = false;
                state.listWard = action.payload.data;
            })
            .addCase(fetchListWard.rejected, (state) => {
                state.loadingGetData = true;
            })
        builder
            .addCase(fetchVerifyResetToken.pending, (state) => {
                state.loadingVerifyResetTk = true
            })
            .addCase(fetchVerifyResetToken.fulfilled, (state,action) => {
                state.loadingVerifyResetTk = false;
                if (action.payload.message === "Token expired") {
                    state.isResetToken = "Token expired"
                } else if (action.payload.message === "Invalid token") {
                    state.isResetToken = "Invalid token"
                } else if (action.payload.valid === true) {
                    state.isResetToken = "Valid token"
                } else if (Object.keys(action.payload).length > 0) {
                    state.isResetToken = "";
                } 
            })
            .addCase(fetchVerifyResetToken.rejected, (state) => {state.loadingVerifyResetTk = false})
        builder 
            .addCase(fetchForgetEmail.pending, (state) => {state.loadingSentResetPassLink = true})
            .addCase(fetchForgetEmail.fulfilled, (state) => {
                state.loadingSentResetPassLink = false
            })
            .addCase(fetchForgetEmail.rejected, (state) => {state.loadingSentResetPassLink = false})
        builder
            .addCase(fetchResetPassWord.pending, (state) => {state.loadingResetPass = true})
            .addCase(fetchResetPassWord.fulfilled, (state) => {state.loadingResetPass = false})
            .addCase(fetchResetPassWord.rejected, (state) => {state.loadingResetPass = false})
        builder
            .addCase(fetchSession.pending, (state) => {state.loadingSetSession = true})
            .addCase(fetchSession.fulfilled, (state,action) => {
                state.loadingSetSession = false;
            })
            .addCase(fetchSession.rejected, (state) => {state.loadingSetSession = true})
    }
})


export const {clearEmailPass, toggleChangeValue,getUserData} = authSLice.actions;
export default authSLice.reducer;