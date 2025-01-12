import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const useProductStore = () =>
    useSelector((state: RootState) => state.productStore);

