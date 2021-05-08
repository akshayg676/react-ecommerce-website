import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { useParams, Link } from "react-router-dom";

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailProduct(product);
        }
      });
    }
  }, [params, products]);

  if (detailProduct.length === 0) return null;

  return (
    <div className="detail">
      <img src={detailProduct.image.url} alt="product image" />
      <div className="box-detail">
        <div className="row">
          <h2>{detailProduct.title}</h2>
          <h4>{detailProduct.product_id}</h4>
        </div>
        <span>₹ {detailProduct.price}</span>
        <p>{detailProduct.description}</p>
        <p>{detailProduct.content}</p>
        <p>Sold: {detailProduct.sold}</p>
        <Link to="/cart" className="cart">
          Buy Now
        </Link>
      </div>
    </div>
  );
}

export default DetailProduct;
