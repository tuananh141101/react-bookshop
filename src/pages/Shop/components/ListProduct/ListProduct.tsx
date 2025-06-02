import React, { useEffect, useRef } from 'react';
import "./styles/ListProduct.scss";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiArrowGoBackFill } from "react-icons/ri";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useProductStore } from '../../../../common/hooks/useCustomHooks';
import { openModalSortDropDown, sortProductList } from '../../../../features/products/productSlice';
import { IoCloseSharp } from "react-icons/io5";
import Spinner from 'react-bootstrap/Spinner';


const ListProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {filter, openModalSort} = useProductStore();
    const listSort = ["from A-Z", "from Z-A", "Price: Low-High", "Price: High-Low", "Newest Items First", "None"];
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSort = () => {
        dispatch(openModalSortDropDown(true));
    };

    useEffect(() => {
        const handleClickOusdide = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                dispatch(openModalSortDropDown(false));
            }
        } 
        if (openModalSort) {
            document.addEventListener('mousedown', handleClickOusdide);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOusdide);
        }
    },[dispatch, openModalSort])
    
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
                            <div className={`dropDownListSort ${openModalSort ? "openModal" : ""}`} ref={dropdownRef}>
                                <div className="title d-flex align-items-center justify-content-between gap-1">
                                    Sort By
                                    <IoCloseSharp onClick={() => dispatch(openModalSortDropDown(false))}/>
                                </div>
                                <ul className={`mb-0 pl-0`}>
                                    {
                                        listSort.map((item:string, index:number) => {
                                            return (
                                                <li key={index} onClick={() => dispatch(sortProductList(item))}>{item}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="listProduct d-flex algin-items-center justify-content-center flex-wrap">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </>
    ) 
}

export default  ListProduct