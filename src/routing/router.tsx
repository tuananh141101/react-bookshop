import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../shared/layout/Layout";
import Home from "../pages/Home/Home";
import Notfound from "../shared/layout/Notfound/Notfound";

const router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Notfound />}/>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />}/>
                        {/* Page 404 / Notfound */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default router;
