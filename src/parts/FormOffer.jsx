import React, { useState, useEffect } from "react";

import Button from "../elements/Button";
import { numberWithCommas } from "../utils";
import axios from "axios";

const FormOffer = (items) => {
  const [imgFile, setImgFile] = useState({});
  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(0);
  const [filterName, setFilterName] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let tempRangeMax = null;

  useEffect(() => {
    console.log(imgFile);

  }, [imgFile]);

  const handleChangeRangeMin = (event) => {
    setRangeMin(event.target.value);
  };

  const handleChangeRangeMax = (event) => {
    setRangeMax(event.target.value);
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    // eslint-disable-next-line no-unused-expressions
    rangeMax !== "0"
      ? ((tempRangeMax = rangeMax), console.log("range max = " + tempRangeMax))
      : (tempRangeMax = document.getElementById("filterRangeMax").max);
    // eslint-disable-next-line no-unused-expressions
    rangeMin !== "0" && rangeMin > rangeMax
      ? ((tempRangeMax = rangeMin), console.log("rangeMin > rangeMax"))
      : console.log("rangeMin < rangeMax");

    await axios
      .get(
        // "http://localhost/api-bidder/public/api/getItemFilter/"+filterName+"/"+filterKategori+"/"+rangeMin+"/"+rangeMax
        "http://localhost/api-bidder/public/api/getItemFilter?filterName=" +
        filterName +
        "&&filterKategori=" +
        filterKategori +
        "&&filterRangeMin=" +
        rangeMin +
        "&&filterRangeMax=" +
        tempRangeMax
      )
      .then((result) => {
        setIsLoading(false);
      });
  };

  const uploadSingleFile = (e, id) => {
    let index = Object.keys(imgFile).length;
    let key = "file" + index;
    setImgFile({
      ...imgFile,
      [key]: URL.createObjectURL(e.target.files[0]),
    });
  };

  const clickInput = (id) => {
    document.getElementById(id).click();
  };

  const removeImg = (id) => {

    delete imgFile['file' + id];
    let temp = []
    Object.values(imgFile).map((data, index) => {
      let key = "file" + index;
      temp = {
        ...temp,
        [key]: data,
      };
    })
    setImgFile(temp)

  };


  return (
    <section
      className="container pt-4 pb-4"
      style={{ border: "1px solid #e9ecef", borderRadius: "5%" }}
    >
      <div className="row align-items-center">
        <form onSubmit={handleSubmit}>
          <div className="grid-container">
            {Object.values(imgFile).map((img, index) => {
              return (
                <div
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: `cover`,
                  }}
                  key={index}
                  className="divImgInp grid-item item column-3 row-1"
                  onClick={() => removeImg(index)}
                >
                  <svg
                    className="svgDelete"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                  </svg>

                  <input
                    hidden
                    className="form-control"
                    type="file"
                    onChange={(e) => uploadSingleFile(e, "file" + index)}
                  />
                </div>
              );
            })}

            {Object.keys(imgFile).length >= 4 ? null : (
              <div
                className="divImgInp grid-item item column-3 row-1"
                onClick={() => clickInput("imgInp")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    strokeWidth="50"
                    stroke="#00000"
                    d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
                  />
                </svg>
                <input
                  hidden
                  className="form-control"
                  type="file"
                  name="imgInp"
                  id="imgInp"
                  onChange={(e) => uploadSingleFile(e, "file")}
                />
              </div>
            )}
          </div><br></br>

          <div className="form-group">
            <select className="form-select" aria-label="Default select example">
              <option selected>Select Category</option>
              <option value="automotive">Automotive</option>
              <option value="handphone">Handphone</option>
            </select>
            <br></br>
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setFilterName(e.target.value)}
            />
            <br></br>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">Rp.</span>
            <input type="number" className="form-control" placeholder="Start Bid" />
            <br></br>
          </div>

          <div className="form-group">
            <textarea className="form-control"
              type="text"
              name="price"
              placeholder="Description"
              rows={3}></textarea>
            <br></br>
          </div>



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

export default FormOffer;
