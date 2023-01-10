import React, { useReducer, useContext } from "react";
import { authAxios } from "../utils";
import {
  addressCreateURL,
  addressListURL,
  countryListURL,
  userIDURL,
} from "../constants";
import reducerAddress from "./reducers/addressReducer";

const StartContext = React.createContext();

const initialState = {
  activeItem: "billingAddress",
  addresses: [],
  countries: [],
  userID: null,
  selectedAddress: null,
  loading: false,
  error: null,
  formData: { default: false },
  saving: false,
  success: false,
};

const AddressContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducerAddress, initialState);

  const addressStart = () => {
    return {
      type: "ADDRESS_START",
    };
  };

  const countryFail = (err) => {
    return {
      type: "COUNTRY_Fail",
      err,
    };
  };

  const countrySuccess = (dataRespons) => {
    // console.log(dataValue);
    return {
      type: "COUNTRY_SUCCESS",
      dataRespons,
    };
  };

  const createAddressStart = () => {
    return {
      type: "CREATE_ADDRESS_START",
    };
  };

  const createAddressSuccess = () => {
    return {
      type: "CREATE_ADDRESS_SUCCESS",
    };
  };

  const createAddressFail = (err) => {
    return {
      type: "CREATE_ADDRESS_FAIL",
      err,
    };
  };

  const fetchUserIdSuccess = (dataRespons) => {
    return {
      type: "FETCH_USER_ID_SUCCESS",
      dataRespons,
    };
  };

  const fetchUserIdFail = (err) => {
    return {
      type: "FETCH_USER_ID_FAIL",
      err,
    };
  };

  const addressFail = (err) => {
    return {
      type: "ADDRESS_Fail",
      err,
    };
  };

  const addressSuccess = (dataRespons) => {
    // console.log(dataValue);
    return {
      type: "ADDRESS_SUCCESS",
      dataRespons,
    };
  };

  const itemClickSucces = (dataValue) => {
    return {
      type: "ITEM_CLICK",
      dataValue,
    };
  };

  const handleChangeSucces = (updatedFormdata) => {
    return {
      type: "HANDLE_CHANGE",
      updatedFormdata,
    };
  };

  const handleItemClick = (dataValue) => {
    dispatch(itemClickSucces(dataValue));
    handleFetchAddresses();
  };

  const handleChange = (e) => {
    const { formData } = state;
    const updatedFormdata = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    dispatch(handleChangeSucces(updatedFormdata));
    // this.setState({
    //   formData: updatedFormdata,
    // });
  };

  const handleToggleDefault = () => {
    const { formData } = state;
    const updatedFormdata = {
      ...formData,
      default: !formData.default,
    };
    dispatch(handleChangeSucces(updatedFormdata));
    // this.setState({
    //   formData: updatedFormdata,
    // });
  };

  const handleCreateAddress = (e) => {
    dispatch(createAddressStart());
    e.preventDefault();
    const { activeItem, formData, userID } = state;
    console.log(formData);
    authAxios
      .post(addressCreateURL, {
        ...formData,
        user: userID,
        address_type: activeItem === "billingAddress" ? "B" : "S",
      })
      .then((res) => {
        dispatch(createAddressSuccess());
      })
      .catch((err) => {
        dispatch(createAddressFail(err));
      });
  };

  const handleFormatCountries = (countries) => {
    const keys = Object.keys(countries);
    return keys.map((k) => {
      return {
        key: k,
        text: countries[k],
        value: k,
      };
    });
  };

  const handleFetchUserID = () => {
    authAxios
      .get(userIDURL)
      .then((res) => {
        // console.log("ght", res.data);
        dispatch(fetchUserIdSuccess(res.data.userID));
        // this.setState({ userID: res.data.userID });
      })
      .catch((err) => {
        dispatch(fetchUserIdFail(err));
        // this.setState({ error: err });
      });
  };

  const handleFetchCountries = () => {
    authAxios
      .get(countryListURL)
      .then((res) => {
        dispatch(countrySuccess(handleFormatCountries(res.data)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFetchAddresses = () => {
    dispatch(addressStart());
    const { activeItem } = state;
    authAxios
      .get(addressListURL(activeItem === "billingAddress" ? "B" : "S"))
      .then((res) => {
        dispatch(addressSuccess(res.data));
      })
      .catch((err) => {
        dispatch(addressFail(err));
        console.log(err);
      });
  };

  return (
    <StartContext.Provider
      value={{
        state,
        dispatch,
        handleFetchAddresses,
        handleItemClick,
        handleChange,
        handleFetchCountries,
        handleCreateAddress,
        handleToggleDefault,
        handleFetchUserID,
      }}
    >
      {children}
    </StartContext.Provider>
  );
};
export const useAddressContext = () => {
  return useContext(StartContext);
};
export { AddressContext };
