import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../Componants/Loading/Loading";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(UserContext);

 
  let id = null;
  try {
    id = jwtDecode(token)?.id;
  } catch (error) {
    console.error("Invalid token or failed to decode token:", error);
  }

  async function getOrders() {
    if (!id) return; 

    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };

    try {
      const { data } = await axios.request(options);
      setOrders(data?.orders || []); 
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>All Orders</title>
        <meta name="description" content="All Orders Page" />
      </Helmet>
      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <div className="text-center py-10">
          <h1 className="text-3xl font-bold text-center text-primary py-28">
            No orders now!
          </h1>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order?.id}
            className="order border border-gray-400 rounded p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Order ID</h2>
                <h3 className="text-xl font-bold">#{order?.id}</h3>
              </div>
              <div className="mt-4 flex space-x-3">
                <span>
                  {order?.isDelivered ? (
                    <span className="btn-primary bg-blue-500 text-white font-cairo py-1 px-3 rounded">
                      Delivered
                    </span>
                  ) : (
                    <span className="btn-primary bg-red-500 text-white font-cairo py-1 px-3 rounded">
                      In Transit
                    </span>
                  )}
                </span>

                <span>
                  {order?.isPaid ? (
                    <span className="btn-primary text-white font-cairo py-1 px-3 rounded">
                      Paid
                    </span>
                  ) : (
                    <span className="btn-primary bg-red-500 text-white font-cairo py-1 px-3 rounded">
                      Not Paid
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              {order?.cartItems?.map((product) => (
                <div
                  key={product?.product?._id}
                  className="product col-span-3 border p-2 border-gray-300"
                >
                  <img
                    src={
                      product?.product?.imageCover ||
                      "/path/to/default-image.jpg"
                    }
                    alt={product?.product?.title || "Product Image"}
                    className="w-full rounded"
                  />
                  <div className="mt-2 text-sm text-gray-700">
                    {product?.product?.title || "Unknown Product"}
                  </div>
                  <h2 className="text-primary font-semibold">
                    {product?.price
                      ? `${product.price}$`
                      : "Price not available"}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}
