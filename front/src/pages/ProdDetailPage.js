import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCartContext } from "../store/cartContext";

export default function ProdDetailPage() {
  const { id } = useParams();

  let {
    handleAddToCart,
    handleFetchItem,
    stateCart,
    handleToggleForm,
    formDataSuccess,
    dispatchCart,
  } = useCartContext();

  const handleChange = (e) => {
    const { formData } = stateCart;
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    dispatchCart(formDataSuccess(updatedFormData));

    // console.log(e.target.value);
    // console.log(e.target.name);
  };

  useEffect(() => {
    handleFetchItem(id);
  }, []);

  // console.log("Checj", id);
  // console.log("wwqq", stateCart);

  let { data, formVisible, formData } = stateCart;
  // console.log("formData", formData);

  return (
    <>
      <div className="container my-4 px-4">
        <div className="row gx-3">
          <div className="col-md-8">
            <div className="p-3 border bg-light">
              <div className="card mb-3">
                <img
                  src={data?.image}
                  className="card-img-top "
                  alt="..."
                  height="300"
                  width="500"
                  style={{ objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{data?.title}</h5>
                  <span className="card-text">{data?.description}</span>
                  <span className="card-text d-block">
                    <small className="text-muted">${data?.price}</small>
                    <button
                      className={`mx-2 border-0 badge rounded-pill bg-${data?.label}`}
                    >
                      primary
                    </button>
                  </span>
                </div>
              </div>
              <button
                onClick={handleToggleForm}
                className="btn btn-warning w-100"
              >
                Add to Cart
              </button>

              {formVisible ? (
                <React.Fragment>
                  <hr />
                  <form action="" className="mt-2">
                    {data.variations.map((v) => {
                      const name = v.name.toLowerCase();
                      return (
                        <div key={v.id}>
                          <h6>{name}</h6>
                          <select
                            name={name}
                            onChange={handleChange}
                            className="form-control form-control-border border-navy select2"
                            style={{ outline: "none" }}
                            required
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Choose a {name}
                            </option>
                            {v.item_variations.map((item) => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.value}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      );
                    })}

                    <button
                      className="btn shadow"
                      onClick={(e) => handleAddToCart(e, data.slug)}
                    >
                      Submit
                    </button>
                  </form>
                </React.Fragment>
              ) : null}
            </div>
          </div>

          {/* ================= Right Side Right Side ====================
          ===================== Right Side Right Side ====================
          ===================== Right Side Right Side ==================== */}

          <div className="col">
            <div className="p-2 border bg-light">
              <div className="list-group">
                <h2 className="text-center">
                  <b>
                    <u>Try different variations</u>
                  </b>
                </h2>
                {data?.variations?.map((v, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div>
                        <h5 className="text-center">{v.name}</h5>
                        {v.item_variations.map((iv, index) => {
                          return (
                            <div
                              className="list-group-item list-group-item-action"
                              key={index}
                            >
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  {iv.attachment ? (
                                    <img
                                      // src="..."
                                      src={`http://127.0.0.1:8000${iv.attachment}`}
                                      alt="..."
                                      height="50"
                                      width="40"
                                    />
                                  ) : null}
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  {iv.value}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
