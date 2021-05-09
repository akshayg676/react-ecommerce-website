import React from "react";
import BtnRender from "./BtnRender";

function ProductItem({ product }) {
  return (
    <div className="product_card">
      <img src={product.image.url} alt="" />

      <div className="product_box">
        <h2>{product.title}</h2>
        <span>₹ {product.price}</span>
        <p>{product.description}</p>
      </div>

      <BtnRender product={product} />
    </div>
  );
}

export default ProductItem;
