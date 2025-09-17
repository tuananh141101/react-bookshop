import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import React from "react";

const Layout = () => {
    return (
        <>
            {/* if the pathname = /checkout, hide header & footer.  */}
            <Header/>
            <Outlet />
            <Footer/>
        </>
    );
};

export default Layout;
