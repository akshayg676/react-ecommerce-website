import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function Cart() {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);

  if (cart.length === 0)
    return (
      <div style={{ textAlign: "center", fontSize: "5rem" }}>Cart is Empty</div>
    );

  return (
    <div className="cart_div">
      {cart.map((product) => (
        <div className="detail cart">
          <img src={product.image.url} alt="" className="img_container" />
          <div className="box-detail">
            <h2>{product.title}</h2>
            <span>₹ {product.price * product.quantity}</span>
            <p>{product.description}</p>
            <p>{product.content}</p>
          </div>

          <div className="amount">
            <button> - </button>
            <span>{product.quantity}</span>
            <button> + </button>
          </div>

          <div className="delete">
            <button>X</button>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>Total: ₹ {total}</h3>
        <h3 className="payment">
          <Link to="#!">Payment</Link>
        </h3>
      </div>
    </div>
  );
}
export default Cart;
