import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./ProductDetail.css";
import API_URL from "../constants";

const ProductDetail = () => {
  const [product, setproduct] = useState();
  const [user, setuser] = useState();
  console.log(user, "userrrrr");
  const p = useParams();

  useEffect(() => {
    const url = API_URL + "/products/" + p.productId;
    axios
      .get(url)
      .then((res) => {
        if (res.data.product) {
          setproduct(res.data.product);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  const handleContactButtonClick = () => {
    window.open(
      `https://wa.me/91${product.contact}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <Header />
      <div>
        {product && (
          <div className="productWrapper">
            <div className="productDetailImage">
              <img
                width="400px"
                height="200px"
                src={API_URL + "/" + product.pimage}
                alt=""
              />
              {product.pimage2 && (
                <img
                  width="400px"
                  height="200px"
                  src={API_URL + "/" + product.pimage2}
                  alt=""
                />
              )}
            </div>
            <div className="productInfo">
              <div className="productTitle">{product.pname}</div>

              <div> ₹ {product.price} /- </div>
              
              <p className="productDescription"> Description: {product.pdesc} </p>

              <button onClick={handleContactButtonClick} id="sendButton">
                Contact
              </button>

              {/* {product.addedBy &&
                        <button onClick={() => handleContact(product.addedBy)}>
                            SHOW CONTACT DETAILS
                        </button>} */}
              {/* {user && user.username && <h4>{user.username}</h4>}
                    {user && user.mobile && <h3>{user.mobile}</h3>}
                    {user && user.email && <h6>{user.email}</h6>} */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
