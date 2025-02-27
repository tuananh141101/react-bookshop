import React, { useEffect } from 'react'
import "./style/DetailProduct.scss";
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
// import { motion } from "framer-motion";
// import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
// import { MdOutlineEmail } from 'react-icons/md';
import { useProductStore } from '../../common/hooks/useCustomHooks';
import { useDispatch } from 'react-redux';
import { fetchDetailProduct } from '../../features/products/productApi';

const DetailProduct = () => {
    const { listProducts, detailProducts, errorDetail } = useProductStore();
    console.log("🚀 ~ DetailProduct ~ detailProducts:", detailProducts)
    console.log("🚀 ~ DetailProduct ~ errorDetail:", errorDetail)
    const  { idProduct }  = useParams();
    const dispatch = useDispatch();
    

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
                    <Col>
                        hello
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default DetailProduct