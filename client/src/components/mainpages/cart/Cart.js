import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import PaypalButton from "./PaypalButton";

function Cart() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [cart, setCart] = state.userAPI.cart;
  const [callback, setCallback] = state.userAPI.callback;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      { headers: { Authorization: token } }
    );

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order");
    setCallback(!callback);
  };

  if (cart.length === 0)
    return (
      <div style={{ textAlign: "center", fontSize: "5rem" }}>Cart is Empty</div>
    );

  // decrementing product quantity in cart
  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  // incrementing product quantity in cart
  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  // delete selected product from cart
  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      addToCart(cart);
    }
  };

  return (
    <div className="cart_div">
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product.image.url} alt="" />
          <div className="box-detail">
            <h2>{product.title}</h2>
            <span>₹ {product.price * product.quantity}</span>
            <p>{product.description}</p>
            <p>{product.content}</p>
          </div>

          <div className="amount">
            <button onClick={() => decrement(product._id)}> - </button>
            <span>{product.quantity}</span>
            <button onClick={() => increment(product._id)}> + </button>
          </div>

          <div className="delete">
            <button onClick={() => removeProduct(product._id)}>X</button>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>
          Total: <span>₹ {total}</span>
        </h3>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
}
export default Cart;
