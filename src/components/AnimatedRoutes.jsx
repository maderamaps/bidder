import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import BrowserPage from "../pages/BrowserPage";
import ItemPage from "../pages/ItemPage";
import OfferPage from "../pages/OfferPage";
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
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
