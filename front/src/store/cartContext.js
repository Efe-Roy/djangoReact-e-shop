import React, { useReducer, useContext } from "react";
import { authAxios } from "../utils";
import { addToCartURL, orderSummaryURL, productDetailURL } from "../constants";
import reducerCart from "./reducers/cartReducer";

const StartContext = React.createContext();

const initialState = {
  shoppingCart: null,
  error: null,
  data: [],
  loading: false,
  formVisible: false,
  formData: {},
};

const CartContext = ({ children }) => {
  const [stateCart, dispatchCart] = useReducer(reducerCart, initialState);

  const cartStart = () => {
    return {
      type: "CART_START",
    };
  };

  const cartSuccess = (dataValue) => {
    // console.log(dataValue);
    return {
      type: "CART_SUCCESS",
      dataValue,
    };
  };

  const detailCartSuccess = (dataRespons) => {
    // console.log(dataValue);
    return {
      type: "DETAIL_CART_SUCCESS",
      dataRespons,
    };
  };

  const visibilitySuccess = () => {
    return {
      type: "VISIBILITY_SUCCESS",
    };
  };

  const formDataSuccess = (updatedFormData) => {
    return {
      type: "FORM_DATA_SUCCESS",
      updatedFormData,
    };
  };

  const cartFail = (error) => {
    return {
      type: "CART_FAIL",
      error: error,
    };
  };

  const fetchCart = () => {
    dispatchCart(cartStart());
    authAxios
      .get(orderSummaryURL)
      .then((res) => {
        dispatchCart(cartSuccess(res.data));
        // console.log("cartOrder ", res.data);
      })
      .catch((err) => {
        dispatchCart(cartFail(err));
        // console.log("error cartOrder ", err);
      });
  };

  const handleFormatData = (formData) => {
    // convert {colour: 1, size: 2} to [1,2] - they're all variations
    return Object.keys(formData).map((key) => {
      return formData[key];
    });
  };

  const handleAddToCart = (e, slug) => {
    e.preventDefault();

    dispatchCart({ loading: true });
    const { formData } = stateCart;
    const variations = handleFormatData(formData);
    console.log(variations);

    authAxios
      .post(addToCartURL, { slug, variations })
      .then((res) => {
        // props.refreshCart();
        fetchCart();
        console.log(res.data);
        dispatchCart({ loading: false });
        // navigate("/products");
        // window.location.reload();
      })
      .catch((err) => {
        dispatchCart({ error: err, loading: false });
      });
  };

  const handleFetchItem = (id) => {
    authAxios
      .get(productDetailURL(id))
      .then((res) => {
        console.log("Details Same", res.data);
        dispatchCart(detailCartSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleForm = () => {
    const { formVisible } = stateCart;
    // dispatchCart({
    //   formVisible: !formVisible,
    // });
    dispatchCart(visibilitySuccess());
    console.log("formVisible check", formVisible);
  };

  return (
    <StartContext.Provider
      value={{
        stateCart,
        dispatchCart,
        fetchCart,
        handleAddToCart,
        handleFetchItem,
        handleToggleForm,
        formDataSuccess,
      }}
    >
      {children}
    </StartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(StartContext);
};
export { CartContext };
