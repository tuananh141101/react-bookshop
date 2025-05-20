import { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useInView, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import "./style/Categories.scss";
import { useProductStore } from "../../../../common/hooks/useCustomHooks";
import React from "react";

const Categories = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const { featCategories } = useProductStore();

    return (
        <>
            <section className="product-categories">
                <Container>
                    <Row>
                        <Col className="col_1" xs={8}>
                            <span>Featured Categories</span>
                        </Col>
                        <Col
                            className="col_2 d-flex justify-content-end align-items-center"
                            xs={4}
                        >
                            <span>
                                <Link
                                    to="/shop"
                                    onClick={() => window.scroll(0, 0)}
                                >
                                    All Categories
                                    <IoIosArrowForward className="icon" />
                                </Link>
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="custom_col_cate">
                            <motion.ul
                                className="ul_cate d-flex align-items-center mb-0"
                                ref={ref}
                                style={{
                                    opacity: isInView ? 1 : 0,
                                    transition: "1.5s opacity",
                                }}
                            >
                                {featCategories.map(
                                    (item: any) => {
                                        return (
                                            <>
                                                <li key={item.id}>
                                                    <Link to="">
                                                        <div className="product-cate__inner d-flex justify-content-center align-items-center flex-column">
                                                            <div className="product-cate__icon">
                                                                <img
                                                                    src={`https://websitebook-api.vercel.app/${item.image}`}
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                            <div className="product-cate__text d-flex align-items-center justify-center flex-column">
                                                                <p className="mt-2 mb-0">
                                                                    {item.name}
                                                                </p>
                                                                <span>
                                                                    Shop Now
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </>
                                        );
                                    }
                                )}
                            </motion.ul>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Categories;
