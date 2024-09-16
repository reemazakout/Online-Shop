import { useContext, useEffect } from "react"; // Import useEffect
import { CartContext } from "../../Context/Cart.context";
import { Link } from "react-router-dom";
import Loading from "../../Componants/Loading/Loading.jsx";

export default function Cart() {
  const {
    cartInfo,
    RemoveProductToCart,
    UpdateProductToCart,
    clearCart,
    getCartInfo,
  } = useContext(CartContext);

  useEffect(() => {
    getCartInfo();
  }, []);

  const isLoading = cartInfo === null;
  const products = cartInfo?.data?.products || [];
  const hasProducts = products.length > 0;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <section className="bg-slate-100 p-5 container">
            <h2 className="text-lg md:text-xl font-bold flex items-center">
              Shop cart <i className="fa-solid fa-cart-shopping ml-2"></i>
            </h2>
            {!hasProducts ? (
              <div className="text-center flex flex-col mt-6">
                <h2 className="text-lg md:text-xl font-semibold">
                  Cart is empty!
                </h2>
                <Link
                  to="/home"
                  className="btn-primary w-full md:w-fit mb-6 mx-auto mt-4"
                >
                  ADD YOUR FIRST PRODUCT TO CART
                </Link>
              </div>
            ) : (
              <>
                {products.map((product) => (
                  <div
                    key={product?._id}
                    className="product gap-4 py-8 grid grid-cols-12 md:grid-cols-12 sm:grid-cols-1"
                  >
                    <div className="col-span-2 md:col-span-1 sm:col-span-12">
                      <img
                        src={product?.product?.imageCover || ""}
                        className="w-full"
                        alt={product?.product?.title || "Product"}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row sm:flex-col col-span-10 md:col-span-11 sm:col-span-12 gap-6 justify-between items-start md:items-center">
                      <div>
                        <h2 className="text-lg md:text-xl font-bold mb-1">
                          {product?.product?.title || "No Title"}
                        </h2>
                        <h3 className="text-lg md:text-xl text-primary mb-4">
                          {product?.price || "0.00"}$
                        </h3>
                        <button
                          onClick={() =>
                            RemoveProductToCart({
                              id: product?.product?.id || "",
                            })
                          }
                          className="bg-red-500 btn-primary"
                        >
                          <i className="fa-solid fa-trash mr-3"></i> Remove
                        </button>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            UpdateProductToCart({
                              id: product?.product?.id || "",
                              count: Math.max(1, product?.count - 1),
                            })
                          }
                          disabled={product?.count <= 1}
                          className="btn-primary text-white mr-3 text-sm"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className="text-lg font-bold text-black">
                          {product?.count || 1}
                        </span>
                        <button
                          onClick={() =>
                            UpdateProductToCart({
                              id: product?.product?.id || "",
                              count: (product?.count || 0) + 1,
                            })
                          }
                          className="btn-primary text-white ml-3 text-sm"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={clearCart}
                  className="btn-primary bg-red-500 w-full md:w-fit ms-auto mt-4 block"
                >
                  <i className="fa-solid fa-trash mr-3"></i> Clear Cart
                </button>
              </>
            )}
          </section>

          {hasProducts && (
            <Link
              to="/checkout"
              className="btn-primary mt-5 w-full md:w-fit uppercase block ms-auto container"
            >
              Next step
            </Link>
          )}
        </div>
      )}
    </>
  );
}
