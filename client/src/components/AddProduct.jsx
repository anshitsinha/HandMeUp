import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();
  const [pname, setPname] = useState("");
  const [pdesc, setPdesc] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [pimage, setPimage] = useState("");
  const [pimage2, setPimage2] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const addProduct = () => {
    const formData = new FormData();
    formData.append("pname", pname);
    formData.append("pdesc", pdesc);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("age", age);
    formData.append("category", category);
    formData.append("pimage", pimage);
    formData.append("pimage2", pimage2);
    formData.append("userId", localStorage.getItem("userId"));

    const url = "http://localhost:4000" + "/add-product";
    axios
      .post(url, formData)
      .then((res) => {
        if (res.data.message) {
          console.log(res.data.message);
          // navigate('/')
        }
      })
      .catch((err) => {
        console.log("server err", err);
      });
  };

  const handleInputFocus = (e) => {
    e.target.parentNode.classList.add("input--filled");
  };

  const handleInputBlur = (e) => {
    const parent = e.target.parentNode;
    if (e.target.value.trim() === "") {
      parent.classList.remove("input--filled");
    }
  };

  return (
    <div>
      <Header />
      <div className="addProductForm">
        <div className="addProductFormContainer">
          <div className="addProductImages">
            <label>Product Image</label>
            <input
              className="form-control"
              type="file"
              onChange={(e) => {
                setPimage(e.target.files[0]);
              }}
            />

            <label>Product Second Image</label>
            <input
              className="form-control"
              type="file"
              onChange={(e) => {
                setPimage2(e.target.files[0]);
              }}
            />
          </div>
          <div className="addProductDetails">
            <span className="input">
              <input
                type="text"
                className="input__field"
                id="input-1"
                value={pname}
                onChange={(e) => {
                  setPname(e.target.value);
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <label htmlFor="input-1" className="input__label">
                <span className="input__label-content">Product Name</span>
              </label>
            </span>

            <span className="input">
              <input
                type="text"
                className="input__field"
                id="input-3"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <label htmlFor="input-3" className="input__label">
                <span className="input__label-content">Product Price</span>
              </label>
            </span>

            <span className="input">
              <input
                type="text"
                className="input__field"
                id="input-4"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <label htmlFor="input-4" className="input__label">
                <span className="input__label-content">Location</span>
              </label>
            </span>

            <span className="input">
              <input
                type="text"
                className="input__field"
                id="input-5"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <label htmlFor="input-5" className="input__label">
                <span className="input__label-content">Age</span>
              </label>
            </span>

            <span className="input message">
              <input
                type="text"
                className="input__field"
                id="input-2"
                value={pdesc}
                onChange={(e) => {
                  setPdesc(e.target.value);
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <label htmlFor="input-2" className="input__label">
                <span className="input__label-content">Product Desc</span>
              </label>
            </span>

            <button id="send-button" onClick={addProduct} type="button">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
