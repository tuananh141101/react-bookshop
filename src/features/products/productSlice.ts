import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDetailProduct, fetchProducts, fetchShopCategories } from "./productApi";
import { typeCategories, typeProduct } from "../../common/constant/Constant";

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
    listAuthor: string[];
    fiteredProductsByCate: typeProduct[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    filter: {
        priceRange: [number,number];
        searchKeyWord: string;
        sortBy: "from A-Z"  | "from Z-A" | "Price: Low-High" | "Price: High-Low" | "None" | "Newest Items First";
        cate: string[];
        author: string[];
    },
    openModalSort: boolean;
    categories: typeCategories[];
    author: string[]
    filterProducts: typeProduct[];
    loadingShopCategories: boolean;
    filters: {
        priceRange: [number, number];
        searchKeyword: string;
        sortBy: 'price-asc' | 'price-desc' | 'name';
    };
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
        searchKeyWord: "",
        sortBy: "None",
        cate: [],
        author: [],
    },
    openModalSort: false,
    categories: [],
    author: [],
    filterProducts: [],
    loadingShopCategories: false,
    filters: {
        priceRange: [0,0],
        searchKeyword: "",
        sortBy: "price-asc"
    }
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
                    state.listProducts = [...state.listProducts].sort((a:typeProduct, b:typeProduct) => a.price - b.price);
                    break;
                }
                case "Price: Hight-Low": {
                    state.listProducts = [...state.listProducts].sort((a:typeProduct, b:typeProduct) => b.price - a.price);
                    break;
                }
                case "Newest Items First": {
                    state.listProducts = [...state.listProducts].sort((a:typeProduct, b:typeProduct) => b.yearpublished - a.yearpublished);
                    break;
                }
                default: 
                    break;
            }
        },
        openModalSortDropDown: (state) => {state.openModalSort = true;}
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

                //Lọc ra những danh sách author 
                if (Array.isArray(state.listProducts) && state.listProducts.length > 0) {
                    const author = action.payload.map((item:typeProduct) => {
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
    },
});

export const {
    setProducts,
    setLoading,
    setError,
    incrementQuantityProduct,
    decrementQuantityProduct,
    setActiveElem,
    sortProductList,
    openModalSortDropDown,
} = productSlice.actions;
export default productSlice.reducer;
