import React, {useState,useEffect} from 'react';
import "./style/DetailProduct.scss";
import { fetchDetailProduct, fetchProducts } from '../../features/products/productApi';
import { useProductStore } from '../../common/hooks/useCustomHooks';
import { motion } from "framer-motion";
import { typeProduct } from '../../common/constant/Constant';
import {Col,Row,Container, Nav} from "react-bootstrap";
import { Link,useNavigate,useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { FaFacebookF, FaInstagram, FaRegHeart, FaTwitter } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { AppDispatch } from '../../app/store';
import { btnAnimationBG } from '../../common/constant/Constant';
import CartItem from '../../shared/components/CartItem/CartItem';


const DetailProduct = () => {
    const {listProducts, detailProducts, errorDetail, loadingDetailData} = useProductStore();
    const dispatch = useDispatch<AppDispatch>();
    const {idProduct,nameProduct} = useParams();
    const [activeElem, setActiveElem] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!Array.isArray(listProducts) || listProducts.length === 0) {
            dispatch(fetchProducts());
        }
    }, [listProducts.length]);
     
    useEffect(() => {
        if (detailProducts && detailProducts?.name) {
            const correctName = detailProducts?.name.replace(/\s+/g, "-");

            if (idProduct !== detailProducts?.id) {
                navigate(`/shop/product/${correctName}/${detailProducts?.id}`, { replace: true });
            }
        }
    }, [detailProducts, nameProduct, idProduct, navigate, dispatch]);

    useEffect(() => {
        if (!detailProducts || detailProducts?.id !== Number(idProduct)) {
            dispatch(fetchDetailProduct(Number(idProduct)));
        }
    }, [dispatch, idProduct]);

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    const handleClickCardScrollToTop = (event: React.MouseEvent<HTMLDivElement>) => {
        window.scrollTo(0,0)
    }

    return (
        <>
            {loadingDetailData ? (
                <p>Loading Data</p>
            ) : (
                <>
                    <section className="detail-product">
                        <Container>
                            <Row>
                                <Col className="custom-col" lg={4}>
                                    <div><img src={`https://websitebook-api.vercel.app${detailProducts?.image}`} alt="image" /></div>
                                </Col>

                                <Col className="custom-col" lb={8}>
                                    <Link to="">
                                        <p className="mb-0">{detailProducts?.name}</p>
                                    </Link>

                                    <ul className="preview-item__detail mb-0">
                                        <li>
                                            <span>{detailProducts?.price}$</span>
                                        </li>
                                        <li>
                                            <span>Publisther: </span>
                                            <span>{detailProducts?.author}</span>
                                        </li>
                                        <li>
                                            <span>YearPublisther: </span>
                                            <span>{detailProducts?.yearpublished}</span>
                                        </li>
                                        <li>
                                            <span>Categories: </span>
                                            <span>{detailProducts?.categories}</span>
                                        </li>
                                        <li>
                                            <span>Pages: </span>
                                            <span>{detailProducts?.pages}</span>
                                        </li>
                                        <li>
                                            <span>Language: </span>
                                            <span>{detailProducts?.language}</span>
                                        </li>
                                        <li>
                                            <span>Author: </span>
                                            <span>{detailProducts?.author}</span>
                                        </li>
                                    </ul>

                                    <div className="button-cart d-flex align-items-center">
                                        <form action="">
                                            <button>
                                                +
                                            </button>
                                            <input type="number" value={0} readOnly />
                                            <button>
                                                -
                                            </button>
                                        </form>

                                        <motion.div className="icon add-to-cart d-flex align-items-center justify-content-center"
                                            initial="hidden"
                                            whileHover="show"
                                            variants={btnAnimationBG}
                                        >
                                            <span>Add To Cart</span>
                                        </motion.div>

                                        <motion.div className="icon icon-fav add-to-fav d-flex align-items-center justify-content-center"
                                            initial="hidden"
                                            whileHover="show"
                                            variants={btnAnimationBG}
                                        >
                                            <FaRegHeart />
                                        </motion.div>
                                    </div>

                                    <div className="sharing mb-0 d-flex align-items-center">
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
                                    </div>

                                    <div className="send-email">
                                        <span className="d-flex align-items-center justify-content-start">
                                            <MdOutlineEmail style={{ paddingRight: "4px" }} />
                                            Email to friend.
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section className="navs-and-tabs">
                        <Container>
                            <Row>
                                <Col>
                                    <Nav variant="underline" defaultActiveKey={activeElem}>
                                        <Nav.Item>
                                            <Nav.Link eventKey={0} onClick={() => setActiveElem(0)}>
                                                Description
                                            </Nav.Link>
                                        </Nav.Item>

                                        <Nav.Item>
                                            <Nav.Link eventKey={1} onClick={() => setActiveElem(1)}>
                                                Reviews<span>(0)</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section className="more-info">
                        <Container>
                            <div className={`tabs descriptions-tab ${activeElem === 0 ? "active" : ""}`}>
                                <Row>
                                    <Col>
                                        <p className="mb-0">{detailProducts?.description}</p>
                                    </Col>
                                </Row>
                            </div>

                            <div className={`tabs details-tab ${activeElem === 1 ? "active" : ""}`}>
                                <Row>
                                    <Col>
                                        <p className="mb-0">
                                            0 Reviews
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>

                    <section className="related-product">
                        <Container>
                            <Row>
                                <Col>
                                    <p className="mb-0">Related Product</p>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="d-flex align-items-center"
                                    onClick={handleClickCardScrollToTop}
                                >
                                    {listProducts?.slice(0,4).map((item:typeProduct,index:number) => {
                                        return (
                                            <>
                                                <CartItem
                                                    style={{ width: "100%" }}
                                                    items={item}
                                                    index={index}
                                                />
                                            </>
                                        )
                                    })}
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </>
            )}
        </>
    )
}

export default DetailProduct