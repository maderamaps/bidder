import React, { useState, useEffect } from "react";

import FormLogin from "../parts/FormLogin";
import axios from "axios";
import { motion } from "framer-motion";

const LoginPage = () => {
    const [dataItem, setDataItem] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
       
      }, []);

  return (
    <>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      >
        <div className="container" style={{ paddingTop: "20px" }}>
          <div className="row">
            <FormLogin data={LoginPage.FormLogin} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LoginPage;
