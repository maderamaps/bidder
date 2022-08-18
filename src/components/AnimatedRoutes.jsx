import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import BrowserPage from "../pages/BrowserPage";
import ItemPage from "../pages/ItemPage";
import OfferPage from "../pages/OfferPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse-by" element={<BrowserPage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/offer" element={<OfferPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
