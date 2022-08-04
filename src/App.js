import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/scss/style.scss";
import Header from "./parts/Header";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  // let location = useLocation();
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
