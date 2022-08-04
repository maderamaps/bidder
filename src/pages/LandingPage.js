import React, { Component } from "react";

import Hero from "../parts/Hero";
import LiveBid from "../parts/LiveBid";
import Categories from "../parts/Categories";
import Data from "../json/sample4.json";
import { motion } from "framer-motion";

export default class LandingPage extends Component {
  render() {
    return (
      <>
        {/* <Header/> */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ x: window.innerWidth, transition: { duration:0.1} }}
        >
          <Hero data={LandingPage.hero} />
          <div style={{ marginTop: 100 }}></div>
          <LiveBid data={Data} />
          <Categories data={Data.categories} />
          {/* <Header location={this.props.location}></Header> */}
          {/* <h1>test</h1> */}
        </motion.div>
      </>
    );
  }
}
