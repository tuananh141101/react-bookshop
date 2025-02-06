import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const useProductStore = () =>
    useSelector((state: RootState) => state.productStore);

export const useCategoriesStore = () =>
    useSelector((state: RootState) => state.categoriesStore);

export const useBlogStore = () =>
    useSelector((state: RootState) => state.blogStore);
