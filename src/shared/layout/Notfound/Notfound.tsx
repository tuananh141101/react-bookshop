import { Link } from "react-router-dom";
import "./Notfound.scss";
import { motion } from "framer-motion";
import { btnAnimation } from "../../../common/constant/Constant";
import React from "react";

const Notfound = () => {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>Oops!</h1>
                        <h2>404 - The Page can't be found</h2>
                    </div>
                    <motion.div
                        className="btn-backpage"
                        variants={btnAnimation}
                        initial="hidden"
                        whileHover="show"
                    >
                        <Link to="/">Back To HomePage</Link>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Notfound;
