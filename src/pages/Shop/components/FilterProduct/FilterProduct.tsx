import React from "react";
import "./styles/FIlterProduct.scss";
import { AppDispatch } from "../../../../app/store";
import { useDispatch } from "react-redux";
import { typeListAuthor, typeListCategories } from "../../../../common/constant/Constant";
import { useFilterStore, useProductStore } from "../../../../common/hooks/useCustomHooks";
import { Accordion } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputForm from "../../../../shared/components/InputForm/InputForm";
import { useNavigate } from "react-router-dom";
import { changePrice, toggleFilterValue } from "../../../../features/filter/filterSlice";
import { toastUtils } from "../../../../common/utils/Toastutils";

const FilterProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { categories, listAuthor } = useProductStore();
    const { cate, author,minPrice, maxPrice } = useFilterStore();

    const handleSubmitPrice = (e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams(location.search);
        
        if (minPrice > maxPrice) {
            toastUtils.warning("Minimum price should be lower than maximum price", "")
            return
        } else {
            searchParams.set("minPrice", minPrice.toString());
            searchParams.set("maxPrice", maxPrice,toString())
        }
        navigate({search: searchParams.toString()}, {replace: true});
    };

    const updateURLParams = (isSearch:boolean) => {1
        const searchParams = new URLSearchParams(location.search);
        const params = {
            page: "1",
            category: (cate.join(','))
        }
        Object.entries(params).forEach(([key,value]) => {
            if (value) {
                searchParams.set(key,value)
            } else {
                searchParams.delete(key); 
            }
        })    
        navigate({ search: searchParams.toString() }, { replace: true });
    }

    return (
        <>
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Categories</Accordion.Header>
                        <Accordion.Body>
                            <ul className="mb-0 pl-0">
                                {categories && categories.map((item:typeListCategories) => {
                                    return (
                                        <li 
                                            key={item.id} 
                                            onClick={() => {
                                                if (cate.includes(item.name)) return
                                                dispatch(toggleFilterValue({key: 'cate', value: item.name}));
                                                const newCate = [...cate, item.name];

                                                const searchParams = new URLSearchParams(location.search);
                                                const params = {
                                                    category: newCate.join(',')
                                                }
                                                Object.entries(params).forEach(([key,value]) => {
                                                    if (value) searchParams.set(key,value)
                                                })
                                                navigate({search: searchParams.toString()}, {replace: true});
                                                // updateURLParams(true);
                                            }}
                                            className={cate.includes(item.name) ? "hasClicked" : ""}
                                        >{item.name}</li>
                                    );
                                })}
                            </ul>
                        </Accordion.Body>   
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Author</Accordion.Header>
                    <Accordion.Body>
                        <ul className="mb-0 pl-0">
                            {listAuthor && listAuthor.map((item:typeListAuthor, index:number) => {
                                return (
                                    <li 
                                        key={index} 
                                        onClick={() => {
                                            if (author.includes(item.name)) return
                                            dispatch(toggleFilterValue({key: 'author', value: item.name}));
                                            const newAuthor = [...author,item.name];

                                            const searchParams = new URLSearchParams(location.search);
                                            const params = {
                                                author: newAuthor.join(",")
                                            };
                                            Object.entries(params).forEach(([key, value]) => {
                                                if (value) searchParams.set(key,value)
                                            });
                                            navigate({search: searchParams.toString()}, {replace:true});
                                            // dispatch(fetchProducts());
                                        }}
                                        className={author.includes(item.name) ? "hasClicked" : ""}
                                    >{item.name}</li>
                                )
                            })}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Price</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={handleSubmitPrice}>
                            <InputForm 
                                type="number"
                                value={minPrice}
                                onChange={(e) => {
                                    if (Number(e.target.value) < 1) {
                                        toastUtils.warning("Price must be a positive value","");
                                        return
                                    }
                                    dispatch(changePrice({key: 'minPrice', value: Number(e.target.value)}));
                                }}
                                className="minPrice"
                                placeholder="Min Price"                        
                            />
                            <InputForm 
                                type="number"
                                value={maxPrice}
                                onChange={(e) => {
                                    if (Number(e.target.value) < 1) {
                                        toastUtils.warning("Price must be a positive value", "");
                                        return;
                                    }
                                    dispatch(changePrice({key: 'maxPrice', value: Number(e.target.value)}))
                                }}
                                className="maxPrice"
                                placeholder="Max Price"
                            />
                            <button type="submit">Apply</button>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default FilterProduct;

