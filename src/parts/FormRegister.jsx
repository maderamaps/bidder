import React, { useState, useEffect, useRef } from "react";

import Button from "../elements/Button";
import { numberWithCommas } from "../utils";
import axios from "axios";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { string } from "yup";

const FormRegister = (items) => {
  const [birthdate, setBirthdate] = useState(null);
  const [helperTextPassword, setSelperTextPassword] = useState(null);
  const [errorPassword, setErrorPassword] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const birthdateInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  //validation
  const [nameValid, setNameValid] = useState(null);
  const [emailValid, setEmailValid] = useState(null);

  const handleChange = (e) => {
    //validation rules
    try {
      const value = e.currentTarget.value;
      /* eslint-disable */
      e.currentTarget.name == "name"
        ? (setNameValid(string().max(225).validateSync(value)),
          setNameValid(null))
        : null;
      e.currentTarget.name == "email"
        ? (setEmailValid(string().email().max(225).validateSync(value)),
          setEmailValid(null))
        : null;
    } catch (err) {
      e.currentTarget.name == "name" ? setNameValid(err.message) : null;
      e.currentTarget.name == "email" ? setEmailValid(err.message) : null;
    }
    //end validation rules
  };

  useEffect(() => {
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    inputPassword !== "" ? setIsLoading(true) : null;
    const timeOutId = setTimeout(
      () =>
        passwordInputRef.current.value !== confirmPasswordInputRef.current.value
          ? (setErrorPassword(true),
            setSelperTextPassword("password not match"))
          : (setErrorPassword(false),
            setSelperTextPassword(""),
            setIsLoading(false)),
      5000
    );
    return () => clearTimeout(timeOutId);
  }, [inputPassword]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    inputPassword !== "" ? setIsLoading(true) : null;
    const timeOutId = setTimeout(
      () =>
        passwordInputRef.current.value !== confirmPasswordInputRef.current.value
          ? (setErrorPassword(true),
            setSelperTextPassword("password not match"))
          : (setErrorPassword(false),
            setSelperTextPassword(""),
            setIsLoading(false)),
      3000
    );
    return () => clearTimeout(timeOutId);
  }, [inputConfirmPassword]);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    console.log("name: " + nameInputRef.current.value);
    console.log("birthday: " + birthdateInputRef.current.value);

    await axios
      .post("http://localhost/api-bidder/public/api/postRegister", {
        name: nameInputRef.current.value,
        email: emailInputRef.current.value,
        birthdate: birthdateInputRef.current.value,
        password: passwordInputRef.current.value,
        confirmPassword: confirmPasswordInputRef.current.value,
      })
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
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
        <h2>Form Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <TextField
              fullWidth
              error={nameValid == null ? false : true}
              helperText={nameValid}
              type="text"
              id="outlined-basic"
              name="name"
              label="Name"
              variant="outlined"
              inputRef={nameInputRef}
              onChange={handleChange}
              required={true}
            />
          </div>
          <br></br>

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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                error={emailValid == null ? false : true}
                helperText={emailValid}
                inputFormat="dd-MM-yyyy"
                label="Birthdate"
                value={birthdate}
                inputRef={birthdateInputRef}
                required={true}
                onChange={(newValue) => {
                  setBirthdate(newValue);
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </div>
          <br></br>

          <div className="form-group">
            <TextField
              fullWidth
              error={errorPassword}
              type="password"
              id="outlined-basic"
              name="password"
              label="Password"
              variant="outlined"
              inputRef={passwordInputRef}
              required={true}
              helperText={helperTextPassword}
              onChange={(event) => setInputPassword(event.target.value)}
            />
          </div>
          <br></br>

          <div className="form-group">
            <TextField
              fullWidth
              error={errorPassword}
              type="password"
              id="outlined-basic"
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              inputRef={confirmPasswordInputRef}
              required={true}
              helperText={helperTextPassword}
              onChange={(event) => setInputConfirmPassword(event.target.value)}
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
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormRegister;
