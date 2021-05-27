import axios from "axios";
import React, { useState } from "react";
import BtnRender from "./BtnRender";
import Loading from "../loading/Loading";

function ProductItem({ product, isAdmin, token, callback, setCallback }) {
  const [loading, setLoading] = useState(false);
  const deleteProduct = async () => {
    try {
      setLoading(true);
      // to delete product image
      const destroyImg = await axios.post(
        "/api/destroy",
        { public_id: product.image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      // to delete product data
      const destroyProduct = await axios.delete(
        `/api/products/${product._id}`,
        {
          headers: { Authorization: token },
        }
      );

      await destroyImg;
      await destroyProduct;
      setLoading(false);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  if (loading)
    return (
      <div className="product_card">
        <h3>Product deleting, Please wait...</h3>
      </div>
    );
  return (
    <div className="product_card">
      {isAdmin && <input type="checkbox" checked={product.checked} />}
      <img src={product.image.url} alt="" />

      <div className="product_box">
        <h2>{product.title}</h2>
        <span>₹ {product.price}</span>
        <p>{product.description}</p>
      </div>

      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
}

export default ProductItem;
