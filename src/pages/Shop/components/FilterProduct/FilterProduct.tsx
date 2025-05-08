import React from "react";
import "./styles/FIlterProduct.scss";
import { AppDispatch } from "../../../../app/store";
import { useDispatch } from "react-redux";
import { useProductStore } from "../../../../common/hooks/useCustomHooks";
import Accordion from "react-bootstrap/Accordion";
import { typeShopCategories } from "../../../../common/constant/Constant";

const FilterProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {categories, author} = useProductStore();

    return (
        <>
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Categories</Accordion.Header>
                        <Accordion.Body>
                            <ul className="mb-0 pl-0">
                                {categories && categories.map((item:typeShopCategories) => {
                                    return (
                                        <>
                                            <li key={item.id}>{item.name}</li>
                                        </>
                                    );
                                })}
                            </ul>
                        </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Author</Accordion.Header>
                        <Accordion.Body>
                            <ul className="mb-0 pl-0">
                                {author && author.map((item:string,index:number) => {
                                    return (
                                        <>
                                            <li key={index}>{item}</li>
                                        </>
                                    )
                                })}
                            </ul>
                        </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default FilterProduct;
