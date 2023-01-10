import React, { useEffect } from "react";
import { useAddressContext } from "../store/AddressContext";

function Profile() {
  const {
    state,
    handleItemClick,
    handleFetchAddresses,
    handleChange,
    handleFetchCountries,
    handleCreateAddress,
    handleToggleDefault,
    handleFetchUserID,
  } = useAddressContext();
  const { addresses, loading, error, activeItem, countries, saving, success } =
    state;

  // console.log("countries", countries);
  // console.log("addresses", addresses);

  useEffect(() => {
    handleFetchAddresses();
    handleFetchCountries();
    handleFetchUserID();
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        {/* <div className="row">
          <div className="col">
            {loading ? <h1>Loading...</h1> : null}
            {addresses.map((a) => {
              return <div key={a.id}>{a.street_address}</div>;
            })}
          </div>
        </div> */}
        <div className="row my-3">
          <div className="col-sm-4">
            <div className="list-group mb-3 mt-1">
              <div
                className={
                  activeItem === "billingAddress"
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() => handleItemClick("billingAddress")}
              >
                Shipping Address
              </div>
              <div
                className={
                  activeItem === "shippingAddress"
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() => handleItemClick("shippingAddress")}
              >
                Billing Address
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="tab-content text-dark" id="pills-tabContent">
              {/* start tab 1*/}
              <div
                className={
                  activeItem === "billingAddress"
                    ? "tab-pane fade show active"
                    : "tab-pane fade show"
                }
              >
                <h3>Update Shipping Address</h3>
              </div>
              {/* close tab 1*/}
              {/* start tab 2*/}
              <div
                className={
                  activeItem === "shippingAddress"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
              >
                <h3>Update Billing Address</h3>
              </div>
              {/* close tab 2*/}
            </div>

            <div className="my-4">
              {loading ? <h1>Loading...</h1> : null}
              {addresses.map((a) => {
                return (
                  <div className="card" style={{ width: "18rem" }} key={a.id}>
                    <div className="card-body">
                      <h5 className="card-title">
                        {a.street_address}, {a.apartment_address}
                      </h5>
                      <h6 className="card-subtitle my-2">{a.country}</h6>
                      <p className="card-text">{a.zip}</p>
                      {a.default ? (
                        <span className="badge bg-primary">Default</span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            <form
              className="card-body"
              onSubmit={(e) => handleCreateAddress(e)}
            >
              <div className="">
                <div className="md-form mb-5">
                  <input
                    type="text"
                    placeholder="1234 Main St"
                    // id="billing_address"
                    onChange={handleChange}
                    name="street_address"
                    className="form-control"
                    required
                  />
                  <label htmlFor="" className="">
                    Street Address
                  </label>
                </div>

                <div className="md-form mb-5">
                  <input
                    type="text"
                    placeholder="Apartment or suite"
                    onChange={handleChange}
                    name="apartment_address"
                    className="form-control"
                  />
                  <label htmlFor="" className="">
                    Apartment Address
                  </label>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-12 mb-2">
                    <label htmlFor="country">Country</label>
                    <select
                      name="country"
                      onChange={handleChange}
                      className="form-control form-control-border border-navy select2"
                      style={{ outline: "none" }}
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Choose a Country
                      </option>
                      {countries.map((item) => {
                        return (
                          <option key={item.key} value={item.value}>
                            {item.text}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-lg-4 col-md-6 mb-4">
                    <label htmlFor="zip">Zip</label>
                    <input
                      type="text"
                      placeholder="Zip code"
                      // id="billing_zip"
                      onChange={handleChange}
                      name="zip"
                      className="form-control"
                    />
                    <div className="invalid-feedback">Zip code required.</div>
                  </div>
                </div>

                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="default"
                    onChange={handleToggleDefault}
                  />
                  <label className="custom-control-label" htmlFor="">
                    Save as default billing address
                  </label>
                </div>
              </div>

              {success ? (
                <div className="alert alert-success" role="alert">
                  Address Created successfully!!!
                </div>
              ) : null}

              <button className="btn btn-primary">Save</button>
              <hr />
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Profile;
