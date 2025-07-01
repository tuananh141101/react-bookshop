import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, useState } from 'react';

export const useProductStore = () =>
    useSelector((state: RootState) => state.productStore);

export const useCategoriesStore = () =>
    useSelector((state: RootState) => state.productStore);

export const useBlogStore = () =>
    useSelector((state: RootState) => state.blogStore);

export const useCommentStore = () =>  
    useSelector((state:RootState) => state.commentStore);   

export const useDebounce = (value:any, delay:number) => {
    const [debounceValue,setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)

            return () => {
                clearTimeout(handler)
            }
        },delay)
    }, [value, delay])
    return debounceValue;
}