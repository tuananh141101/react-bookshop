import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDetailProduct, fetchFeatCategories, fetchListAuthors, fetchProducts, fetchShopCategories } from "./productApi";
import { typeCategories, typeListCategories, typeProduct } from "../../common/constant/Constant";

interface ProductState {
    listProducts: typeProduct[];
    listProductsBestSelling: typeProduct[];
    listProductsLatest: typeProduct[];
    listProductsSale: typeProduct[];
    detailProducts: typeProduct[];
    listAuthor: string[];
    listAuthorNotAllow: string[];
    categories: typeListCategories[];
    featCategories: typeCategories[];
    activeElem: number;
    error: string | null;
    errorDetail: string | null;
    quantityProduct: number;
    filter: {
        minPrice: number;
        maxPrice: number;
        sortBy: string;
        cate: string[];
        author: string[];
        search: string;
    },
    paginationProps: {
        currentPage: number;
        limit: number;
        totalItems:number;
        totalPages:number;
    }
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    loadingDetailData: boolean;
    loadingData: boolean;
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
    filter: {
        minPrice: 0,
        maxPrice: 100,
        sortBy: "None",
        cate: [],
        author: [],
        search: "",
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
            state.loadingData = action.payload;
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
        // updatePriceRange: (state, action:PayloadAction<{ type: 'min' | 'max'; value: number }>) => {
        //     const newPriceRange = [...state.filter.priceRange];
        //     if (action.payload.type === 'min') {
        //         newPriceRange[0] = action.payload.value;
        //     } else {
        //         newPriceRange[1] = action.payload.value;
        //     }
        //     state.filter.priceRange[0] = newPriceRange[0];
        //     state.filter.priceRange[1] = newPriceRange[1];
        // },
        sortProductList: (state, action:PayloadAction<string>) => {
            state.filter.sortBy = action.payload.toString();
            state.openModalSort = false;
            switch(action.payload) {
                case "from A-Z": {    
                    state.listProducts = [...state.listProducts].sort((a:typeProduct, b:typeProduct) => a.name.localeCompare(b.name));
                    break;
                }
                case "from Z-A": {
                    state.listProducts = [...state.listProducts].sort((a:typeProduct, b:typeProduct) => a.name.localeCompare(b.name));
                    break;
                }
                case "Price: Low-High": {
                    state.listProducts = [...state.listProducts].sort((a:typeProduct, b:typeProduct) => parseFloat(a.price) - parseFloat(b.price));
                    break;
                }
                case "Price: Hight-Low": {
                    state.listProducts = [...state.listProducts].sort((a:typeProduct, b:typeProduct) => parseFloat(b.price) - parseFloat(a.price));
                    break;
                }
                case "Newest Items First": {
                    state.listProducts = [...state.listProducts].sort((a:typeProduct, b:typeProduct) => parseFloat(b.yearpublished) - parseFloat(a.yearpublished));
                    break;
                }
                default: 
                    break;
            }
        },
        openModalSortDropDown: (state,action:PayloadAction<boolean>) => {
            state.openModalSort = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.paginationProps.currentPage = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.paginationProps.limit = action.payload;
        },
        cateChecked: (state, action:PayloadAction<string>) => {
            state.filter.cate.push(action.payload)
        },
        authorChecked: (state,action: PayloadAction<string>) => {
            state.filter.author.push(action.payload)
        },
        removeSingleCate: (state, action: PayloadAction<string>) => {
            const deleteCate = action.payload;
            if (state.filter.cate.includes(deleteCate)) {
                const newDataCate = state.filter.cate.filter((item:string) => item !== deleteCate)
                state.filter.cate = newDataCate
            } 
        },
        removeSingleAuthor: (state,action: PayloadAction<string>) => {
            const deleteAuthor = action.payload;
            if (state.filter.author.includes(deleteAuthor)) {
                const newDataAuthor = state.filter.author.filter((item:string) => item !== deleteAuthor)
                state.filter.author = newDataAuthor;
            }
        },
        clearAllCate: (state) => {
            state.filter.cate = []
            state.filter.author = []
        },
        changePageNum: (state,action: PayloadAction<number>) => {
            state.paginationProps.page = action.payload;
        },
        changeLimitNum: (state,action) => {
            state.paginationProps.limit = action.payload;
        },
        changeSearch: (state,action: PayloadAction<string>) => {
            state.filter.search = action.payload;
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
                state.listProducts = action.payload.data;
                // if (Array.isArray(state.listProducts) && state.listProducts.length > 0) {
                //     const author = state.listProducts.map((item:typeProduct) => {
                //         return item.author
                //     });

                //     const uniqueAuthor = author.reduce((acc:string[],curr:string) => {
                //         if (!acc.includes(curr)) {
                //             acc.push(curr);
                //         }
                //         return acc;
                //     },[])
                //     state.listAuthorNotAllow = uniqueAuthor;
                // }
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
    sortProductList,
    openModalSortDropDown,
    cateChecked,
    authorChecked,
    removeSingleCate,
    removeSingleAuthor,
    clearAllCate,
    changeLimitNum,
    changeSearch
} = productSlice.actions;
export default productSlice.reducer;
