import { typeListAuthor } from './../../common/constant/Constant';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { typeCategories, typeListCategories, typeProduct } from "../../common/constant/Constant";
import { fetchDetailProduct, fetchFeatCategories, fetchListAuthors, fetchProducts, fetchShopCategories } from "./productApi";

interface ProductState {
    listProducts: typeProduct[];
    listProductsBestSelling: typeProduct[];
    listProductsLatest: typeProduct[];
    listProductsSale: typeProduct[];
    detailProducts: typeProduct[];
    listAuthor: typeListAuthor[];
    listAuthorNotAllow: string[];
    categories: typeListCategories[];
    featCategories: typeCategories[];
    activeElem: number;
    error: string | null;
    errorDetail: string | null;
    quantityProduct: number;
    paginationProps: {
        currentPage: number;
        limit: number;
        totalItems:number;
        totalPages:number;
    };
    metadata: {
        totalItems: number,
        totalPages: number,
        page: number,
        limit: number,

    }
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    loadingDetailData: boolean;
    loadingData: boolean;
    loadingPreview: boolean;
    openModalSort: boolean;
    loadingShopCategories: boolean;
    loadingFeatCategories: boolean;
}

const initialState: ProductState = {
    listProducts: [],
    listProductsBestSelling: [],
    listProductsLatest: [],
    listProductsSale: [],
    listAuthor: [],
    listAuthorNotAllow: [],
    detailProducts: [],
    quantityProduct: 1,
    activeElem: 0,
    metadata: {
        totalItems: 0,
        totalPages: 0,
        page: 0,
        limit: 0,
    },
    paginationProps: {
        currentPage: 1,
        limit: 10,
        totalItems:0,
        totalPages: 0
    },
    error: null,
    errorDetail: null,
    loadingDetailData: false,
    loadingPreview: false,
    loadingData: false,
    status: "idle",
    openModalSort: false,
    categories: [],
    featCategories: [], 
    loadingShopCategories: false,
    loadingFeatCategories: false,
};


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setLoadingCartItem: (state, action: PayloadAction<boolean>) => {
            state.loadingPreview = action.payload;
        },
        incrementQuantityProduct: (state) => {
            state.quantityProduct = state.quantityProduct + 1;
        },
        decrementQuantityProduct: (state) => {
            state.quantityProduct = state.quantityProduct - 1;
        },
        setActiveElem: (state,action: PayloadAction<number>) => {
            state.activeElem = action.payload;
        },
        // sortProductList: (state, action:PayloadAction<string>) => {
        //     state.filter.sortBy = action.payload.toString();
        //     state.openModalSort = false;
        //     switch(action.payload) {
        //         case "from A-Z": {    
        //             state.listProducts = [...state.listProducts].sort((a:typeProduct, b:typeProduct) => a.name.localeCompare(b.name));
        //             break;
        //         }
        //         case "from Z-A": {
        //             state.listProducts = [...state.listProducts].sort((a:typeProduct, b:typeProduct) => a.name.localeCompare(b.name));
        //             break;
        //         }
        //         case "Price: Low-High": {
        //             state.listProducts = [...state.listProducts].sort((a:typeProduct, b:typeProduct) => parseFloat(a.price) - parseFloat(b.price));
        //             break;
        //         }
        //         case "Price: Hight-Low": {
        //             state.listProducts = [...state.listProducts].sort((a:typeProduct, b:typeProduct) => parseFloat(b.price) - parseFloat(a.price));
        //             break;
        //         }
        //         case "Newest Items First": {
        //             state.listProducts = [...state.listProducts].sort((a:typeProduct, b:typeProduct) => parseFloat(b.yearpublished) - parseFloat(a.yearpublished));
        //             break;
        //         }
        //         default: 
        //             break;
        //     }
        // },
        openModalSortDropDown: (state,action:PayloadAction<boolean>) => {
            state.openModalSort = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.paginationProps.currentPage = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.paginationProps.limit = action.payload;
        },
        changePageNum: (state,action: PayloadAction<number>) => {
            state.paginationProps.currentPage = action.payload;
        },
        changeLimitNum: (state,action) => {
            state.paginationProps.limit = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loadingData = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                const {currentPage, limit, totalItems, totalPages} = action.payload.pagination;
                state.loadingData = false; 
                state.listProducts = action.payload.data;
                state.metadata.page = Number(currentPage);
                state.metadata.limit = Number(limit);
                state.metadata.totalItems = Number(totalItems);
                state.metadata.totalPages = Number(totalPages);
                state.listProductsBestSelling = action.payload.data.slice(0, 8);
                state.listProductsLatest = action.payload.data.slice(9, 17);
                state.listProductsSale = action.payload.data.slice(16, 24);
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loadingData = false;
                state.error = "Something went wrong!";
            })
        builder
            .addCase(fetchDetailProduct.pending, (state) => {
                state.loadingDetailData = true;
            })
            .addCase(fetchDetailProduct.fulfilled, (state, action) => {
                state.loadingDetailData = false;
                state.detailProducts = [action.payload];
            })
            .addCase(fetchDetailProduct.rejected, (state) => {
                state.loadingDetailData = false;
                state.errorDetail = null;
            })
        builder
            .addCase(fetchShopCategories.pending, (state) => {
                state.loadingShopCategories = true;
            })
            .addCase(fetchShopCategories.fulfilled, (state,action) => {
                state.loadingShopCategories = true;
                state.categories = action.payload;
            })
            .addCase(fetchShopCategories.rejected, (state) => {
                state.loadingShopCategories = false;
            })
        builder
            .addCase(fetchFeatCategories.pending, (state) => {
                state.loadingFeatCategories = true;
            })
            .addCase(fetchFeatCategories.fulfilled, (state,action) => {
                state.loadingFeatCategories = true;
                state.featCategories = action.payload;
            })
            .addCase(fetchFeatCategories.rejected, (state) => {
                state.loadingFeatCategories = false;
            })
        builder 
            .addCase(fetchListAuthors.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchListAuthors.fulfilled, (state,action) => {
                state.status = "succeeded";
                state.listAuthor = action.payload;
            })
            .addCase(fetchListAuthors.rejected, (state) => {
                state.status = "failed";
            })
    },
});

export const {
    setLoadingCartItem,
    incrementQuantityProduct,
    decrementQuantityProduct,
    setActiveElem,
    // sortProductList,
    openModalSortDropDown,
    changeLimitNum,
    setPage
} = productSlice.actions;
export default productSlice.reducer;
