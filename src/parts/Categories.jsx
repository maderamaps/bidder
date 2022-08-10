import React from "react";
import Button from "../elements/Button";
import { numberWithCommas } from "../utils";

export default function Categories({ data }) {
  return data.map((category, index1) => {
    return (
      <section className="container" key={`category-${index1}`}>
   
        <h2 className="mb-3 font-weight-medium">{category.name}</h2>
        <div className="grid-container">
          {category.items.length === 0 ? (
            <div className="row">
              <div className="col-auto align-items-center">
                There is no item at this category
              </div>
            </div>
          ) : (
            category.items.map((item, index2) => {
              return (
                <div
                  className="grid-item item column-3 row-1"
                  key={`category-${index1}-items-${index2}`}
                >
                  <div className="card-category" style={{ boxShadow: 'rgb(0 0 0 / 12%) 0px 1px 6px 0px', borderRadius: '20px' }}>
                    {item.isPopular && (
                      <div className="tag">
                        Popular(" ")
                        <span className="font-weight-light">Choice</span>
                      </div>
                    )}
                    <figure className="img-wrapper" style={{ height: 180 }}>
                      <img src={item.imgUrl} alt={item.name} className="img-cover" />
                    </figure>
                    <div className="meta-wrapper">
                      <Button
                        type="link"
                        href={`/properties/${category.id}`}
                        className="stretched-link d-block text-gray-800"
                      >
                        <h4>{item.title}</h4>
                      </Button>
                      <span className="text-gray-500">
                        {item.title}, &nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          style={{ width: 20, marginBottom: '12px' }}
                        >
                          <path d="M.0003 64C.0003 46.33 14.33 32 32 32H112C191.5 32 256 96.47 256 176C256 234.8 220.8 285.3 170.3 307.7L221.7 436.1C228.3 452.5 220.3 471.1 203.9 477.7C187.5 484.3 168.9 476.3 162.3 459.9L106.3 320H64V448C64 465.7 49.67 480 32 480C14.33 480 0 465.7 0 448L.0003 64zM64 256H112C156.2 256 192 220.2 192 176C192 131.8 156.2 96 112 96H64V256zM400 160C461.9 160 512 210.1 512 272C512 333.9 461.9 384 400 384H352V480C352 497.7 337.7 512 320 512C302.3 512 288 497.7 288 480V192C288 174.3 302.3 160 320 160H400zM448 272C448 245.5 426.5 224 400 224H352V320H400C426.5 320 448 298.5 448 272z" />
                        </svg>.
                        {numberWithCommas(item.price)}
                      </span>
                    </div>
                  </div>
                </div>

              );
            })
            ////
          )
          }
          {category.items.length === 0 ? ('') : (
            <div className="grid-item item column-3 row-1" style={{padding: '10px 0 10px 0'}}>
              <div style={{height: '100%', width: '100%', padding: '20px 10px', boxShadow: 'rgb(0 0 0 / 12%) 0px 1px 6px 0px', borderRadius: '5px', cursor:'pointer'}}>
                <div style={{height: '100%', width: '100%', padding: '10px',  backgroundImage:'url(next.png)', backgroundSize:'30px 50px', backgroundRepeat: 'no-repeat', backgroundPosition:'center'}}>
                </div>
              </div>
            </div>
          )
          }

        </div>
      </section>
    );
  });
}