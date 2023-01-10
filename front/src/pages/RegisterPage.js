import React, { useState } from "react";
import { useStartContext } from "../store/context";

let RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
    role: "",
  });

  const { AuthSignup } = useStartContext();

  const { username, password, password2, email, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let is_client = false;
    let is_vendor = false;
    if (role === "Vendor") is_vendor = true;
    if (role === "Client") is_client = true;
    // console.log(`
    //   is_vendor: ${is_vendor}
    //   is_client: ${is_client}
    //   username: ${username}
    //   password: ${password}
    //   password2: ${password2}
    //   email: ${email}
    // `);

    AuthSignup(username, password, password2, email, is_vendor, is_client);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row my-1">
          <p className="display-6 text-center fw-bold">Sign Up</p>
          <div className="col d-flex justify-content-center">
            <form
              onSubmit={onSubmit}
              className="mt-1 mb-5 shadow-sm px-5 py-3 bg-white"
            >
              <div className="form-group mt-2">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  className="form-control shadow-sm"
                  value={username}
                  name="username"
                  placeholder="Name"
                  required
                  onChange={onChange}
                ></input>
              </div>
              <div className="form-group mt-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  className="form-control shadow-sm"
                  value={email}
                  name="email"
                  placeholder="Email"
                  required
                  onChange={onChange}
                ></input>
              </div>

              <div className="form-group mt-2">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  className="form-control shadow-sm"
                  value={password}
                  name="password"
                  placeholder="Password"
                  required
                  onChange={onChange}
                ></input>
              </div>
              <div className="form-group mt-4">
                <label htmlFor="password" className="form-label">
                  Confirm Password
                </label>
                <input
                  className="form-control shadow-sm"
                  value={password2}
                  name="password2"
                  placeholder="Confirm Password"
                  required
                  onChange={onChange}
                ></input>
              </div>

              <div className="form-group mt-4">
                <label htmlFor="role" className="form-label">
                  Choose a Role:
                </label>
                <select
                  name="role"
                  onChange={onChange}
                  className="form-control form-control-border border-navy select2"
                  style={{ outline: "none" }}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Option
                  </option>
                  <option value="Vendor">Vendor</option>
                  <option value="Client">Client</option>
                </select>
              </div>

              <div className="mt-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-success">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RegisterPage;
