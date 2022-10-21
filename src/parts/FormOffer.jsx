import React, { useState, useEffect, useRef } from "react";

import Button from "../elements/Button";
import { numberWithCommas } from "../utils";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const FormOffer = (items) => {
  const [imgFile, setImgFile] = useState({});
  const titleInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryIdInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(imgFile);
  }, [imgFile]);

  const handleSubmitOffer = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    await axios
      .get("../sanctum/csrf-cookie")
      .then(function (response) {
        axios
          .post("/postItem", {
            categoryId: categoryIdInputRef.current.value,
            title: titleInputRef.current.value,
            price: priceInputRef.current.value,
            description: descriptionInputRef.current.value,
          })
          .then(function (response) {
            console.log(response);
            setIsLoading(false);
          })
          .catch(function (error) {
            console.log(error);
            setIsLoading(false);
          });
      })
      .catch(function (error) {
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
    delete imgFile["file" + id];
    let temp = [];
    Object.values(imgFile).map((data, index) => {
      let key = "file" + index;
      temp = {
        ...temp,
        [key]: data,
      };
    });
    setImgFile(temp);
  };

  return (
    <section
      className="container pt-4 pb-4"
      style={{ border: "1px solid #e9ecef", borderRadius: "5%" }}
    >
      <div className="row align-items-center">
        <form onSubmit={handleSubmitOffer}>
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
          </div>
          <br></br>

          <div className="form-group mb-3">
            <TextField
              className="form-select"
              aria-label="Default select example"
              defaultValue={""}
              name="category"
              label="Category"
              select
              inputRef={categoryIdInputRef}
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              <MenuItem value="1">Automotive</MenuItem>
              <MenuItem value="2">Handphone</MenuItem>
            </TextField>
            <br></br>
          </div>

          <div className="form-group mb-3">
            <TextField
              className="form-control"
              type="text"
              name="title"
              label="Title"
              placeholder="Title"
              inputRef={titleInputRef}
            />
            <br></br>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">Rp.</span>
            <TextField
              type="number"
              name="Start Bid"
              label="Start Bid"
              className="form-control"
              inputRef={priceInputRef}
            />
            <br></br>
          </div>

          <div className="form-group mb-3">
            <TextField
              className="form-control"
              type="text"
              name="Description"
              label="Description"
              inputRef={descriptionInputRef}
              multiline
              rows={4}
            />
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
