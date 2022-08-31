import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const AuthCheck = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    check();
  }, []);

  const check = async () => {
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
  return <></>;
};

export default AuthCheck;
