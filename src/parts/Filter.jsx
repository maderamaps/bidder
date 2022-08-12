import React, { useState, useEffect } from "react";

import Button from "../elements/Button";
import { numberWithCommas } from "../utils";
import axios from "axios";


const Filter =  ({stateChanger, ...rest}) => {
    const [rangeMin, setRangeMin] = useState(0);
    const [rangeMax, setRangeMax] = useState(0);
    const [filterName, setFilterName] = useState("");
    const [filterKategori, setFilterKategori] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let tempRangeMax = null;
    
    useEffect(() => {
      // if(rangeMin > rangeMax){
      //   setRangeMax(rangeMin);
      // }
      // console.log('the rangeMin has changed', rangeMin)
      // console.log('the rangeMax has changed', rangeMax)
   }, [rangeMax, rangeMin])
    
    
    const handleChangeRangeMin = (event) => {
        setRangeMin(event.target.value);
      }

    const handleChangeRangeMax = (event) => {
        setRangeMax(event.target.value);
    }

    const handleSubmit = async (event) => {
      setIsLoading(true)
      event.preventDefault();
      // alert(`The name you entered was: ${filterName}\n
      //        The kategori you entered was: ${filterKategori}\n
      //        The Minimum Price you entered was: ${rangeMin}\n
      //        The Maximum Price you entered was: ${rangeMax}\n
      //       `);

      // eslint-disable-next-line no-unused-expressions
      (rangeMax !== 0)? (tempRangeMax=rangeMax, console.log('range max = '+tempRangeMax)) : tempRangeMax=document.getElementById("filterRangeMax").max;
      // eslint-disable-next-line no-unused-expressions
      (rangeMin !== 0 && rangeMin > rangeMax)? (tempRangeMax=rangeMin, console.log('rangeMin > rangeMax')): console.log('rangeMin < rangeMax');

      await axios.get(
        
        // "http://localhost/api-bidder/public/api/getItemFilter/"+filterName+"/"+filterKategori+"/"+rangeMin+"/"+rangeMax
        "http://localhost/api-bidder/public/api/getItemFilter?filterName="+filterName+"&&filterKategori="+filterKategori+"&&filterRangeMin="+rangeMin+"&&filterRangeMax="+tempRangeMax
        
      ).then((result) =>{
        stateChanger(result.data)
        setIsLoading(false)
      });

    }

    
  return (
    <section className="container pt-4 pb-4" style={{border:"1px solid #e9ecef", borderRadius:"5%"}}>
      <div className="row align-items-center">
        <form onSubmit={handleSubmit}>
            
            <div className="form-group">
                <input className="form-control" type="search" name="filterName" placeholder="search" onChange={(e) => setFilterName (e.target.value)} /><br></br>
            </div>

            <div className="form-group">
                <input className="form-control" type="text" name="filterKategori" placeholder="kategori" onChange={(e) => setFilterKategori (e.target.value)} /><br></br>
            </div>

            <div className="form-group">
                <small>Min. Price Rp. <small dangerouslySetInnerHTML={{__html: numberWithCommas(rangeMin)}} /></small>
                <input className="form-control" id="filterRangeMin" type="range" min="0" max="99999999" step={10000} onChange={(event) => handleChangeRangeMin(event)}></input><br></br>
            </div>

            <div className="form-group">
                <small>Max. Price Rp. <small dangerouslySetInnerHTML={{__html: numberWithCommas( (rangeMax < rangeMin)? rangeMin : rangeMax )}} /></small>
                <input className="form-control" id="filterRangeMax" type="range" min={rangeMin} max="99999999" step={10000} onChange={(event) => handleChangeRangeMax(event)}></input><br></br>
            </div>

            <div className="form-group">
                <Button className="btn form-control" isLoading={isLoading} hasShadow isPrimary  >Filter</Button >
            </div>

           
        </form>
      </div>
    </section>
  );
}

export default Filter