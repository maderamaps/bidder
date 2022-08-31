import React from "react";

import Button from "../elements/Button";
import BrandIcon from "./IconText";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Header(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.TOKEN)
  const USER_ID = useSelector((state) => state.USER_ID)
  const getNavLinkClass = (path) => {
    return window.location.pathname === path ? "active" : "";
  };

  const logout = async () =>{
    
    axios.defaults.withCredentials = true
    dispatch({
      type: "LOGOUT",
    })
    await axios
      .get("/postLogout")
      .then(function (response) {
        axios.defaults.headers.common['Authorization'] = ``;
      })
      .catch(function (error) {
        console.log(error);
      });

      
  }

  return (
    <header className="spacing-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <BrandIcon />
          <div className="collapse navbar-collapse">
            <div className="col col-lg-5 col-md-5 col-sm-0"></div>
            <div className="col col-lg-7 col-md-7 col-sm-12">
              <ul className="navbar-nav ml-auto">
                <li className={`nav-item ${getNavLinkClass("/")}`}>
                  <Button className="nav-link" type="link" href="/">
                    Home
                  </Button>
                </li>
                <li className={`nav-item ${getNavLinkClass("/browse-by")}`}>
                  <Button className="nav-link" type="link" href="browse-by">
                    Browse By
                  </Button>
                </li>
                <li className={`nav-item ${getNavLinkClass("/stories")}`}>
                  <Button className="nav-link" type="link" href="stories">
                    Stories
                  </Button>
                </li>

                {useSelector((state) => state.USER_ID) !== "" ? (
                  <>
                    <li className={`nav-item ${getNavLinkClass("/offer")}`}>
                      <Button
                        className="nav-link btn btn-success"
                        type="link"
                        href="offer"
                        style={{ color: "white" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          style={{ width: "14px", fill: "white" }}
                        >
                          <path
                            strokeWidth="50"
                            stroke="#ffff"
                            d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
                          />
                        </svg>
                        <b>&nbsp;Offer</b>
                      </Button>
                    </li>

                    <li className={`nav-item ${getNavLinkClass("/logout")}`}>
                      <Button
                        className="nav-link btn"
                        type="link"
                        href="/"
                        onClick={() =>
                          logout()
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          style={{ fill: "black", width: "20px" }}
                        >
                          <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
                        </svg>
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className={`nav-item ${getNavLinkClass("/login")}`}>
                      <Button
                        className="nav-link btn"
                        type="link"
                        href="login"
                        style={{ color: "white", backgroundColor: "#254BD8" }}
                      >
                        <b>Log In</b>
                      </Button>
                    </li>
                    <li className={`nav-item ${getNavLinkClass("/register")}`}>
                      <Button
                        className="nav-link btn"
                        type="link"
                        href="register"
                        style={{
                          color: "white",
                          marginLeft: "10px",
                          backgroundColor: "#808080",
                        }}
                      >
                        <b>Sign Up</b>
                      </Button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
