import React, { useState, useEffect } from "react";
import { orderSummaryURL } from "../constants";
import { authAxios } from "../utils";
import { Link } from "react-router-dom";

const OrderSummary = () => {
  let [state, setState] = useState({
    data: null,
    error: null,
    loading: false,
  });

  let handelFetchOrder = () => {
    setState({ loading: true });
    authAxios
      .get(orderSummaryURL)
      .then((res) => {
        setState({ data: res.data, loading: false });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log(err.response);
          setState({
            error: "You currently do not have an order",
            loading: false,
          });
        } else {
          setState({ error: err, loading: false });
        }
      });
  };

  let renderVariations = (order_item) => {
    let text = "";
    order_item.item_variations.forEach((iv) => {
      text += `${iv.variation.name}: ${iv.value}, `;
    });
    return text;
  };

  useEffect(() => {
    handelFetchOrder();
  }, []);

  let { data, loading } = state;
  console.log("orderSummary", data);

  return (
    <React.Fragment>
      <div className="container p-5">
        <h2>Order Summary</h2>
        {state.error && (
          <div class="alert alert-danger" role="alert">
            {state.error}
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Item Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data?.order_items.map((order_item, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i}</th>
                  <td>
                    {order_item.item.title} - {renderVariations(order_item)}{" "}
                  </td>
                  <td>${order_item.item.price}</td>
                  <td>-{order_item.quantity}+</td>
                  <td>
                    {order_item.item.discount_price ? (
                      <button className="btn btn-success"> On Discount</button>
                    ) : (
                      <button className="btn btn-primary">
                        Original Price
                      </button>
                    )}
                  </td>
                  <td></td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="4"></td>
              <td>
                <h6>Total: ${data?.total}</h6>
              </td>
            </tr>

            <tr className="bg-white">
              <td colSpan="5"></td>
              <td>
                <Link className="btn btn-warning" to="/checkout">
                  Checkout
                </Link>
              </td>
              {/* <td colSpan="3"></td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default OrderSummary;
