import React from "react";
import "./styles/ProductItems.scss";
import { AnimatePresence, motion } from "framer-motion";
import { typeProduct } from "../../../../common/constant/Constant";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CartItem from "../../../../shared/components/CartItem/CartItem";
import { useProductStore } from "../../../../common/hooks/useCustomHooks";

const ProductItems = () => {
    // const ref = useRef<HTMLDivElement>(null);
    const { listProductsBestSelling, listProductsLatest, listProductsSale } =
        useProductStore();
    // const isInView = useInView(ref, { once: true });
    const [activeTab, setActiveTab] = useState<number>(0);
    const groupDataProduct = [
        listProductsBestSelling,
        listProductsLatest,
        listProductsSale,
    ];

    return (
        <>
            <div className="product-item-carousel">
                <Container>
                    <Row className="custom-row1">
                        <Col className="col1" sm={6}>
                            <p className="mb-0">Books</p>
                            <span>
                                The most recent books that arrived in our
                                bookstore.
                            </span>
                        </Col>
                        <Col
                            className={`col2 d-flex align-items-center justify-content-end`}
                            sm={6}
                        >
                            <nav className="d-flex">
                                {[0, 1, 2].map((i) => (
                                    <a key={i} onClick={() => setActiveTab(i)}>
                                        <AnimatePresence>
                                            {activeTab === i && (
                                                <motion.span
                                                    layoutId="navlink"
                                                    animate={{ opacity: 1 }}
                                                    initial={{ opacity: 0 }}
                                                    exit={{ opacity: 0 }}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </a>
                                ))}
                            </nav>
                        </Col>
                    </Row>
                    <motion.div
                        className={`carousel-bestselling carousel-card ${
                            activeTab === 0 ? "active" : ""
                        }`}
                        key={activeTab}
                        initial={{
                            opacity: 0,
                            y: 30,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                        }}
                        exit={{ opacity: 0, y: 30 }}
                    >
                        <Row>
                            {groupDataProduct[activeTab].map(
                                (item: typeProduct, index: number) => {
                                    return (
                                        <>
                                            <Col
                                                className="custom-col mb-4"
                                                xxl={3}
                                                xl={3}
                                                lg={3}
                                                md={4}
                                                sm={6}
                                                xs={6}
                                            >
                                                <CartItem
                                                    style={{ width: "100%" }}
                                                    items={item}
                                                    index={index}
                                                />
                                            </Col>
                                        </>
                                    );
                                }
                            )}
                        </Row>
                    </motion.div>
                </Container>
            </div>
        </>
    );
};

export default ProductItems;
