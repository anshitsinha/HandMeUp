import React from 'react'

export const Product = ({product, id}) => {
  return (
    <div>Product

        <img src={product?.imgURL1} alt="" />
        <h3> {product?.productTitle}</h3>
    </div>
  )
}
