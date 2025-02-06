import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../shared/layout/Layout";
import Home from "../pages/Home/Home";
import Notfound from "../shared/layout/Notfound/Notfound";
import Shop from "../pages/Shop/Shop";
import Blog from "../pages/Blog/Blog";

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
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default router;
