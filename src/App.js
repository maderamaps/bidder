import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/scss/style.scss";
import Header from "./parts/Header";
import AnimatedRoutes from "./components/AnimatedRoutes";
import axios from 'axios';
import { useSelector } from 'react-redux'


const App = () => {
const token = useSelector((state) => state.TOKEN)
axios.defaults.baseURL = 'http://localhost/api-bidder/public/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = `Bearer `+token;

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
