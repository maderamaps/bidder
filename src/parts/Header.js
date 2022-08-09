import React from "react";

import Button from "../elements/Button";
import BrandIcon from "./IconText";

export default function Header(props) {
  const getNavLinkClass = (path) => {
    return window.location.pathname === path ? "active" : "";
  };

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
                <li className={`nav-item ${getNavLinkClass("/offer")}`}>
                    <Button className="nav-link btn btn-success" type="link" href="offer" style={{color:"white"}}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        style={{ width: "14px", fill:"white" }} 
                      >
                        <path strokeWidth="50" stroke="#ffff" d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                      </svg>
                      <b>&nbsp;Offer</b>
                    </Button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
