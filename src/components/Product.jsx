import Link from "next/link";
import React from "react";

export const Product = ({ product, id }) => {

  return (
    <div className="border border-gridGrey rounded-lg m-5 p-2 w-full sm:w-80">
      <Link href={`/products/${id}`}>
        <img
          className=" rounded-lg w-full h-60 object-cover "
          src={product?.imgURL1}
          alt={product?.productTitle || "Product Image"}
        />
      </Link>
      <Link href={`/products/${id}`}>
        <div className="flex justify-between m-1">
          <div className="flex-col justify-between">
            <p className="font-bold text-lg"> {product?.productTitle}</p>
            <p className="text-textGrey mt-0.5 text-xs"> {product?.address} </p>
          </div>
          <div>
     

            <p> &#8377; {product?.price} </p>
          </div>
        </div>
      </Link>
    </div>
  );
};


