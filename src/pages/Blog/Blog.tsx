import { Container, Row, Col } from "react-bootstrap";
import "./styles/Blog.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useBlogStore } from "../../common/hooks/useCustomHooks";
import { useEffect } from "react";
import { fetchBlogs } from "../../features/blog/blogApi";
// import FilterBlog from "./components/FilterBlog/FilterBlog";
import BreadCrumb from "../../shared/components/Breadcrumb/BreadCrumb";
import { Accordion } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IoNewspaperOutline } from "react-icons/io5";
import * as React from "react";

const Blog = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { listBlogs } = useBlogStore();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!listBlogs.length) {
            dispatch(fetchBlogs());
        }
    }, [dispatch, listBlogs.length]);

    const breadcrumbItems = [
        { label: "Home", href: "/", active: false },
        { label: "Blog", href: "/blog", active: true },
    ];

    const handleFocusSearchBlog = () => {
        (
            document.querySelector("#icon-search-button .icon") as HTMLElement
        ).classList.add("active-icon");
    };

    const tags = [
        "advice",
        "books",
        "bookshop",
        "clients",
        "dating",
        "discount",
        "offer",
        "reviews",
        "restaurant",
        "reading",
        "e-books",
        "income",
        "print",
        "love",
        "quotes",
    ];

    return (
        <>
            <BreadCrumb items={breadcrumbItems} />
            <section className="blog">
                <Container>
                    <Row>
                        <Col>
                            <p className="mb-0">Blog</p>
                            <span>
                                Discover a variety of engrossing articles on the
                                books we know and love and their effects on us,
                                as well as readings into lesser-known works that
                                deserve more attention.
                            </span>
                        </Col>
                    </Row>

                    <Row>
                        <Col
                            className="custom-col sidebar d-flex justify-content-start"
                            lg={3}
                        >
                            {/* <FilterBlog /> */}
                            <Accordion defaultActiveKey="0" alwaysOpen>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Search</Accordion.Header>
                                    <Accordion.Body>
                                        <form action="" className="d-flex">
                                            <button
                                                className="icon-search d-flex align-items-center justify-content-center"
                                                id="icon-search-button"
                                            >
                                                <FiSearch className="icon" />
                                            </button>
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                onFocus={handleFocusSearchBlog}
                                                onBlur={() => {
                                                    (
                                                        document.querySelector(
                                                            "#icon-search-button .icon"
                                                        ) as HTMLElement
                                                    ).classList.remove(
                                                        "active-icon"
                                                    );
                                                }}
                                            />
                                        </form>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        Recent Posts
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="mb-0 recent-post-blog">
                                            <li>
                                                <p className="mb-0">
                                                    I was paid $12,500 to write
                                                    my book. Here's why I'm
                                                    revealing that
                                                </p>
                                            </li>
                                            <li>
                                                <p className="mb-0">
                                                    Should You Feel Embarrassed
                                                    for Reading Kids Books?
                                                </p>
                                            </li>
                                            <li>
                                                <p className="mb-0">
                                                    A Lost 'Little Boy' Nears
                                                    100: Poet And Publisher
                                                    Lawrence Ferlinghetti
                                                </p>
                                            </li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        Categories
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="mb-0 categories-blog">
                                            <li className="mb-0">
                                                <p className="mb-0">News</p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="mb-0">Opinion</p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="mb-0">Reviews</p>
                                            </li>
                                            <li className="mb-0">
                                                <p className="mb-0">
                                                    Uncategorized
                                                </p>
                                            </li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Tags</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="tags d-flex flex-wrap">
                                            {tags.map(
                                                (
                                                    item: string,
                                                    index: number
                                                ) => {
                                                    return (
                                                        <Link key={index}>
                                                            {item}
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col className="custom-col post" lg={9}>
                            <section className="product-post">
                                {listBlogs.map((item: any) => {
                                    return (
                                        <>
                                            <Col
                                                sm={12}
                                                className="custom-col d-flex"
                                                key={item.id}
                                                onClick={() => {
                                                    navigate(
                                                        `${item?.title}/${item?.id}`
                                                    );
                                                }}
                                            >
                                                <div className="post-thumbnail">
                                                    <img
                                                        src={`https://websitebook-api.vercel.app${item?.image}`}
                                                        alt=""
                                                    />
                                                    <div className="type">
                                                        <IoNewspaperOutline />
                                                    </div>
                                                </div>
                                                <div className="post-detail">
                                                    <ul className="mb-0">
                                                        <li className="mb-0">
                                                            <Link to="">
                                                                {item?.title}
                                                            </Link>
                                                        </li>
                                                        <li className="mb-0">
                                                            <Link to="">
                                                                {item?.content}
                                                            </Link>
                                                        </li>
                                                        <li className="mb-0">
                                                            <Link to="">
                                                                {item?.date}
                                                            </Link>
                                                        </li>
                                                        <li className="mb-0">
                                                            {item?.categories.join(
                                                                ", "
                                                            )}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Col>
                                        </>
                                    );
                                })}
                            </section>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Blog;
