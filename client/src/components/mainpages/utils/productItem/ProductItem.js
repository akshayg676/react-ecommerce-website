import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  return (
    <div className="product_card">
      <img src={product.image.url} alt="product image" />

      <div className="product_box">
        <h2>{product.title}</h2>
        <span>₹ {product.price}</span>
        <p>{product.description}</p>
      </div>

      <div className="row_btn">
        <Link id="btn_view" to={`detail/${product._id}`}>
          View
        </Link>
        <Link id="btn_buy" to="#!">
          Buy
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
