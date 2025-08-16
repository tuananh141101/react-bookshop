import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: string;
    cate: string[];
    author: string[];
    search: string;
}

const initialState: FilterState = {
    minPrice: null,
    maxPrice: null,
    sortBy: "none",
    cate: [],
    author: [],
    search: ""
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        cateChecked: (state,action:PayloadAction<string>) => {
            state.cate = action.payload.split(",").filter(Boolean)
        },
        authorChecked: (state,action:PayloadAction<string>) => {
            state.author = action.payload.split(",").filter(Boolean)
        },
        removeCateAuthor: (state,action:PayloadAction<{key: 'cate' | 'author'; value:string}>) => {
            const {key,value} = action.payload;
            if (state[key].includes(value)) {
                state[key] = state[key].filter(item => item !== value); 
            }
        },
        removePrice: (state) => {
            state.minPrice = null
            state.maxPrice = null
        },
        toggleFilterValue: (state,action:PayloadAction<{key: 'cate' | 'author'; value:string}>) => {
            const {key,value} = action.payload;
            const index = state[key].indexOf(value);
            if (index >= 0) {
                state[key].splice(index,1); //remove
            } else {
                state[key].push(value)
            }
        },
        clearAllCate: (state) => {
            state.cate = []
            state.author = []
            state.search = ""
            state.minPrice = null
            state.maxPrice = null
        },
        changeSearch: (state,action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        changePrice: (state, action:PayloadAction<{key: 'maxPrice' | 'minPrice'; value: number}>) => {
            const {key, value} = action.payload;
            state[key] = value;
        }
    }
})


export const {
    toggleFilterValue,
    cateChecked,
    authorChecked,
    removeCateAuthor,
    clearAllCate,
    changeSearch,
    changePrice,
    removePrice
} = filterSlice.actions;
export default filterSlice.reducer;