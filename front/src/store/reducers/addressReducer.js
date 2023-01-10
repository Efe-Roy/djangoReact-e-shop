import { updateObject } from "../utility";

const countrySuccess = (state, action) => {
  return updateObject(state, {
    countries: action.dataRespons,
  });
};

const countryFail = (state, action) => {
  return updateObject(state, {
    error: action.err,
  });
};

const fetchUserIdSuccess = (state, action) => {
  return updateObject(state, {
    userID: action.dataRespons,
  });
};

const fetchUserIdFail = (state, action) => {
  return updateObject(state, {
    error: action.err,
  });
};

const createAddressStart = (state, action) => {
  return updateObject(state, {
    saving: true,
  });
};

const createAddressSuccess = (state, action) => {
  return updateObject(state, {
    saving: false,
    success: true,
    formData: { default: false },
  });
};

const createAddressFail = (state, action) => {
  return updateObject(state, {
    error: action.err,
  });
};

const addressSuccess = (state, action) => {
  return updateObject(state, {
    addresses: action.dataRespons,
    loading: false,
  });
};

const addressStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const addressFail = (state, action) => {
  return updateObject(state, {
    error: action.err,
  });
};

const itemClickSucces = (state, action) => {
  return updateObject(state, {
    activeItem: action.dataValue,
  });
};

const handleChangeSucces = (state, action) => {
  return updateObject(state, {
    formData: action.updatedFormdata,
  });
};

// const reducer = (state = initialState, action) => {
const reducerAddress = (state, action) => {
  switch (action.type) {
    case "ADDRESS_START":
      return addressStart(state, action);
    case "ADDRESS_SUCCESS":
      return addressSuccess(state, action);
    case "ADDRESS_Fail":
      return addressFail(state, action);

    case "COUNTRY_SUCCESS":
      return countrySuccess(state, action);
    case "ITEM_CLICK":
      return itemClickSucces(state, action);
    case "HANDLE_CHANGE":
      return handleChangeSucces(state, action);

    case "CREATE_ADDRESS_START":
      return createAddressStart(state, action);
    case "CREATE_ADDRESS_SUCCESS":
      return createAddressSuccess(state, action);
    case "CREATE_ADDRESS_FAIL":
      return createAddressFail(state, action);

    case "FETCH_USER_ID_SUCCESS":
      return fetchUserIdSuccess(state, action);
    case "FETCH_USER_ID_FAIL":
      return fetchUserIdFail(state, action);

    default:
      return state;
  }
};

export default reducerAddress;
