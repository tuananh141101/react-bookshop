import { Card, Modal, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegEye, FaRegHeart } from "react-icons/fa";
import { btnAnimationBG } from "../../../common/constant/Constant";
import React, { useState } from "react";
import { typeProduct } from "../../../common/constant/Constant";
import "./CartItem.scss";
import Skeleton from "react-loading-skeleton";
import { AppDispatch } from "../../../app/store";
import { useDispatch } from "react-redux";
import {
    decrementQuantityProduct,
    incrementQuantityProduct,
    setLoading,
} from "../../../features/products/productSlice";
import { useProductStore } from "../../../common/hooks/useCustomHooks";


type ChildProps = {
    items: typeProduct;
    style?: React.CSSProperties;
    className?: string;
    index?: number;
    isRender?: boolean;
};

const CartItem: React.FC<ChildProps> = React.memo(
    ({ items, style, className, index }) => {
        const [show, setShow] = useState<boolean>(false);
        const { loadingData, quantityProduct } = useProductStore();
        const handleClose = () => setShow(false);
        const dispatch = useDispatch<AppDispatch>();
        const navigate = useNavigate()

        return (
            <>
                <Card style={style} key={index}
                    onClick={() => {
                        navigate(`/shop/product/${items?.name.replace(/\s+/g, '-')}/${items.id}`);
                    }} 
                >
                    <div
                        className={`${className ? `${className} img` : "img"}`}
                    >
                        <Card.Img
                            variant="top"
                            src={`https://websitebook-api.vercel.app${items?.image}`}
                            loading="lazy"
                            alt="images"
                        />
                        <div className="wrapBtnIcon">
                            <motion.div
                                className="btn-icon quick-view"
                                variants={btnAnimationBG}
                                initial="hidden"
                                whileHover="show"
                                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                    event.stopPropagation();
                                    setShow(true);
                                    dispatch(setLoading(true));
                                    setTimeout(() => {
                                        dispatch(setLoading(false));
                                    }, 600);
                                }}
                            >
                                <FaRegEye />
                            </motion.div>
                            <motion.div
                                className="btn-icon add-fav-book"
                                variants={btnAnimationBG}
                                initial="hidden"
                                whileHover="show"
                                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                    event.stopPropagation();
                                }}
                            >
                                <FaRegHeart />
                            </motion.div>
                        </div>
                    </div>

                    <Card.Body className="border-bottom d-flex align-items-start justify-content-around flex-column">
                        <Card.Text>{items?.categories?.join(", ")}</Card.Text>
                        <Card.Title>{items?.name}</Card.Title>
                        <p className="mb-0">
                            <Link to="">{items?.author}</Link>
                        </p>
                    </Card.Body>
                    <div className="card-price"
                        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                            event.stopPropagation();
                        }}
                    >
                        <ul className="mb-0 d-flex align-items-center justify-content-between">
                            <li>${items?.price}</li>
                            <li
                                onClick={() => {
                                        // dispatch(addToCart(item))
                                        // event.stopPropagation(); 
                                    }  
                                }
                            >
                                <motion.div
                                    variants={btnAnimationBG}
                                    initial="hidden"
                                    whileHover="show"
                                >
                                    <MdOutlineShoppingBag />
                                </motion.div>
                            </li>
                        </ul>
                    </div>
                </Card>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Preview Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="preview-item">
                            <Row>
                                <Col className="d-flex align-items-center justify-content-center">
                                    {loadingData ? (
                                        <Skeleton className="loadingske-img" />
                                    ) : (
                                        <img
                                            src={`https://websitebook-api.vercel.app${items?.image}`}
                                            loading="lazy"
                                            alt="images"
                                        />
                                    )}
                                </Col>
                                <Col className="d-flex align-items-start flex-column custom-col">
                                    <Link to="">
                                        <p className="mb-0">
                                            {loadingData ? (
                                                <Skeleton className="loadingske-name" />
                                            ) : (
                                                `${items.name}`
                                            )}
                                        </p>
                                    </Link>
                                    <ul className="preview-item__detail mb-0">
                                        <li>
                                            <span>
                                                {loadingData ? (
                                                    <Skeleton className="loadingske-price" />
                                                ) : (
                                                    `${items.price}$`
                                                )}
                                            </span>
                                        </li>
                                        <li>
                                            <span>Publisher: </span>
                                            <span>
                                                {loadingData ? (
                                                    <Skeleton className="loadingske-pub" />
                                                ) : (
                                                    `${items.author}`
                                                )}
                                            </span>
                                        </li>
                                        <li>
                                            <span>Categories: </span>
                                            <span>
                                                {!loadingData ? (
                                                    <Skeleton className="loadingske-cate" />
                                                ) : (
                                                   `${items?.categories?.join(", ")}`
                                                )}
                                            </span>
                                        </li>
                                    </ul>
                                    <section className="d-flex align-items-center">
                                        <form>
                                            <button
                                                className={`${loadingData ? "loadingData" : ""}`}
                                                disabled={loadingData ? true : false}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(
                                                        incrementQuantityProduct()
                                                    );
                                                }}
                                            >
                                                +
                                            </button>
                                            <input
                                                type="number"
                                                value={quantityProduct}
                                                readOnly
                                            />
                                            <button
                                                disabled={loadingData ? true : false}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (quantityProduct > 1) {
                                                        dispatch(
                                                            decrementQuantityProduct()
                                                        );
                                                    }
                                                }}
                                                style={{
                                                    opacity:
                                                        quantityProduct === 1
                                                            ? "0.8"
                                                            : "1",
                                                }}
                                            >
                                                -
                                            </button>
                                        </form>
                                        <motion.button
                                            className={`icon add-to-cart d-flex align-items-center justify-content-center ${loadingData ? 'loadingData' : ''}`}
                                            variants={loadingData ? {} : btnAnimationBG}
                                            initial="hidden"
                                            whileHover="show"
                                            disabled={loadingData ? true : false}
                                            onClick={() =>
                                                {
                                                    console.log("add to cart")
                                                }
                                            }
                                        >
                                            <span>Add To Cart</span>
                                        </motion.button>
                                        <motion.button
                                            className={`icon add-to-fav d-flex align-items-center justify-content-center ${loadingData ? 'loadingData' : ''}`}
                                            variants={loadingData ? {} : btnAnimationBG}
                                            initial="hidden"
                                            whileHover="show"
                                            disabled={loadingData ? true : false}
                                            onClick={() =>
                                                {
                                                    console.log("add to fav")
                                                }
                                            }
                                        >
                                            <FaRegHeart />
                                        </motion.button>
                                    </section>
                                    <ul className="sharing mb-0 d-flex align-items-center">
                                        <li>
                                            <span>Share:</span>
                                        </li>
                                        <li className="d-flex align-items-center justify-content-center">
                                            <FaFacebookF />
                                        </li>
                                        <li className="d-flex align-items-center justify-content-center">
                                            <FaInstagram />
                                        </li>
                                        <li className="d-flex align-items-center justify-content-center">
                                            <FaTwitter />
                                        </li>
                                    </ul>
                                    <div className="send-email">
                                        <span className="d-flex align-items-center justify-content-center">
                                            <MdOutlineEmail
                                                style={{ paddingRight: "4px" }}
                                            />
                                            Email to friend.
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
);

export default CartItem;
