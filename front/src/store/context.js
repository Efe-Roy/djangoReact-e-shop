import React, { useReducer, useContext, useEffect } from "react";
import reducerAuth from "./reducers/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../utils";
import { productListURL } from "../constants";

const StartContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  username: "",
  token: "",
  is_manager: "",
  is_employee: "",
  user_id: "",
  error: null,
  loading: false,
  data: [],
};

const GlobalContext = ({ children }) => {
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      dispatch({
        type: "AUTH_CHECK",
      });
    }
  }, []);

  let navigate = useNavigate();
  const [state, dispatch] = useReducer(reducerAuth, initialState);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
    // navigate('/login')
    return {
      type: "AUTH_LOGOUT",
    };
  };

  const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
      setTimeout(() => {
        dispatch(logout());
      });
    };
  };

  const allProductSuccess = (dataRespons) => {
    // console.log(dataValue);
    return {
      type: "ALL_PRODUCT_SUCCESS",
      dataRespons,
    };
  };

  const AuthLogin = (username, password) => {
    dispatch({ type: "AUTH_START" });
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", { username, password })
      .then((res) => {
        const userPayload = {
          token: res.data.token,
          username,
          user_id: res.data.user_id,
          is_client: res.data.is_client,
          is_vendor: res.data.is_vendor,
          email: res.data.email,
          status: res.data.status,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000),
        };
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(userPayload));
        localStorage.setItem("token", res.data.token);
        dispatch({ type: "AUTH_SUCCESS", userPayload });
        dispatch(checkAuthTimeout(3600));
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        dispatch({
          type: "AUTH_FAIL",
          error: err,
        });
      });
  };

  const AuthSignup = (
    username,
    password,
    password2,
    email,
    is_client,
    is_vendor
  ) => {
    dispatch({ type: "AUTH_START" });
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", {
        username,
        password,
        password2,
        email,
        is_client,
        is_vendor,
      })
      .then((res) => {
        console.log(res.data);
        // dispatch({ type: "AUTH_SUCCESS", userPayload });
      })
      .catch((err) => {
        dispatch({
          type: "AUTH_FAIL",
          error: err,
        });
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      });
  };

  const ProductAllList = () => {
    dispatch({ loading: true });
    authAxios
      .get(productListURL)
      .then((res) => {
        // console.log("allProduct", res.data);
        dispatch(allProductSuccess(res.data));
        // dispatch({ data: res.data, loading: false });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ error: err, loading: false });
      });
  };

  return (
    <StartContext.Provider
      value={{
        state,
        dispatch,
        AuthLogin,
        logout,
        AuthSignup,
        ProductAllList,
      }}
    >
      {children}
    </StartContext.Provider>
  );
};
export const useStartContext = () => {
  return useContext(StartContext);
};
export { GlobalContext };
