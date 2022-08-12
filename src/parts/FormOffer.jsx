import React, { useState, useEffect } from "react";

import Button from "../elements/Button";
import { numberWithCommas } from "../utils";
import axios from "axios";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const FormOffer = (items) => {
  const [imgFile, setImgFile] = useState({});
  const [tempImgFile, setTempImgFile] = useState({});
  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(0);
  const [filterName, setFilterName] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  let tempRangeMax = null;

  useEffect(() => {
    resetState();
    console.log('state');
    console.log(imgFile);
<<<<<<< Updated upstream
    console.log(Object.keys(tempImgFile).length)

  }, []);
=======
  }, [imgFile]);
>>>>>>> Stashed changes

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
    let extension = e.target.files[0].type;
    // console.log(e.target.files[0].type)
    if (!extension.match("image")) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Please select valid image",
      });
    } else {
      setImgFile({
        ...imgFile,
        [key]: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const clickInput = (id) => {
    document.getElementById(id).click();
  };

  const removeImg = (id) => {
<<<<<<< Updated upstream
    console.log(id)

    setTempImgFile(imgFile);
    delete tempImgFile['file'+id];
    
    console.log(tempImgFile)

    setImgFile({});
    
  };

  const resetState = () => {
    console.log(Object.keys(tempImgFile).length)
    Object.values(tempImgFile).map((test, index) => {
        let key = "file" + index;
        console.log(test)
        setImgFile({
            ...imgFile,
            [key]: test,
          });
    })
  }

=======
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

>>>>>>> Stashed changes
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
          </div>
<<<<<<< Updated upstream

          <div className="form-group">
            <input
              className="form-control"
              type="search"
              name="filterName"
              placeholder="search"
              onChange={(e) => setFilterName(e.target.value)}
            />
            <br></br>
=======
          <br></br>

          <div className="form-group">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
              >
                <MenuItem value="">-</MenuItem>
                <MenuItem value="automotive">Automotive</MenuItem>
                <MenuItem value="handphone">Handphone</MenuItem>
              </Select>
            </FormControl>
>>>>>>> Stashed changes
          </div>
          <br></br>

          <div className="form-group">
            <TextField
              fullWidth
              type="text"
<<<<<<< Updated upstream
              name="filterKategori"
              placeholder="kategori"
              onChange={(e) => setFilterKategori(e.target.value)}
=======
              id="outlined-basic"
              name="title"
              label="Title"
              variant="outlined"
              onChange={(e) => setFilterName(e.target.value)}
>>>>>>> Stashed changes
            />
          </div>
          <br></br>

<<<<<<< Updated upstream
          <div className="form-group">
            <small>
              Min. Price Rp.{" "}
              <small
                dangerouslySetInnerHTML={{ __html: numberWithCommas(rangeMin) }}
              />
            </small>
            <input
              className="form-control"
              id="filterRangeMin"
              type="range"
              min="0"
              max="99999999"
              step={10000}
              onChange={(event) => handleChangeRangeMin(event)}
            ></input>
=======
          <div className="input-group mb-3">
            <span className="input-group-text">Rp.</span>
            <input
              type="number"
              className="form-control"
              placeholder="Start Bid"
            />
>>>>>>> Stashed changes
            <br></br>
          </div>

          <div className="form-group">
<<<<<<< Updated upstream
            <small>
              Max. Price Rp.{" "}
              <small
                dangerouslySetInnerHTML={{
                  __html: numberWithCommas(
                    rangeMax < rangeMin ? rangeMin : rangeMax
                  ),
                }}
              />
            </small>
            <input
              className="form-control"
              id="filterRangeMax"
              type="range"
              min={rangeMin}
              max="99999999"
              step={10000}
              onChange={(event) => handleChangeRangeMax(event)}
            ></input>
            <br></br>
=======
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
            />
>>>>>>> Stashed changes
          </div>
          <br></br>

<<<<<<< Updated upstream
=======
          <div className="form-group">
            <div
              className="row col-lg-12 col-md-12 col-sm-12"
              style={{ margin: "0px" }}
            >
              <div className="col-md-6" style={{ paddingLeft: "0px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Bid Date"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-md-6" style={{ paddingRight: "0px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Bid Date"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <br></br>

>>>>>>> Stashed changes
          <div className="form-group">
            <Button
              className="btn form-control"
              isLoading={isLoading}
              hasShadow
              isPrimary
            >
              Filter
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormOffer;
