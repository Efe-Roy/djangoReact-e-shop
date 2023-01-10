import React, { useState } from "react";
import { useStartContext } from "../store/context";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { AuthLogin } = useStartContext();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function onSubmit(e) {
    e.preventDefault();
    console.log(formData);
    AuthLogin(username, password);
  }

  const { username, password } = formData;

  return (
    <React.Fragment>
      <div className="container-fluid p-5">
        <div className="row">
          <p className="h3 text-center mt-5 fs-2">Login Page</p>
          <div className="col d-flex justify-content-center">
            <form action="" className="bg-white p-5" onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="" className="form-label fw-light mt-3 fs-5">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  name="username"
                  onChange={onChange}
                  value={username}
                />
              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label mt-3 fw-light fs-5">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control shadow-sm"
                  name="password"
                  onChange={onChange}
                  value={password}
                />
              </div>
              <button className="mt-3 btn btn-primary text-center">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
