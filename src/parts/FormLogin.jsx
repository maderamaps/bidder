import React, { useState, useEffect, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import Button from "../elements/Button";
import axios from "axios";

import TextField from "@mui/material/TextField";
import { string } from "yup";
import { useDispatch } from "react-redux";

const FormLogin = (items) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  //validation
  const [passwordValid, setPasswordValid] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [CSRF, setCSRF] = useState(null);

  const handleChange = (e) => {
    //validation rules
    try {
      const value = e.currentTarget.value;
      /* eslint-disable */
      e.currentTarget.name == "password"
        ? (setPasswordValid(string().min(8).validateSync(value)),
          setPasswordValid(null))
        : null;
      e.currentTarget.name == "email"
        ? (setEmailValid(string().email().max(225).validateSync(value)),
          setEmailValid(null))
        : null;
    } catch (err) {
      e.currentTarget.name == "password" ? setPasswordValid(err.message) : null;
      e.currentTarget.name == "email" ? setEmailValid(err.message) : null;
    }
    //end validation rules
  };

  useEffect(() => {
    
      
  }, []);


  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    axios.defaults.withCredentials = true
    await axios
    .get("../sanctum/csrf-cookie")
    .then(function (response) {
      console.log(response);
      axios
      .post("/login", {
        withCredentials: true, 
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,       
      })
      .then(function (response) {
        if(response.data.error !== undefined){
            console.log(response.data.error)
        }else{
            dispatch({
                type: "LOGIN",
                id: response.data.user.USER_ID,
                name: response.data.user.USER_NAME,
                email: response.data.user.USER_EMAIL,
                birthdate: response.data.user.USER_BIRTHDATE,
                token: response.data.token,
              });
              // document.cookie = "token" +response.data.token;
              axios.defaults.headers.common['Authorization'] = `Bearer `+response.data.token;
              
              navigate('/');
        }
        setIsLoading(false);

        
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
    
  };

  return (
    <section
      className="container pt-4 pb-4"
      style={{
        border: "1px solid #e9ecef",
        borderRadius: "5%",
        padding: "2% 20%",
      }}
    >
      <div className="row align-items-center">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <TextField
              fullWidth
              error={emailValid == null ? false : true}
              helperText={emailValid}
              type="email"
              id="outlined-basic"
              name="email"
              label="Email"
              variant="outlined"
              inputRef={emailInputRef}
              onChange={handleChange}
              required={true}
            />
          </div>
          <br></br>

          <div className="form-group">
            <TextField
              fullWidth
              error={passwordValid == null ? false : true}
              helperText={passwordValid}
              type="password"
              id="outlined-basic"
              name="password"
              label="Password"
              variant="outlined"
              inputRef={passwordInputRef}
              required={true}
              onChange={handleChange}
            />
          </div>
          <br></br>

          <div className="form-group">
            <Button
              className="btn form-control"
              isLoading={isLoading}
              hasShadow
              isPrimary
            >
              Login 
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormLogin;
