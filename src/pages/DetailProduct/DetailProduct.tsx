import React, { useEffect, useState } from 'react'
import "./style/DetailProduct.scss";
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
// import { motion } from "framer-motion";
// import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
// import { MdOutlineEmail } from 'react-icons/md';
import { useProductStore } from '../../common/hooks/useCustomHooks';
import { useDispatch } from 'react-redux';
// import { fetchDetailProduct } from '../../features/products/productApi';
// import Notfound from '../../shared/layout/Notfound/Notfound';
import { btnAnimationBG } from '../../common/constant/Constant';
import { FaFacebookF, FaInstagram, FaRegHeart, FaTwitter } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

const DetailProduct = () => {
    const { listProducts, detailProducts, errorDetail } = useProductStore();
    console.log("🚀 ~ DetailProduct ~ detailProducts:", detailProducts)
    console.log("🚀 ~ DetailProduct ~ errorDetail:", errorDetail)
    const  { idProduct }  = useParams();
    console.log("🚀 ~ DetailProduct ~ idProduct:", idProduct)
    const dispatch = useDispatch();
    const [activeElem, setActiveElem] = useState<number>(0);
    

    // useEffect(() => {
    //     dispatch(fetchDetailProduct(Number(idProduct)));
    //     console.log("run useeff in detailproduct")
    // }, [dispatch, detailProducts.length])


    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
  return (
    <>
        <section className="detail-product">
            <Container>
                <Row>
                    <Col className="custom-col" lg={4}>
                        <div>
                            <img src="https://picsum.photos/200/300" alt="img-detail" />
                        </div>
                    </Col>

                    <Col className="custom-col" lg={8}>
                        <Link to="">
                            <p className="mb-0">
                                A Woman Is No Man: A Novel
                            </p>
                        </Link>

                        <ul className="preview-item__detail mb-0">
                            <li>
                                <span>item.price$</span>
                            </li>
                            <li>
                                <span>item.author</span>
                            </li>
                            <li>
                                <span>item.year_published</span>
                            </li>
                            <li>
                                <span>item.categories</span>
                            </li>
                            <li>
                                <span>item.page</span>
                            </li>
                            <li>
                                <span>item.language</span>
                            </li>
                            <li>
                                <span>item.author</span>
                            </li>
                        </ul>

                        <section className="d-flex align-items-center">
                            <button
                            onClick={(e) => {
                                e.preventDefault();
                                // dispatch(increaseItemQuantity(item.id));
                            }}
                            >
                                +
                            </button>
                            <input type="number" value="0" readOnly />
                            <button
                            onClick={(e) => {
                                e.preventDefault();
                                // if (quantityInput > 1) {
                                // setQuantityInput(quantityInput - 1);
                                // }
                            }}
                            // style={{
                            //     opacity: quantityInput === 1 ? "0.8" : "1",
                            // }}
                            >
                                -
                            </button>
                            <motion.div
                                className="icon add-to-cart d-flex align-items-center justify-content-center"
                                variants={btnAnimationBG}
                                initial="hidden"
                                whileHover="show"
                                // onClick={() => handleAddToCart(item)}
                            >
                                <span>Add To Cart</span>
                            </motion.div>
                            <motion.div
                                className="icon add-to-fav d-flex align-items-center justify-content-center"
                                variants={btnAnimationBG}
                                initial="hidden"
                                whileHover="show"
                            >
                                <FaRegHeart />
                            </motion.div>
                        </section>

                        <ul className="sharing mb-0 d-flex align-items-center">
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
                        </ul>
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
            <div
              className={`tabs descriptions-tab ${
                activeElem === 0 ? "active" : ""
              }`}
            >
              <Row>
                <Col>
                  {detailProducts.map((item:any, index:number) => {
                    return (
                      <>
                        <p key={index} className="mb-0">
                          {item.description}
                        </p>
                      </>
                    );
                  })}
                </Col>
              </Row>
            </div>

            <div
              className={`tabs details-tab ${activeElem === 1 ? "active" : ""}`}
            >
              <Row>
                <Col>0 Reviews</Col>
              </Row>
            </div>
          </Container>
        </section>
    </>
  )
}

export default DetailProduct