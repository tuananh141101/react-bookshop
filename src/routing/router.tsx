import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../shared/layout/Layout";
import Home from "../pages/Home/Home";
import Notfound from "../shared/layout/Notfound/Notfound";
import Shop from "../pages/Shop/Shop";
import Blog from "../pages/Blog/Blog";
import BlogDetail from "../pages/Blog/BlogDetail";
import Contact from "../pages/Contact/Contact";
import React from "react";
import About from "../pages/About/About";
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import Cart from "../pages/CartCheckout/Cart";

const router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Notfound />} />
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="shop" element={<Shop />} />

                        <Route path="blog" element={<Blog />} />
                        <Route path="blog/:nameBlog/:idBlog" element={<BlogDetail />} />

                        <Route path="contact" element={<Contact/>}/>
                        <Route path="about" element={<About/>}/>
                        <Route path="shop/product/:nameProduct/:idProduct" element={<DetailProduct/>}/>

                        <Route path="cart" element={<Cart/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default router;
