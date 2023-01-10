import { updateObject } from "../utility";

const authCheck = (state, action) => {
  return updateObject(state, { isAuthenticated: true });
};

const authStart = (state, sction) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const allProductSuccess = (state, action) => {
  return updateObject(state, {
    data: action.dataRespons,
    error: null,
    loading: false,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.userPayload.token,
    username: action.userPayload.username,
    is_employee: action.userPayload.is_employee,
    is_manager: action.userPayload.is_manager,
    user_id: action.userPayload.user_id,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.Payload,
    token: null,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
  });
};

const reducerAuth = (state, action) => {
  switch (action.type) {
    case "AUTH_START":
      return authStart(state, action);
    case "AUTH_SUCCESS":
      return authSuccess(state, action);
    case "ALL_PRODUCT_SUCCESS":
      return allProductSuccess(state, action);
    case "AUTH_FAIL":
      return authFail(state, action);
    case "AUTH_LOGOUT":
      return authLogout(state, action);
    case "AUTH_CHECK":
      return authCheck(state, action);
    default:
      return state;
  }
};
export default reducerAuth;
