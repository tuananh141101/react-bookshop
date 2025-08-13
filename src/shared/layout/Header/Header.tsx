import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { LuMapPin } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Collapse from "react-bootstrap/Collapse";
import { IoIosArrowDown } from "react-icons/io";
import "./styles/header.scss";
import InputForm from "../../components/InputForm/InputForm";
import React from "react";
import { useFilterStore } from "../../../common/hooks/useCustomHooks";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../features/products/productApi";
import { AppDispatch } from "../../../app/store";
import { changeLimitNum, changeSearch } from "../../../features/products/productSlice";
import { toastUtils } from "../../../common/utils/Toastutils";

const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [isMobile, setIsMobile] = useState<boolean>(
        window.innerWidth <= 1200
    );
    const [containerPadding, setContainerPadding] = useState<string>("py-4");
    const [show, setShow] = useState<boolean>(false); // *offcanvas
    const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);
    const [otherOpen, setOtherOpen] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false); // *Focus -> change color icon search
    const { search } = useFilterStore();

    // Shortcut to focus input search
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "k") {
                event.preventDefault();
                const searchInput =
                    document.querySelector<HTMLInputElement>(".input-search");
                if (searchInput) {
                    searchInput.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    // Offcanvas handlers
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Responsive handler
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 1200);
        setContainerPadding(window.innerWidth <= 992 ? "py-3" : "py-custom");
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        const rowSearchMobile =
            document.querySelector<HTMLDivElement>(".search-mobile");
        if (rowSearchMobile) {
            if (!isMobile) {
                rowSearchMobile.classList.add("hidden");
            } else {
                rowSearchMobile.classList.remove("hidden");
            }
        }

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isMobile]);

    // Focus change color icon search
    const handleFocus = () => {
        setIsFocused(true);
        const searchIcon = document.querySelector<HTMLDivElement>(
            "#searchInputLi .icon-search .icon"
        );
        if (searchIcon) {
            searchIcon.classList.add("focused-icon");
        }
    };

    return (
        <>
            <div className={`header`}>
                <div className={`header-top border-bottom border-bottom`}>
                    <Container className="header-top__container py-2">
                        <Row>
                            <Col className="top-left">
                                <ul className="mb-0 d-flex align-items-center">
                                    <li>
                                        <span>
                                            <MdOutlineMail className="icon icon-email" />
                                            bookstore@gmail.com
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <FaPhone className="icon icon-phone" />
                                            07947694378
                                        </span>
                                    </li>
                                </ul>
                            </Col>
                            <Col className="top-right d-flex justify-content-end">
                                <ul className="mb-0 d-flex align-items-center">
                                    <li>
                                        <Link to="/">
                                            <LuMapPin className="icon icon-map" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <FaFacebook className="icon icon-fa" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <FaInstagram className="icon icon-in" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <FaTwitter className="icon icon-tw" />
                                        </Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={`header-bottom border-bottom`}>
                    <Container
                        className={`header-bottom__container ${containerPadding}`}
                    >
                        <Row>
                            <Col
                                className="bottom-left"
                                xxl={4}
                                xl={2}
                                lg={5}
                                md={4}
                                sm={4}
                            >
                                <ul className="d-flex align-items-center mb-0">
                                    <li className="logo">
                                        <Link to="/">BOOKSTORE</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col
                                className="bottom-right d-flex align-items-center justify-content-end"
                                xxl={8}
                                xl={10}
                                lg={7}
                                md={8}
                                sm={8}
                            >
                                <ul className="d-flex align-items-center mb-0">
                                    <li className={isMobile ? "hidden" : ""}>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className={isMobile ? "hidden" : ""}>
                                        <span onClick={() => dispatch(changeLimitNum(10))}>
                                            <Link to="shop">Shop</Link>
                                        </span>
                                    </li>
                                    <li className={isMobile ? "hidden" : ""}>
                                        <Link to="blog">Blog</Link>
                                    </li>
                                    <li className={isMobile ? "hidden" : ""}>
                                        <span>
                                            <Link to="">
                                                Other
                                                <span>
                                                    <IoMdArrowDropdown />
                                                </span>
                                            </Link>
                                        </span>
                                        <div className="dropdown-menuLi">
                                            <ul>
                                                <li>
                                                    <span>
                                                        <Link to="contact">
                                                            Contact Us
                                                        </Link>
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>
                                                        <Link to="about">
                                                            About Us
                                                        </Link>
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>
                                                        <Link to="author">
                                                            Author
                                                        </Link>
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>
                                                        <Link to="faq">
                                                            FAQ
                                                        </Link>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="cart-icon">
                                        <Link to="cart">
                                            <FiShoppingCart className="icon" />
                                            {/* ({totalQuantity}) */}
                                            (0)
                                        </Link>
                                    </li>
                                    <li
                                        className={isMobile ? "hidden" : ""}
                                        id="searchInputLi"
                                        onFocus={handleFocus}
                                        onBlur={() => {
                                            setIsFocused(false);
                                            const searchIcon =
                                                document.querySelector<HTMLDivElement>(
                                                    "#searchInputLi .icon-search .icon"
                                                );
                                            if (searchIcon) {
                                                searchIcon.classList.remove(
                                                    "focused-icon"
                                                );
                                            }
                                        }}
                                    >
                                        <Link to="#">
                                            <div className="d-flex">
                                                <button className="icon-search">
                                                    <FiSearch className="icon" />
                                                </button>
                                                <form
                                                    action=""
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        dispatch(changeLimitNum(100));
                                                        dispatch(fetchProducts());                                         
                                                    }}
                                                >
                                                    <InputForm
                                                        value={search}
                                                        className={`input-search ${
                                                            isFocused
                                                                ? "focused-icon"
                                                                : ""
                                                        }`}
                                                        placeholder="Search | Ctrl K"
                                                        id="your-search-input-id2"
                                                        onChange={(e:any) => {
                                                            if (e.target.value.length > 100) {
                                                                toastUtils.warning("Maximum 100 characters", "");
                                                                return;
                                                            }
                                                            dispatch(changeSearch(e.target.value))
                                                        }}
                                                    />
                                                </form>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="login">
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                id="dropdown-basic"
                                                variant="link"
                                            >
                                                <Link to="">
                                                    <FaRegUser className="icon" />
                                                </Link>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="custom-dropdown-menu">
                                                {/* {admin ? (
                                                    <>
                                                        <Dropdown.Item>
                                                            <Link to="">
                                                                Hi, Admin
                                                                BookStore
                                                            </Link>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <Link to="dashboard">
                                                                Admin Page
                                                            </Link>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() =>
                                                                dispatch(
                                                                    clearUser()
                                                                )
                                                            }
                                                        >
                                                            <Link to="">
                                                                Logout
                                                            </Link>
                                                        </Dropdown.Item>
                                                    </>
                                                ) : (
                                                )} */}
                                                <Dropdown.Item>
                                                    <Link to="login">
                                                        Login
                                                    </Link>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                    <li
                                        className="mobile-icon"
                                        onClick={handleShow}
                                    >
                                        <span>
                                            <RiMenu3Fill className="icon" />
                                        </span>
                                    </li>
                                </ul>
                            </Col>
                        </Row>

                        <Row className="search-mobile">
                            <Col>
                                <form action="">
                                    <input
                                        type="text"
                                        className="input-search"
                                        placeholder="Search by Keywords"
                                        id="your-search-input-id1"
                                    />
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <Offcanvas
                className="custom-offcanvas"
                show={show}
                onHide={handleClose}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>MENU</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="custom-offcanvasBody-menu">
                    <ul className="mb-0">
                        <li>
                            <Link to="">Home</Link>
                        </li>
                        <li>
                            <Link to="/shop">
                                <span
                                    onClick={() =>
                                        setCategoriesOpen(!categoriesOpen)
                                    }
                                    aria-controls="example-collapse-text"
                                    aria-expanded={categoriesOpen}
                                >
                                    Categories
                                </span>
                                {/* <IoIosArrowDown />

                                <Collapse in={categoriesOpen}>
                                    <div id="example-collapse-text">
                                        <ul style={{ paddingLeft: "12px" }}>
                                            <li>
                                                <Link to="">Action</Link>
                                            </li>
                                            <li>
                                                <Link to="">Biography</Link>
                                            </li>
                                            <li>
                                                <Link to="">Childrens</Link>
                                            </li>
                                            <li>
                                                <Link to="">Cooking</Link>
                                            </li>
                                            <li>
                                                <Link to="">Drama</Link>
                                            </li>
                                            <li>
                                                <Link to="">Family</Link>
                                            </li>
                                            <li>
                                                <Link to="">Fiction</Link>
                                            </li>
                                            <li>
                                                <Link to="">History</Link>
                                            </li>
                                            <li>
                                                <Link to="">Mystery</Link>
                                            </li>
                                            <li>
                                                <Link to="">Politics</Link>
                                            </li>
                                            <li>
                                                <Link to="">Uncategorized</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Collapse> */}
                            </Link>
                        </li>
                        <li>
                            <Link to="blog">Blog</Link>
                        </li>
                        <li>
                            <Link to="">
                                <span
                                    onClick={() => setOtherOpen(!otherOpen)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={otherOpen}
                                >
                                    Other
                                </span>
                                <IoIosArrowDown />

                                <Collapse in={otherOpen}>
                                    <div id="example-collapse-text">
                                        <ul style={{ paddingLeft: "12px" }}>
                                            <li>
                                                <Link to="contact">
                                                    Contact Us
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="about">About Us</Link>
                                            </li>
                                            <li>
                                                <Link to="author">Author</Link>
                                            </li>
                                            <li>
                                                <Link to="faq">FAQ</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Collapse>
                            </Link>
                        </li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Header;
