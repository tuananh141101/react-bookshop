import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDetailProduct, fetchFeatCategories, fetchProducts, fetchShopCategories } from "./productApi";
import { typeCategories, typeListCategories, typeProduct } from "../../common/constant/Constant";

interface ProductState {
    listProducts: typeProduct[];
    listProductsBestSelling: typeProduct[];
    listProductsLatest: typeProduct[];
    listProductsSale: typeProduct[];
    detailProducts: typeProduct[];
    listAuthor: string[];
    categories: typeListCategories[];
    featCategories: typeCategories[];
    activeElem: number;
    loadingData: boolean;
    loadingDetailData: boolean;
    error: string | null;
    errorDetail: string | null;
    quantityProduct: number;
    fiteredProductsByCate: typeProduct[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    filter: {
        priceRange: [number,number];
        sortBy: string;
        cate: string[];
        author: string[];
    },
    openModalSort: boolean;
    author: string[]
    loadingShopCategories: boolean;
    loadingFeatCategories: boolean;
    paginationProps: {
        page: number;
        limit: number;
        name_like: string;
        price_gte: number;
        price_lte: number;
        categories: string[];
    }
}

const initialState: ProductState = {
    listProducts: [],
    listProductsBestSelling: [],
    listProductsLatest: [],
    listProductsSale: [],
    error: null,

    detailProducts: [],
    loadingData: false,
    loadingDetailData: false,
    errorDetail: null,
    
    quantityProduct: 1,
    activeElem: 0,
    fiteredProductsByCate: [],
    status: "idle",
    listAuthor: [],
    filter: {
        priceRange: [0,0],
        sortBy: "None",
        cate: [],
        author: [],
    },
    openModalSort: false,
    categories: [],
    featCategories: [], 
    author: [],
    loadingShopCategories: false,
    loadingFeatCategories: false,
    paginationProps: {
        page: 1,
        limit: 10,
        name_like: "",
        price_gte: 0,
        price_lte: 0,
        categories: [],
    }
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
        checkedCate: (state,action: PayloadAction<string>) => {
            state.filter.cate.push(action.payload);
        },
        checkAuthor: (state, action:PayloadAction<string>) => {
            state.filter.author.push(action.payload)
        },
        updatePriceRange: (state, action:PayloadAction<{ type: 'min' | 'max'; value: number }>) => {
            const newPriceRange = [...state.filter.priceRange];
            if (action.payload.type === 'min') {
                newPriceRange[0] = action.payload.value;
            } else {
                newPriceRange[1] = action.payload.value;
            }
            state.filter.priceRange[0] = newPriceRange[0];
            state.filter.priceRange[1] = newPriceRange[1];
        },
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
            state.paginationProps.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.paginationProps.limit = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.paginationProps.name_like = action.payload;
        },
        setLowPrice: (state, action: PayloadAction<number>) => {
            state.paginationProps.price_gte = action.payload;
        },
        setMaxPrice: (state, action: PayloadAction<number>) => {
            state.paginationProps.price_lte = action.payload;
        },
        setCategory: (state, action: PayloadAction<string[]>) => {
            state.paginationProps.categories = action.payload;
        },
        cateChecked: (state, action:PayloadAction<string>) => {
            state.filter.cate.push(action.payload)
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
                //Lọc ra những danh sách author 
                if (Array.isArray(state.listProducts) && state.listProducts.length > 0) {
                    const author = action.payload.data.map((item:typeProduct) => {
                        return item.author
                    });
                    
                    const uniqueAuthor = author.reduce((acc:string[],curr:string) => {
                        if (!acc.includes(curr)) {
                            acc.push(curr);
                        }
                        return acc;
                    }, []);
                    state.author = uniqueAuthor;
                }
                if (Array.isArray(state.listProducts) && state.listProducts.length > 0) {
                    const author = state.listProducts.map((item:typeProduct) => {
                        return item.author
                    });

                    const uniqueAuthor = author.reduce((acc:string[],curr:string) => {
                        if (!acc.includes(curr)) {
                            acc.push(curr);
                        }
                        return acc;
                    },[])

                    state.listAuthor = uniqueAuthor;
                }
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
} = productSlice.actions;
export default productSlice.reducer;
