import React, { useState, useEffect } from "react";

import Filter from "../parts/Filter";
import ItemList from "../parts/ItemList";
import axios from "axios";
import { motion } from "framer-motion";
import { useSelector } from 'react-redux'

const BrowserPage = () => {
  const [dataItem, setDataItem] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.TOKEN)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get("http://localhost/api-bidder/public/api/getItemAll" , { headers: {"Authorization" : `Bearer ${token}`} })
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
        {console.log(token)}
        <div className="container" style={{ paddingTop: "20px" }}>
          <div className="row">
            <div className="col-lg-2">
              <Filter data={BrowserPage.filter} stateChanger={setDataItem} />
            </div>
            <div className="col-lg-10">
              {isLoading === true ? (
                <>
                  {" "}
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span>Loading...</span>{" "}
                </>
              ) : (
                <ItemList data={dataItem} />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BrowserPage;
