import { Col, Container, Row } from "react-bootstrap";
import { useBlogStore } from "../../common/hooks/useCustomHooks";
import { MdOutlineDateRange } from "react-icons/md";
import "./styles/Blog.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../../features/blog/blogApi";
import * as React from "react";

const BlogDetail = () => {
    const dispatch = useDispatch();
    const { listBlogs } = useBlogStore();
    const { idBlog } = useParams();
    const detailBlog = listBlogs.filter(
        (item: any) => item.id.toString() === idBlog?.toString()
    );

    useEffect(() => {
        if (!listBlogs.length) {
            dispatch(fetchBlogs());
        }
    }, [dispatch, listBlogs.length]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <section className="blogDetail">
                <Container>
                    <Row>
                        <Col sm={12} className="blogDetail__img">
                            <div className="imgWrapper">
                                <img
                                    src={`https://websitebook-api.vercel.app${detailBlog[0]?.image}`}
                                    alt=""
                                />
                            </div>
                        </Col>
                        <Col sm={12} className="blogDetail__content">
                            <div className="blogDetail__content-title d-flex flex-column wrapperBlogDetail">
                                <h1 className="header mb-0">
                                    {detailBlog[0]?.title}
                                </h1>

                                <p className="date mb-0 d-flex align-items-center">
                                    <span>
                                        <MdOutlineDateRange />
                                    </span>{" "}
                                    <span>{detailBlog[0]?.date}</span>
                                </p>

                                <p className="mb-0 title">
                                    {detailBlog[0]?.content}
                                </p>
                            </div>
                            <div className="blogDetail__content-list d-flex flex-column">
                                {detailBlog[0]?.section.map(
                                    (item: any, index: number) => {
                                        return (
                                            <>
                                                <div
                                                    className="list-item wrapperBlogDetail d-flex flex-column"
                                                    key={index}
                                                >
                                                    <h2 className="itemTitle mb-0">
                                                        {item?.title}
                                                    </h2>
                                                    <p className="itemDescription mb-0">
                                                        {item?.description}
                                                    </p>

                                                    {item?.content &&
                                                        item.content.map(
                                                            (
                                                                contentItem: any,
                                                                index: number
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                    className="itemLibrary d-flex flex-column"
                                                                >
                                                                    <p className="title mb-0">
                                                                        <strong>
                                                                            {
                                                                                contentItem.subTitle
                                                                            }
                                                                        </strong>
                                                                    </p>
                                                                    <p className="mb-0">
                                                                        {
                                                                            contentItem.text
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            </>
                                        );
                                    }
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="blogDetailComment">
                <Container>
                    <Row>
                        <Col className="blogDetailComment-title" lg={12}>
                            <div className="titleWrapper wrapperBlogDetail">
                                <h2>6 Comments</h2>
                                <p>
                                    Join the discusion and tell us your opinion.{" "}
                                </p>
                            </div>
                        </Col>
                        <Col className="blogDetailComment-list" lg={12}>
                            <div className="listWrapper wrapperBlogDetail">
                                blog detail
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default BlogDetail;
