import React from "react";
import Button from "../elements/Button";
import { numberWithCommas } from "../utils";

 const ItemList = (items) => {
  console.log(items)
    return (
      <section className="container">
        <h4 className="mb-3 font-weight-medium">Browse</h4>
        <div className="grid-container gap-3">

          {items.data === 0 ? (
            <div className="row">
              <div className="col-auto align-items-center">
                {console.log('no item')}
                There is no item
              </div>
            </div>
          ) : (
            items.data.map((item, index) => {
                return (
                    <div className="card-category " style={{border:"1px solid #e9ecef", borderRadius:"5%"}} key={index}>
                        <figure className="img-wrapper" style={{ height: 180 }}>
                            <img src={item.ITM_IMAGE} alt={item.ITM_TITLE} className="img-cover" />
                        </figure>
                        <div className="meta-wrapper" style={{padding: "2px 8px"}}>
                            <Button
                                type="link"
                                href={`/item/${item.ITM_ID}`}
                                className="stretched-link d-block text-gray-800"
                                style={{ textDecoration: "none"}}
                            >
                                <h5 className="h4" style={{fontSize:"16px", color:"black"}}>{item.ITM_TITLE}</h5>
                            </Button>
                            <span className="text-gray-500" style={{fontSize:"13px"}}>
                                {item.CAT_NAME}
                            </span>
                            <span className="text-gray-500" style={{fontSize:"13px", float:"right"}}>
                                Rp. {numberWithCommas(item.ITM_PRICE)} 
                            </span>
                        </div>
                    </div>
                );
            })
          )}
        </div>
      </section>
    );

}

export default ItemList