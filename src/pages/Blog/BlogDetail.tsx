import { Col, Container, Row } from "react-bootstrap";
import { useBlogStore, useCommentStore } from "../../common/hooks/useCustomHooks";
import { MdOutlineDateRange } from "react-icons/md";
import "./styles/Blog.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../../features/blog/blogApi";
import * as React from "react";
import { fetchComments } from "../../features/comments/commentApi";
import { typeComment } from "../../common/constant/Constant";
import InputForm from "../../shared/components/InputForm/InputForm";
import { setReplyCommentForm, setReplyEmailForm, setReplyNameForm } from "../../features/comments/commentSlice";
import { toastUtils } from "../../common/utils/Toastutils";
import TextArea from "../../shared/components/InputForm/TextArea";

const BlogDetail = () => {
    const dispatch = useDispatch();
    const { listBlogs } = useBlogStore();
    const { listComments, replyCommentForm, replyEmailForm, replyNameForm } = useCommentStore();
    const { idBlog } = useParams();
    const detailBlog = listBlogs.filter(
        (item: any) => item.id.toString() === idBlog?.toString()
    );
    const commentsBlog = listComments.filter((item:typeComment) => {
        return item?.productId?.toString() === detailBlog[0]?.id?.toString() && item?.type.toString() === "blog"
    })
    useEffect(() => {
        if (!listBlogs.length) {
            dispatch(fetchBlogs());
        }
        if (!listComments.length) {
            dispatch(fetchComments());
        }
    }, [dispatch, listBlogs.length, listComments.length]);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);

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
                        <Col className="blogDetail__sharing">
                            <div className="shareNetworks wrapperBlogDetail">
                                <div className="share-title">
                                    <span>Share:</span>
                                </div>
                                <ul className="network-list d-flex align-items-center">
                                    <li>Facebook</li>
                                    <li>Twitter</li>
                                    <li>Instagram</li>
                                    <li>Pinterest</li>
                                    <li>Email</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="blogDetailComment">
                <Container>
                    <Row>
                        <Col className="blogDetailComment__title" lg={12}>
                            <div className="titleWrapper wrapperBlogDetail">
                                <h2>{commentsBlog?.length} Comments</h2>
                                <p>
                                    Join the discusion and tell us your opinion.{" "}
                                </p>
                            </div>
                        </Col>
                        <Col className="blogDetailComment__list" lg={12}>
                            <div className="listWrapper wrapperBlogDetail d-flex flex-column">
                                {commentsBlog.map((item:typeComment) => {
                                    return (
                                        <>
                                            <div className="comment d-flex" key={item.id}>
                                                <div className="commentAva">
                                                    <span className="ava-placeholder">
                                                        <img src="../../../public/assets/images/default-avatar-profile.webp" alt="" />
                                                    </span>
                                                </div>
                                                <div className="commentDetails">
                                                    <div className="name">{item?.name}</div>
                                                    <div className="date">{!item?.createdAt && "2025"}</div>
                                                    <div className="description">
                                                        {item?.content}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="blogDetailAddCmt">
                <Container>
                    <Row>
                        <Col className="commentRespond">
                            <div className="reply-title wrapperBlogDetail">
                                <h3 className="title">
                                    Leave a reply
                                </h3>
                            </div>

                            <form className="reply-form wrapperBlogDetail">
                                <div className="reply-form-comment d-flex flex-column">
                                    <label htmlFor="#">Comment <span style={{color: "red"}}>*</span></label>
                                    <TextArea 
                                        className="textarea-reply"
                                        value={replyCommentForm}
                                        onChange={(e:any) => {
                                            if (e.target.value.length >= 250) {
                                                toastUtils.warning("Quá số lượng ký tự cho phép", "");
                                                return;
                                            }
                                            dispatch(setReplyCommentForm(e.target.value));
                                        }}
                                        maxLength={250}
                                    />
                                </div>
                                <div className="reply-form-name d-flex flex-column">
                                    <label htmlFor="#">Name <span style={{color: "red"}}>*</span></label>
                                    <InputForm
                                        className="inputname-reply"
                                        value={replyNameForm}
                                        onChange={(e:any) => {
                                            const specialChars = /[!@#$%^&*()_+?><.,;:'"{}[\]\\|]/;
                                            if (specialChars.test(e.target.value)) {
                                                toastUtils.warning("Vui lòng không nhập ký tự đặc biệt", "");
                                                return
                                            }
                                            if (e.target.value.length >= 100) {
                                                toastUtils.warning("Quá số lượng ký tự cho phép");
                                                return;
                                            }

                                            dispatch(setReplyNameForm(e.target.value));
                                        }}
                                        maxLength={100}
                                    />
                                </div>
                                <div className="reply-form-email d-flex flex-column">
                                    <label htmlFor="#">Email <span style={{color: "red"}}>*</span></label>
                                    <InputForm
                                        className="inputemail-reply"
                                        value={replyEmailForm}
                                        type="email"
                                        onChange={(e:any) => {
                                            if (e.target.value >= 100) {
                                                toastUtils.warning("Quá số lượng ký tự cho phép");
                                                return; 
                                            }
                                            dispatch(setReplyEmailForm(e.target.value))
                                        }}
                                    />
                                </div>
                                <div className="buttonSubmit">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                    >Comment</button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default BlogDetail;
