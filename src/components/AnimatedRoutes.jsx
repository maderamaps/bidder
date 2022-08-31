import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import BrowserPage from "../pages/BrowserPage";
import ItemPage from "../pages/ItemPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { AnimatePresence } from "framer-motion";
import OfferPage from "../pages/OfferPage";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

function AnimatedRoutes() {
  const location = useLocation();
  const token = useSelector((state) => state.TOKEN)
  const dispatch = useDispatch();

  const AuthCheck = async () => {
    await axios
      .get("/authValid")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: "LOGOUT",
        });
        axios.defaults.headers.common["Authorization"] = ``;
      });
  };

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>   
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse-by" element={<BrowserPage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {token !== "" ? <Route path="/offer" element={<OfferPage />} /> : null}
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
