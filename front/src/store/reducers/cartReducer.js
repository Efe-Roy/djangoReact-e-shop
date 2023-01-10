import { updateObject } from "../utility";

// const initialState = {
//   shoppingCart: null,
//   error: null,
//   loading: false,
// };

const cartStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const cartSuccess = (state, action) => {
  return updateObject(state, {
    shoppingCart: action.dataValue,
    error: null,
    loading: false,
  });
};

const detailCartSuccess = (state, action) => {
  return updateObject(state, {
    data: action.dataRespons,
    error: null,
    loading: false,
  });
};

const visibilitySuccess = (state, action) => {
  return updateObject(state, {
    formVisible: true,
  });
};

const formDataSuccess = (state, action) => {
  return updateObject(state, {
    formData: action.updatedFormData,
  });
};

const cartFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

// const reducer = (state = initialState, action) => {
const reducerCart = (state, action) => {
  switch (action.type) {
    case "CART_START":
      return cartStart(state, action);
    case "CART_SUCCESS":
      return cartSuccess(state, action);
    case "DETAIL_CART_SUCCESS":
      return detailCartSuccess(state, action);
    case "VISIBILITY_SUCCESS":
      return visibilitySuccess(state, action);
    case "FORM_DATA_SUCCESS":
      return formDataSuccess(state, action);
    case "CART_FAIL":
      return cartFail(state, action);
    default:
      return state;
  }
};

export default reducerCart;
