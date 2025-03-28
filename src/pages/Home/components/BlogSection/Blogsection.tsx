import { useInView } from "framer-motion";
import { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import "./style/Blogsection.scss";
import { FaLinkSlash } from "react-icons/fa6";
import { useBlogStore } from "../../../../common/hooks/useCustomHooks";
import React from "react";

const Blogsection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const { listBlogs } = useBlogStore();

    return (
        <>
            <section className="product-blog">
                <Container>
                    <Row>
                        <Col className="custom-col" sm={6}>
                            <p className="mb-0">Blog</p>
                            <span>
                                Book reviews and other topics can be found in
                                our blog.
                            </span>
                        </Col>
                        <Col
                            className="custom-col d-flex align-items-center justify-content-end"
                            sm={6}
                        >
                            <span>
                                <Link to="/blog">
                                    More Blog
                                    <IoIosArrowForward />
                                </Link>
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        {listBlogs.map((item: any, index: number) => {
                            return (
                                <Col
                                    className="custom-col"
                                    lg={6}
                                    key={item.id}
                                >
                                    <div
                                        className="d-flex align-items-center justify-content-start"
                                        ref={ref}
                                        style={{
                                            opacity: isInView ? 1 : 0,
                                            transform: `translateX(${
                                                isInView ? 0 : -20
                                            }px)`,
                                            transition: `0.5s ease-in-out ${
                                                index * 0.2
                                            }s`,
                                        }}
                                    >
                                        <div className="Image">
                                            <img
                                                src={`https://websitebook-api.vercel.app${item?.image}`}
                                            />
                                            <div className="overlay d-flex align-items-center justify-content-center">
                                                <FaLinkSlash />
                                            </div>
                                        </div>

                                        <ul>
                                            <li>
                                                <span>{item?.date}</span>
                                            </li>
                                            <li>
                                                <span>{item?.title}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Blogsection;
