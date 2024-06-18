import Link from "next/link";
import React from "react";

export const Product = ({ product, id }) => {
  return (
    <div className="border border-gridGrey rounded-lg m-4 p-2 w-full sm:w-64">
      <Link href={`/products/${id}`}>
        <img
          className=" rounded-lg w-full h-40 object-cover "
          src={product?.imgURL1}
          alt={product?.productTitle || "Product Image"}
        />
      </Link>
      <Link href={`/products/${id}`}>
        <h3> {product?.productTitle}</h3>
        <h3> {product?.price}</h3>
      </Link>
    </div>
  );
};
