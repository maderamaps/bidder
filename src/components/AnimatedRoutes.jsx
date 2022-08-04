import React, { PureComponent } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import BrowserPage from "../pages/BrowserPage";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse-by" element={<BrowserPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
