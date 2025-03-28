import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDetailProduct, fetchProducts } from "./productApi";
import { typeProduct } from "../../common/constant/Constant";

interface ProductState {
    listProducts: typeProduct[];
    listProductsBestSelling: typeProduct[];
    listProductsLatest: typeProduct[];
    listProductsSale: typeProduct[];
    detailProducts: typeProduct[];
    activeElem: number;
    loadingData: boolean;
    loadingDetailData: boolean;
    error: string | null;
    errorDetail: string | null;
    quantityProduct: number;
}

const initialState: ProductState = {
    listProducts: [],
    listProductsBestSelling: [],
    listProductsLatest: [],
    listProductsSale: [],
    detailProducts: [],
    loadingData: false,
    loadingDetailData: false,
    error: null,
    errorDetail: null,
    quantityProduct: 1,
    activeElem: 0,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<typeProduct[]>) => {
            state.listProducts = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loadingData = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        incrementQuantityProduct: (state) => {
            state.quantityProduct = state.quantityProduct + 1;
        },
        decrementQuantityProduct: (state) => {
            state.quantityProduct = state.quantityProduct - 1;
        },
        setActiveElem: (state,action: PayloadAction<number>) => {
            state.activeElem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loadingData = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loadingData = false;
                state.listProducts = action.payload;
                state.listProductsBestSelling = action.payload.slice(0, 8);
                state.listProductsLatest = action.payload.slice(9, 17);
                state.listProductsSale = action.payload.slice(16, 24);
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loadingData = false;
                state.error = "Something went wrong!";
            });
        builder
            .addCase(fetchDetailProduct.pending, (state) => {
                state.loadingDetailData = true;
            })
            .addCase(fetchDetailProduct.fulfilled, (state, action) => {
                state.loadingDetailData = false;
                state.detailProducts = action.payload;
            })
            .addCase(fetchDetailProduct.rejected, (state) => {
                state.loadingDetailData = false;
                state.errorDetail = null;
            })
        
    },
});

export const {
    setProducts,
    setLoading,
    setError,
    incrementQuantityProduct,
    decrementQuantityProduct,
    setActiveElem
} = productSlice.actions;
export default productSlice.reducer;
