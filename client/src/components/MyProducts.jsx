import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "./Home.css";
import API_URL from "../constants";

function MyProducts() {
  const navigate = useNavigate();

  const [products, setproducts] = useState([]);
  const [cproducts, setcproducts] = useState([]);
  const [search, setsearch] = useState("");

  // useEffect(() => {
  //     if (!localStorage.getItem('token')) {
  //         navigate('/login')
  //     }
  // }, [])

  useEffect(() => {
    const url = API_URL + "/my-products";
    let data = { userId: localStorage.getItem("userId") };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.products) {
          setproducts(res.data.products);
        }
      })
      .catch((err) => {
        alert("Server Err.");
      });
  }, []);

  const handlesearch = (value) => {
    setsearch(value);
  };

  const handleClick = () => {
    let filteredProducts = products.filter((item) => {
      if (
        item.pname.toLowerCase().includes(search.toLowerCase()) ||
        item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    });
    setcproducts(filteredProducts);
  };

  const handleCategory = (value) => {
    let filteredProducts = products.filter((item, index) => {
      if (item.category == value) {
        return item;
      }
    });
    setcproducts(filteredProducts);
  };

  const deleteProduct = (productId) => {
    if (!localStorage.getItem("userId")) {
      return;
    }

    let userId = localStorage.getItem("userId");
    const url = `${API_URL}/delete-product?userId=${userId}&productId=${productId}`; // Construct the URL with query parameters

    axios
      .get(url)
      .then((res) => {
        if (res.data.message) {
          console.log("Deleted.");
        }
      })
      .catch((err) => {
        console.log("Server Err.");
      });
  };

  return (
    <div>
      <Header
        search={search}
        handlesearch={handlesearch}
        handleClick={handleClick}
      />

      <div className="d-flex justify-content-center flex-wrap">
        {cproducts &&
          products.length > 0 &&
          cproducts.map((item, index) => {
            return (
              <div key={item._id} className="card m-3 ">
                <img
                  width="300px"
                  height="200px"
                  src={API_URL + "/" + item.pimage}
                />

                <p className="m-2"> {item.category} </p>
                <h3 className="m-2 text-danger"> {item.price} </h3>
                <p className="m-2 text-success"> {item.pdesc} </p>
              </div>
            );
          })}
      </div>

      <h5> ALL RESULTS </h5>

      <div className="d-flex justify-content-center flex-wrap">
        {products &&
          products.length > 0 &&
          products.map((item, index) => {
            return (
              <div key={item._id} className="card m-3 ">
                <img
                  width="300px"
                  height="200px"
                  src={API_URL + "/" + item.pimage}
                />
                <p className="m-2"> {item.category} </p>
                <h3 className="m-2 text-danger"> {item.price} </h3>
                <p className="m-2 text-success"> {item.pdesc} </p>
                <Link to={`/edit-product/${item._id}`}> Edit </Link>
                <button onClick={() => deleteProduct(item._id)}>
                  {" "}
                  Delete{" "}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MyProducts;
