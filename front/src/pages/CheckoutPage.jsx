import React, { useState, useEffect } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { authAxios } from '../utils';
import { Link } from 'react-router-dom';
import { checkoutURL, orderSummaryURL, addCouponURL, addressListURL } from '../constants';
const OrderPreview = () => {
  let [state, setState] = useState({
    data: null,
    error: null,
    loading: false, 
    shippingAddresses: [],
    billingAddresses: [],
  });

  useEffect(() => {
    handelFetchOrder();
    handleFetchBillingAddresses();
    handleFetchShippingAddresses();
  }, []);

  const handleFetchBillingAddresses = () => {
    setState({ loading: true });
    authAxios
      .get(addressListURL("B"))
      .then(res => {
        setState({ billingAddresses: res.data, loading: false });
        // this.setState({
        //   billingAddresses: res.data.map(a => {
        //     return {
        //       key: a.id,
        //       text: `${a.street_address}, ${a.apartment_address}, ${a.country}`,
        //       value: a.id
        //     };
        //   }),
        //   selectedBillingAddress: this.handleGetDefaultAddress(res.data),
        //   loading: false
        // });
      })
      .catch(err => {
        setState({ error: err, loading: false });
      });
  };

  const handleFetchShippingAddresses = () => {
    setState({ loading: true });
    authAxios
      .get(addressListURL("S"))
      .then(res => {
        setState({ shippingAddresses: res.data, loading: false });
        // this.setState({
        //   shippingAddresses: res.data.map(a => {
        //     return {
        //       key: a.id,
        //       text: `${a.street_address}, ${a.apartment_address}, ${a.country}`,
        //       value: a.id
        //     };
        //   }),
        //   selectedShippingAddress: this.handleGetDefaultAddress(res.data),
        //   loading: false
        // });
      })
      .catch(err => {
        setState({ error: err, loading: false });
      });
  };

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


  const { data, shippingAddresses, billingAddresses } = state;
  console.log(shippingAddresses)
  console.log(billingAddresses)

  return (
    <React.Fragment>
      {state.error && (
          <div className="alert alert-danger" role="alert">
            {state.error}
          </div>
      )}
        
      <ul className="list-group list-group-flush">
          <React.Fragment>
            {data?.order_items.map((orderItem, i) => {
              return (
                <li key={i} className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{orderItem.quantity} x {orderItem.item.title}</div>
                    ${orderItem.final_price}
                  </div>
                  <img
                    style={{width: "3rem"}}
                    src={`http://127.0.0.1:8000${orderItem.item.image}`}
                  />
                </li>
              )
            })}
          </React.Fragment>
        
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold mx-3">Order Total: ${data?.total}</div>
          </div>
          <span className="badge bg-success rounded-pill">Current coupon: {data?.coupon?.code} for ${ data?.coupon?.amount}</span>
        </li>
      </ul>
    </React.Fragment>
  );
};

const CouponForm = () => {
  let [state, setState] = useState({
    code: "",
    error: null,
    loading: false,
  })

  let handleChange = e => {
    setState({...state, [e.target.name] : e.target.value });
  };

  let handleAddCoupon = (e) => {
    e.preventDefault();
    setState({ loading: true });
    console.log(code)
    authAxios
      .post(addCouponURL, { code })
      .then(res => {
        setState({ loading: false });
        // this.handleFetchOrder();
        console.log("working")
      })
      .catch(err => {
        setState({ error: err, loading: false });
      });
  };
  

  // let handleSubmit = e => {
  //   const { code } = state;
  //   props.handleAddCoupon(e, code);
  //   // setState({ code: "" });
  // };

    const { code } = state;
    return (
      <React.Fragment>
        {state.error && (
          <div className="alert alert-danger" role="alert">
            {state.error}
          </div>
        )}
        <form onSubmit={handleAddCoupon}>
          <div className='form-group'>
            <label className='form-lable'>Coupon code</label>
            <input
              placeholder="Enter a coupon.."
              name='code'
              value={code}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button className='btn btn-primary mt-2' type="submit">Submit</button>
        </form>
      </React.Fragment>
    );
}


const CheckoutForm = () => {
  const [state, setState] = useState({
    loading: false,
    error: "",
    success: false,
    billingAddresses: [],
    shippingAddresses: [],
  })
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setState({loading: true})

    if (elements == null) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
      setState({error: result.error.message})
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      // setState({ success: true });
      console.log(result.token.id)
      authAxios
        .post(checkoutURL, { stripeToken: result.token.id })
        .then(res => {
          setState({ loading: false, success: true });
        })
        .catch(err => {
          setState({ loading: false });
          console.log("Error Message", err)
        })
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };


  const { error, loading, success, billingAddresses, shippingAddresses } = state

  return (
    <React.Fragment>
        <OrderPreview />
        <div className="my-3"></div>

        <CouponForm />
        <div className='mb-3'></div>
      <form onSubmit={handleSubmit}>

        {error && (
            <div className='text-danger'>
              <h6 >There was some errors with your submission</h6>
              <p> <i>{ error }</i> </p>
            </div>
          )}
          {loading && (
            <div>
              <h1>Loading....</h1>
            </div>
        )}

        <React.Fragment>
            <CardElement className='form-control' />
            {success && (
              <div className='bg-success'>
                <h1>Your payment was successful</h1>
                <p>
                  Go to your <b>profile</b> to see the order delivery status.
                </p>
              </div>
            )}
            <button className='btn btn-primary mt-2' type="submit" disabled={!stripe || !elements}>
              Pay
            </button>
            
        </React.Fragment>
        
        {/* {billingAddresses.length < 1 || shippingAddresses.length < 1 ?
          (<p>You need to <Link to="/profile"> add address </Link> </p>) : 
          (
            <React.Fragment>
            <CardElement className='form-control' />
            {success && (
              <div className='bg-success'>
                <h1>Your payment was successful</h1>
                <p>
                  Go to your <b>profile</b> to see the order delivery status.
                </p>
              </div>
            )}
            <button className='btn btn-primary mt-2' type="submit" disabled={!stripe || !elements}>
              Pay
            </button>
            
          </React.Fragment>
          )
        } */}

      </form>
    </React.Fragment>
  );
};

const stripePromise = loadStripe('pk_test_51LsRhSKcAH0hXBQrOfm0ynkeFAqe1WdwZ57MXxswpNOHf2Kr2f8tahTCIIkHRBwd9IY26RIURo8VKlKuxq28aIiL00rD3QkfdL');

const CheckoutPage = () => (
  <div className="container p-2 mt-4 px-5 shadow">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default CheckoutPage;