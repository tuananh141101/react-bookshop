import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import React from "react";

const Layout = () => {
    const hideLayout = location.pathname === "/checkout";
    return (
        <>
            {/* if the pathname = /checkout, hide header & footer.  */}
            {!hideLayout && <Header/>}
            <Outlet />
            {!hideLayout && <Footer/>}
        </>
    );
};

export default Layout;
