import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStartContext } from "../store/context";

const ProductList = () => {
  const { ProductAllList, state } = useStartContext();

  useEffect(() => {
    ProductAllList();
  }, []);

  const { data, error, loading } = state;

  let navigate = useNavigate();

  const moveClick = (id) => {
    navigate(`/products/${id}`);
    console.log(id);
  };

  return (
    <React.Fragment>
      <div className="container">
        {error && <h1>Error Somewhere</h1>}
        {loading && <h1>Lading....</h1>}

        <div className="container px-5 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-2 row-cols-1 row-cols-md-3 row-cols-xl-4">
            {data?.map((item) => {
              return (
                <div className="col mb-5" key={item.id}>
                  <div
                    className="card h-100 border-0 shadow-sm overflow-hidden"
                    style={{ borderRadius: "1rem" }}
                    onClick={() => moveClick(item.id)}
                  >
                    <img
                      className="card-img-top img-fluid"
                      src={item.image}
                      alt="..."
                      style={{ height: "10rem", objectFit: "fit" }}
                    />
                    <div className="card-body p-4">
                      <div className="text-center">
                        <span>{item.category}</span>
                        <h5>
                          <strong>
                            <p href="" className="text-dark m-0">
                              {item.title}
                              {item.discount_price && (
                                <span
                                  className={
                                    "badge rounded-pill bg-" + item.label
                                  }
                                >
                                  New
                                </span>
                              )}
                            </p>
                          </strong>
                        </h5>
                        <h6 className="font-weight-bold blue-text m-0">
                          <span>
                            ${" "}
                            {item.discount_price
                              ? item.discount_price
                              : item.price}{" "}
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
