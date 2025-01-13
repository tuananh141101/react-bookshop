import "./style/Bookselected.scss";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";
import { useInView, motion, easeInOut } from "framer-motion";

const Bookselected = () => {
    const [quantityInput, setQuantityInput] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <section className="selected-book">
                <Container>
                    <Row>
                        <Col className="d-flex align-items-center justify-content-center">
                            <ul>
                                <li style={{ textAlign: "center" }}>
                                    <p className="mb-0">Book Selected</p>
                                </li>
                                <li style={{ textAlign: "center" }}>
                                    <span>Book selected by our staff</span>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            className={`d-flex align-items-center ${
                                windowWidth <= 768
                                    ? "justify-content-center"
                                    : "justify-content-end"
                            }`}
                            md={5}
                        >
                            <div
                                ref={ref}
                                style={{
                                    opacity: isInView ? 1 : 0,
                                    transition: "0.5s ease-in-out",
                                    transform: `translateY(${
                                        isInView ? 0 : 30
                                    }px)`,
                                }}
                            >
                                <Image src="https://websitebook-api.vercel.app/images/img-book-10.png" />
                            </div>
                        </Col>
                        <Col
                            className="d-flex align-items-start flex-column info"
                            md={7}
                        >
                            <p className="mb-0">
                                Know Why the Caged Bird Sings
                            </p>
                            <span>
                                Here is a book as joyous and painful, as
                                mysterious and memorable, as childhood itself. I
                                Know Why the Caged Bird Sings captures the
                                longing of lonely children, the brute insult of
                                bigotry, and the wonder of words that can make
                                the world right. Maya Angelou's debut memoir is
                                a modern American classic beloved worldwide.
                            </span>
                            <ul>
                                <li className="author">
                                    <span>Author:</span>
                                    <span>Maya Angelou</span>
                                </li>
                                <li className="categories">
                                    <span>Categories:</span>
                                    <span>Biography,Family</span>
                                </li>
                            </ul>
                            <form
                                action=""
                                className="d-flex align-items-center"
                            >
                                <div className="quantity">
                                    <label htmlFor="quantity-input"></label>
                                    <input
                                        type="number"
                                        value={quantityInput}
                                        onChange={(e) => {
                                            if (e.target.value >= 1) {
                                                setQuantityInput(
                                                    e.target.value
                                                );
                                            }
                                        }}
                                    />
                                </div>
                                <button>Add to cart</button>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="special">
                <Container>
                    <Row>
                        <Col sm={6} className="custom-col">
                            <p className="mb-0">Get 30% Off</p>
                            <span>
                                Special monthly deal for purchases orders over
                                $150.00.
                            </span>
                        </Col>
                        <Col
                            className="d-flex align-items-center justify-content-end custom-col"
                            sm={6}
                        >
                            <button>
                                Benefit from this offer
                                <IoIosArrowForward />
                            </button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Bookselected;
