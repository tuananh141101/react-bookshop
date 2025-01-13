import { useInView } from "framer-motion";
import { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import "./style/Blogsection.scss";
import { FaLinkSlash } from "react-icons/fa6";

const Blogsection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

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
                        <Col className="custom-col" lg={6}>
                            <div
                                className="d-flex align-items-center justify-content-start"
                                ref={ref}
                                style={{
                                    opacity: isInView ? 1 : 0,
                                    transform: `translateX(${
                                        isInView ? 0 : -20
                                    }px)`,
                                    transition: "0.5s ease-in-out",
                                }}
                            >
                                <div className="Image">
                                    <img src="https://demo.kaliumtheme.com/bookstore/wp-content/uploads/2019/03/4096-2731-304fc25e-2cbe-4a50-a540-46eeff3dd941-1482x635.jpg" />
                                    <div className="overlay d-flex align-items-center justify-content-center">
                                        <FaLinkSlash />
                                    </div>
                                </div>

                                <ul>
                                    <li>
                                        <span>APRIL 4,2023</span>
                                    </li>
                                    <li>
                                        <span>
                                            I was paid $12,500 to write my book.{" "}
                                            <br />
                                            Here's why I'm revealing that
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col className="custom-col" lg={6}>
                            <div
                                className="d-flex align-items-center justify-content-start"
                                ref={ref}
                                style={{
                                    opacity: isInView ? 1 : 0,
                                    transform: `translateX(${
                                        isInView ? 0 : -20
                                    }px)`,
                                    transition: "0.5s ease-in-out 0.2s",
                                }}
                            >
                                <div className="Image">
                                    <img src="https://demo.kaliumtheme.com/bookstore/wp-content/uploads/2019/02/josh-applegate-1357030-unsplash-1482x635.jpg" />
                                    <div className="overlay d-flex align-items-center justify-content-center">
                                        <FaLinkSlash />
                                    </div>
                                </div>

                                <ul>
                                    <li>
                                        <span>APRIL 23,2023</span>
                                    </li>
                                    <li>
                                        <span>
                                            Should You Feel Embarrassed for
                                            Reading Kids Books?
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col className="custom-col" lg={6}>
                            <div
                                className="d-flex align-items-center justify-content-start"
                                ref={ref}
                                style={{
                                    opacity: isInView ? 1 : 0,
                                    transform: `translateX(${
                                        isInView ? 0 : -20
                                    }px)`,
                                    transition: "0.5s ease-in-out 0.4s",
                                }}
                            >
                                <div className="Image">
                                    <img src="https://demo.kaliumtheme.com/bookstore/wp-content/uploads/2019/03/merlin_108104686_134e70f3-a1fd-4a42-8838-f1e8c274501d-superJumbo.jpg" />
                                    <div className="overlay d-flex align-items-center justify-content-center">
                                        <FaLinkSlash />
                                    </div>
                                </div>

                                <ul>
                                    <li>
                                        <span>MARCH 28,2023</span>
                                    </li>
                                    <li>
                                        <span>
                                            A Lost 'Little Boy' Nears 100: Poet
                                            And Publisher Lawrence Ferlinghetti
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col className="custom-col" lg={6}>
                            <div
                                className="d-flex align-items-center justify-content-start"
                                ref={ref}
                                style={{
                                    opacity: isInView ? 1 : 0,
                                    transform: `translateX(${
                                        isInView ? 0 : -20
                                    }px)`,
                                    transition: "0.5s ease-in-out 0.6s",
                                }}
                            >
                                <div className="Image">
                                    <img src="https://demo.kaliumtheme.com/bookstore/wp-content/uploads/2019/03/digital-vs-print.jpg" />
                                    <div className="overlay d-flex align-items-center justify-content-center">
                                        <FaLinkSlash />
                                    </div>
                                </div>

                                <ul>
                                    <li>
                                        <span>DEC 14, 2023</span>
                                    </li>
                                    <li>
                                        <span>
                                            Digital vs. Print: The Book Battle
                                            Rages On
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Blogsection;
