import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";

function OrderHistory() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  return (
    <div className="history-page">
      <h2>History</h2>
      <h4>You have {history.length} ordered</h4>

      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date of Purchase</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => {
            <tr key={item._id}>
              <th>{item.paymentID}</th>
              <th>{new Date(item.createdAt).toLocaleDateString()}</th>
              <th>
                <Link to={"/history/${items._id}"}>View</Link>
              </th>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
