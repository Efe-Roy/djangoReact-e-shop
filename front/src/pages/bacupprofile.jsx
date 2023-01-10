import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import { useAddressContext } from "../store/AddressContext";

const Profile = () => {
  const { state, handleItemClick } = useAddressContext();
  const { activeItem } = state;
  // console.log("activeItem: ", activeItem);

  let checkCkick = () => {
    console.log("navItemClick: clicked");
  };
  return (
    <div className="container my-3">
      <Tab.Container
        id="list-group-tabs-example"
        defaultActiveKey="#billingAddress"
      >
        <div className="row">
          <div className="col-sm-4">
            <ListGroup>
              <ListGroup.Item action href="#billingAddress">
                Billing Address
              </ListGroup.Item>
              <ListGroup.Item action href="#physicalAddress">
                Physical Address
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col-sm-8">
            <Tab.Content>
              <Tab.Pane eventKey="#billingAddress">
                <form action="" className="card-body" method="post">
                  <h3>Billing Address</h3>

                  <div className="hideable_billing_form">
                    <div className="md-form mb-5">
                      <input
                        type="text"
                        placeholder="1234 Main St"
                        id="billing_address"
                        name="billing_address"
                        className="form-control"
                      />
                      <label htmlFor="billing_address" className="">
                        Address
                      </label>
                    </div>

                    <div className="md-form mb-5">
                      <input
                        type="text"
                        placeholder="Apartment or suite"
                        id="billing_address2"
                        name="billing_address2"
                        className="form-control"
                      />
                      <label htmlFor="billing_address2" className="">
                        Address 2 (optional)
                      </label>
                    </div>

                    <div className="row">
                      <div className="col-lg-4 col-md-12 mb-4">
                        <label htmlFor="country">Country</label>
                        {/* {{ form.billing_country }} */}
                        <div className="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 mb-4">
                        <label htmlFor="billing_zip">Zip</label>
                        <input
                          type="text"
                          placeholder="Zip code"
                          id="billing_zip"
                          name="billing_zip"
                          className="form-control"
                        />
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>
                    </div>

                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        name="set_default_billing"
                        id="set_default_billing"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="set_default_billing"
                      >
                        Save as default billing address
                      </label>
                    </div>
                  </div>
                  <button className="btn btn-primary">Save</button>
                  <hr />
                </form>
              </Tab.Pane>

              <Tab.Pane eventKey="#physicalAddress">
                <form action="" className="card-body" method="post">
                  <h3>Shipping Address</h3>

                  <div className="hideable_billing_form">
                    <div className="md-form mb-5">
                      <input
                        type="text"
                        placeholder="1234 Main St"
                        id="billing_address"
                        name="billing_address"
                        className="form-control"
                      />
                      <label htmlFor="billing_address" className="">
                        Address
                      </label>
                    </div>

                    <div className="md-form mb-5">
                      <input
                        type="text"
                        placeholder="Apartment or suite"
                        id="billing_address2"
                        name="billing_address2"
                        className="form-control"
                      />
                      <label htmlFor="billing_address2" className="">
                        Address 2 (optional)
                      </label>
                    </div>

                    <div className="row">
                      <div className="col-lg-4 col-md-12 mb-4">
                        <label htmlFor="country">Country</label>
                        {/* {{ form.billing_country }} */}
                        <div className="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 mb-4">
                        <label htmlFor="billing_zip">Zip</label>
                        <input
                          type="text"
                          placeholder="Zip code"
                          id="billing_zip"
                          name="billing_zip"
                          className="form-control"
                        />
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>
                    </div>

                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        name="set_default_billing"
                        id="set_default_billing"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="set_default_billing"
                      >
                        Save as default billing address
                      </label>
                    </div>
                  </div>
                  <button className="btn btn-primary">Save</button>
                  <hr />
                </form>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>

      <div className="row mt-5">
        <div className="col-sm-4">
          <div className="list-group">
            <div className="list-group-item" onClick={checkCkick}>
              qwer
            </div>
            <div
              className={
                activeItem === "shippingAddress"
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={handleItemClick("shippingAddress")}
            >
              tyjdb
            </div>
          </div>
        </div>
        <div className="col-sm-8">
          {activeItem === "billingAddress" ? (
            <>
              <p>billingAddress</p>
            </>
          ) : (
            <>
              <p>Shipping Address</p>
            </>
          )}
          <form action="" className="card-body" method="post">
            <h3>Shipping Address</h3>

            <div className="hideable_billing_form">
              <div className="md-form mb-5">
                <input
                  type="text"
                  placeholder="1234 Main St"
                  id="billing_address"
                  name="billing_address"
                  className="form-control"
                />
                <label htmlFor="billing_address" className="">
                  Address
                </label>
              </div>

              <div className="md-form mb-5">
                <input
                  type="text"
                  placeholder="Apartment or suite"
                  id="billing_address2"
                  name="billing_address2"
                  className="form-control"
                />
                <label htmlFor="billing_address2" className="">
                  Address 2 (optional)
                </label>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-12 mb-4">
                  <label htmlFor="country">Country</label>
                  {/* {{ form.billing_country }} */}
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <label htmlFor="billing_zip">Zip</label>
                  <input
                    type="text"
                    placeholder="Zip code"
                    id="billing_zip"
                    name="billing_zip"
                    className="form-control"
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>

              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="set_default_billing"
                  id="set_default_billing"
                />
                <label
                  className="custom-control-label"
                  htmlFor="set_default_billing"
                >
                  Save as default billing address
                </label>
              </div>
            </div>
            <button className="btn btn-primary">Save</button>
            <hr />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
