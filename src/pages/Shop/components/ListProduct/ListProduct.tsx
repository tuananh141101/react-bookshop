import React, { useEffect } from 'react';
import "./styles/ListProduct.scss";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiArrowGoBackFill } from "react-icons/ri";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useProductStore } from '../../../../common/hooks/useCustomHooks';
import { sortProductList } from '../../../../features/products/productSlice';
import { typeProduct } from '../../../../common/constant/Constant';
import { IoCloseSharp } from "react-icons/io5";




const ListProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {filter,listProducts, openModalSort} = useProductStore();
    const listSort = ["from A-Z", "from Z-A", "Price: Low-High", "Price: High-Low", "Newest Items First", "None"];

    const handleSort = () => {
        dispatch(sortProductList("Newest Items First"))
    }

    useEffect(() => {},[])
    
    return (
        <>
            <div className="filter d-flex align-items-center flex-column">
                <div className="filter-shop d-flex">
                    <ul className="mb-0 d-flex algin-items-center flex-wrap gap-2">
                        <li className="filterItemSelected d-flex align-items-center justify-content-between gap-1">
                            Category
                            <IoMdCloseCircleOutline className="icon"/>
                        </li>
                        <li className="clearBtn d-flex align-items-center justify-content-between gap-1">
                            Clear All
                            <RiArrowGoBackFill className="icon" />
                        </li>
                    </ul>
                </div>
                <div className="sorting-wrap d-flex">
                    <div className="sortDropDown">
                        <div className="sortDropDown-title">
                            <HiOutlineMenuAlt2 /> 
                            Sort by:<span onClick={handleSort}>{filter.sortBy}</span>
                            <div className="dropDownListSort">
                                <div className="title d-flex align-items-center justify-content-between gap-1">
                                    Sort By
                                    <IoCloseSharp />
                                </div>
                                <ul className="mb-0 pl-0">
                                    {
                                        listSort.map((item:string, index:number) => {
                                            return (
                                                <li key={index}>{item}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="listProduct d-flex algin-items-center justify-content-between flex-wrap">
                List product
            </div>
        </>
    ) 
}

export default  ListProduct