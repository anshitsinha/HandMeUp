import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "./Home.css";
import Header from "./Header";

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setsearch] = useState("");
  const [isSearch, setisSearch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:4000/products";
        const response = await axios.get(url);
        if (response.data.products) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value) => {
    setsearch(value);
  };

  const handleClick = () => {
    const url = "http://localhost:4000" + "/search?search=" + search;
    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products);
        // setissearch(true);
      })
      .catch((err) => {
        alert("Server Err.");
      });

    // let filteredProducts = products.filter((item) => {
    //     if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
    //         item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
    //         item.category.toLowerCase().includes(search.toLowerCase())) {
    //         return item;
    //     }
    // })
    // setProducts(filteredProducts)
  };

  const handleProduct = (id) => {
    navigate("/product/" + id);
  };
  return (
    <div>
      <Header
        search={search}
        handleSearch={handleSearch}
        handleClick={handleClick}
      />

      {/* <input type="text" />
      <button>Search</button> */}
      {/* Render your products here */}
      {/* {isSearch && products && products.length == 0 && <h5> No Results Found </h5>} */}
      <div className="productsGrid">
        {products &&
          products.length > 0 &&
          products.map((item, index) => (
            <div
              onClick={() => handleProduct(item._id)}
              key={item._id}
              className="product"
            >
              <div className="productImage">
                <img src={"http://localhost:4000" + "/" + item.pimage} />
              </div>
              <div className="productDetails">
                <p className="productName"> {item.pname}</p>
                <p className="productNames">
                  {item.location} {item.contact ? `| ${item.contact} Old` : ""}
                </p>
                <p className="productPrice"> Rs. {item.price} /- </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
