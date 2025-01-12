import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productTypes";
import { fetchProducts } from "./productApi";

interface ProductState {
    listProducts: Product[];
    listProductsBestSelling: Product[];
    listProductsLatest: Product[];
    listProductsSale: Product[];
    loadingData: boolean;
    error: string | null;
    quantityProduct: number;
}

const initialState: ProductState = {
    listProducts: [],
    listProductsBestSelling: [],
    listProductsLatest: [],
    listProductsSale: [],
    loadingData: false,
    error: null,
    quantityProduct: 1,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
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
    },
});

export const {
    setProducts,
    setLoading,
    setError,
    incrementQuantityProduct,
    decrementQuantityProduct,
} = productSlice.actions;
export default productSlice.reducer;
