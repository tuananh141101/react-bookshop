import React from "react";
import "./styles/FIlterProduct.scss";
import { AppDispatch } from "../../../../app/store";
import { useDispatch } from "react-redux";
import { typeListCategories } from "../../../../common/constant/Constant";
import { useProductStore } from "../../../../common/hooks/useCustomHooks";
import { Accordion } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputForm from "../../../../shared/components/InputForm/InputForm";
import { cateChecked } from "../../../../features/products/productSlice";

const FilterProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {categories,listAuthor} = useProductStore();
    const handleSubmitPrice = () => {}
    return (
        <>
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Categories</Accordion.Header>
                        <Accordion.Body>
                            <ul className="mb-0 pl-0">
                                {categories && categories.map((item:typeListCategories) => {
                                    return (
                                        <li key={item.id} onClick={() => dispatch(cateChecked(item.name))}>{item.name}</li>
                                    );
                                })}
                            </ul>
                        </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Author</Accordion.Header>
                    <Accordion.Body>
                        <ul className="mb-0 pl-0">
                            {listAuthor && listAuthor.map((item:string, index:number) => {
                                return (
                                    <li key={index}>{item}</li>
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
                                value={0}
                                className="minPrice"
                                placeholder="Min Price"                        
                            />
                            <InputForm 
                                type="number"
                                value={100}
                                className="maxPrice"
                                placeholder="Max Price"
                            />
                            <button>Apply</button>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default FilterProduct;
