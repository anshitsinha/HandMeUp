import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";

import { app } from "../firebase";
import { Product } from "./Product";

export default function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const q = query(collection(db, "products"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      let products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setData(products);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-wrap justify-center">
      {data.map((product) => (
        <Product key={product.id} product={product} id={product.id} />
      ))}
    </div>
  );
}
