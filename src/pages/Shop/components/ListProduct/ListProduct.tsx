import React, { useEffect, useRef } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward, IoMdCloseCircleOutline } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";
import ReactPaginate from "react-paginate";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { typeProduct } from '../../../../common/constant/Constant';
import { useFilterStore, useProductStore } from '../../../../common/hooks/useCustomHooks';
import { fetchProducts } from '../../../../features/products/productApi';
import CartItem from '../../../../shared/components/CartItem/CartItem';
import "./styles/ListProduct.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import { clearAllCate, toggleFilterValue } from '../../../../features/filter/filterSlice';
import { setPage } from '../../../../features/products/productSlice';


const ListProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { openModalSort, listProducts, loadingData, metadata} = useProductStore();
    const { cate,author,sortBy } = useFilterStore();
    const listSort = ["from A-Z", "from Z-A", "Price: Low-High", "Price: High-Low", "Newest Items First", "None"];
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOusdide = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                // dispatch(openModalSortDropDown(false));
            }
        } 
        if (openModalSort) {
            document.addEventListener('mousedown', handleClickOusdide);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOusdide);
        }
    },[dispatch, openModalSort]);

    const handleSort = () => {
        // dispatch(openModalSortDropDown(true));
    };

    const handlePageChange = (e: {selected: number}) => {
        dispatch(setPage(e.selected + 1));
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(
            "page", (e.selected + 1).toString()
        );
        navigate({
            search: searchParams.toString(),
        })
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    // const updateURLParams = (isSearch:boolean) => {
    //     const searchParams = new URLSearchParams();
    //     const params = {
    //         page: (paginationProps.currentPage).toString(),
    //         category: (filter.cate.join(','))
    //     }
    //     Object.entries(params).forEach(([key,value]) => {
    //         if (value) {
    //             searchParams.set(key,value)
    //         }
    //     })
    //     navigate({ search: searchParams.toString() }, { replace: true });
    //     if (isSearch) dispatch(fetchProducts())
    // }


    return (
        <>
            <div className="filter d-flex align-items-center flex-column">
                <div className="filter-shop d-flex">
                    <ul className="mb-0 d-flex algin-items-center flex-wrap gap-2">
                        {
                            cate.length > 0 &&
                                cate.map((item:string, index:number) => 
                                    <li
                                        className="filterItemSelected d-flex align-items-center justify-content-between gap-1"  
                                        key={index}
                                        onClick={() => {
                                            const newCate = cate.filter(c => c !== item);
                                            dispatch(toggleFilterValue({key: 'cate', value: item}));

                                            const searchParams = new URLSearchParams(location.search);
                                            if (newCate.length > 0) {
                                                searchParams.set("category", newCate.join(","))
                                            } else {
                                                searchParams.delete("category")
                                            }
                                            navigate({search: searchParams.toString()}, {replace: true});
                                        }}
                                    >
                                        {item}
                                        <IoMdCloseCircleOutline className="icon" />
                                    </li>
                                )
                        }
                        {
                            author.length > 0 &&
                                author.map((item:string, index:number) => (
                                    <li
                                        className="filterItemSelected d-flex align-items-center justify-content-between gap-1"
                                        key={index}
                                        onClick={() => {
                                            dispatch(toggleFilterValue({key: 'author', value: item}));
                                            const newAuthor = author.filter(c => c!== item);
                                            const searchParams = new URLSearchParams(location.search);

                                            if (newAuthor.length > 0) {
                                                searchParams.set("author", newAuthor.join(","))
                                            } else {
                                                searchParams.delete("author");
                                            }
                                            navigate({search: searchParams.toString()}, {replace:true});
                                        }}
                                    >
                                        {item}
                                        <IoMdCloseCircleOutline className="icon" />
                                    </li>
                                ))
                        }
                        <li className="clearBtn d-flex align-items-center justify-content-between gap-1"
                            onClick={() =>  {
                                dispatch(clearAllCate());
                                dispatch(fetchProducts());
                            }}
                        >
                            Clear
                            <RiArrowGoBackFill className="icon" />
                        </li>
                    </ul>
                </div>
                <div className="sorting-wrap d-flex">
                    <div className="sortDropDown">
                        <div className="sortDropDown-title">
                            <HiOutlineMenuAlt2 /> 
                            Sort by:<span onClick={handleSort}>{sortBy}</span>
                            <div className={`dropDownListSort ${openModalSort ? "openModal" : ""}`} ref={dropdownRef}>
                                <div className="title d-flex align-items-center justify-content-between gap-1">
                                    Sort By
                                    {/* <IoCloseSharp onClick={() => dispatch(openModalSortDropDown(false))}/> */}
                                    <IoCloseSharp />
                                </div>
                                <ul className={`mb-0 pl-0`}>
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
            <div className={`listProduct ${loadingData ? "d-flex flex-column justify-content-start align-items-center" : listProducts.length > 0 ? "d-block" : "d-flex algin-items-center justify-content-center flex-wrap"}`}>
                {
                    loadingData ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>   
                    ) : !listProducts.length ? (
                    <div className='noFound'>
                        <div className="noFound-items d-flex align-items-center justify-content-center flex-column gap-2">
                            <span>No products found</span>
                            <button onClick={() => window.location.reload()}>Reset all</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="listProduct-items">
                            {
                                listProducts.map((item:typeProduct) => {
                                    return (
                                        <CartItem key={item.id} items={item} index={item.id}/>
                                    )
                                })
                            }
                        </div>
                    </>
                )}
                {listProducts.length ? (
                    <div className="paginateProduct">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={
                                <IoIosArrowForward />
                            }
                            previousLabel={
                                <IoIosArrowBack />
                            }
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            containerClassName={"pagination"}
                            pageCount={metadata.totalPages}
                            renderOnZeroPageCount={null}
                            forcePage={metadata.page - 1}
                            onPageChange={handlePageChange}
                        />
                    </div>
                ) : ""}
            </div>
        </>
    ) 
}

export default  ListProduct