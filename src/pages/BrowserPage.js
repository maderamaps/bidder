import React, { useState, useEffect } from "react";

import Filter from "../parts/Filter";
import ItemList from "../parts/ItemList";
import axios from 'axios';
import { motion } from "framer-motion";


 const BrowserPage = () => {
  const [dataItem, setDataItem] = useState({});
  useEffect(() => {
    getItemAll()
  }, []);

  const getItemAll = async () => {
    await axios.get(`http://localhost/api-bidder/public/api/getItemAll`)
      .then(res => {
        setDataItem(res.data)
        console.log('test'+dataItem)

      })

  }

    return (
      <>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >
          <div className="container" style={{ paddingTop: "20px" }}>
            <div className="row">
              <div className="col-lg-2">
                <Filter data={BrowserPage.filter} />
              </div>
              <div className="col-lg-10">
                <ItemList data={dataItem} />
              </div>
            </div>
          </div>
        </motion.div>
      </>
    );
  }


export default BrowserPage
