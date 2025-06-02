import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const useProductStore = () =>
    useSelector((state: RootState) => state.productStore);

export const useCategoriesStore = () =>
    useSelector((state: RootState) => state.productStore);

export const useBlogStore = () =>
    useSelector((state: RootState) => state.blogStore);

export const useCommentStore = () =>  
    useSelector((state:RootState) => state.commentStore);   