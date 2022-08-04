import React, { useState, useEffect } from "react";

import Button from "../elements/Button";
import { numberWithCommas } from "../utils";

const Filter = () => {
    const [rangeMin, setRangeMin] = useState(0);
    const [rangeMax, setRangeMax] = useState(0);
    
    useEffect(() => {
        // 👇️ call method in useEffect hook
        // const valueRangeMin = document.getElementById('filterRangeMin').value;
        // setRangeMin(valueRangeMin);
 /* eslint-disable */
  
    }, []);
    
    
    const handleChangeRangeMin = (event) => {
        setRangeMin(event.target.value);
      }

    const handleChangeRangeMax = (event) => {
        setRangeMax(event.target.value);
    }

    
  return (
    <section className="container pt-4 pb-4" style={{border:"1px solid #e9ecef", borderRadius:"5%"}}>
      <div className="row align-items-center">
        <form>
            
            <div className="form-group">
                <input className="form-control" type="search" name="filterName" placeholder="search" /><br></br>
            </div>

            <div className="form-group">
                <input className="form-control" type="text" name="filterKategori" placeholder="kategori" /><br></br>
            </div>

            <div className="form-group">
                <small>Minimum Price Rp. <small dangerouslySetInnerHTML={{__html: numberWithCommas(rangeMin)}} /></small>
                <input className="form-control" id="filterRangeMin" type="range" min="0" max="10000000" step={10000} onChange={(event) => handleChangeRangeMin(event)}></input><br></br>
            </div>

            <div className="form-group">
                <small>Maximum Price Rp. <small dangerouslySetInnerHTML={{__html: numberWithCommas(rangeMax)}} /></small>
                <input className="form-control" id="filterRangeMax" type="range" min={rangeMin} max="10000000" step={10000} onChange={(event) => handleChangeRangeMax(event)}></input><br></br>
            </div>

            <div className="form-group">
                <Button className="btn px-5 form-control" hasShadow isPrimary >Filter</Button >
            </div>

           
        </form>
      </div>
    </section>
  );
}

export default Filter