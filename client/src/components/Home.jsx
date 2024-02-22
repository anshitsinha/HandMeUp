import { useEffect, useState } from "react";
import axios from "axios";

import './Home.css'
import Header from './Header';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:4000/products';
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

  return (
    <div>
      <Header />
      <div>Home</div>
      {/* Render your products here */}
      <div className="productsGrid">
        {products && products.length > 0 && products.map((item, index) => (
          <div className="product" key={index}>
            <div className="productImage"><img  src={'http://localhost:4000' + '/' + item.pimage} /></div> 
            <div className="productDetails">
              
              <p className="productName"> {item.pname} | {item.category} </p>
              <p className="productNames"> {item.pdesc} </p>
              <p className="productPrice"> Rs. {item.price} /- </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
