import React from "react";
import Button from "../elements/Button";
import { numberWithCommas } from "../utils";

 const ItemLIst = (data) => {
  console.log(data)
    return (
      <section className="container">
        <h4 className="mb-3 font-weight-medium">Browse</h4>
        <div className="grid-container gap-3">

          {data.length === 0 ? (
            <div className="row">
              <div className="col-auto align-items-center">
                There is no item
              </div>
            </div>
          ) : (
            data.map((item, index) => {
                return (
                    <div className="card-category " style={{border:"1px solid #e9ecef", borderRadius:"5%"}}>
                        <figure className="img-wrapper" style={{ height: 180 }}>
                            <img src={item.imgUrl} alt={item.name} className="img-cover" />
                        </figure>
                        <div className="meta-wrapper" style={{padding: "2px 8px"}}>
                            <Button
                                type="link"
                                href={`/properties`}
                                className="stretched-link d-block text-gray-800"
                            >
                                <h5 className="h4" style={{fontSize:"16px"}}>{item.title}</h5>
                            </Button>
                            <span className="text-gray-500" style={{fontSize:"13px"}}>
                                {/* Rp. {numberWithCommas(item.price)}  */}
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

export default ItemLIst