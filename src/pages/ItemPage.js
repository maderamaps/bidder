import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import ItemDesc from "../parts/ItemDesc";
import axios from "axios";
import { motion } from "framer-motion";

const ItemPage = () => {
    const { id } = useParams();
    const [dataItem, setDataItem] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          await axios
            .get("http://localhost/api-bidder/public/api/getItem/"+id)
            .then((result) => {
              setDataItem(result.data);
              setIsLoading(false);
            });
        };
    
        fetchData();
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
            <ItemDesc data={dataItem} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ItemPage;
