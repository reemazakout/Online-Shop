import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/Cart.context";
import { UserContext } from "../../Context/User.context";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [orderType, setOrderType] = useState(null);
  const { token } = useContext(UserContext);
  const { cartInfo, setCartInfo } = useContext(CartContext);
  const usenavigate = useNavigate();

  async function CreateCashOrder(values) {
    console.log("cash");
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      },
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
      setCartInfo([]);
      toast.success("order created successfully");
      usenavigate("/allorders");
    } catch (error) {
      console.log(error);
    }
  }

  async function CreateOnlineOrder(values) {
    console.log("online");
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      },
    };

    try {
      const { data } = await axios.request(options);
      toast.loading("redirecting to payment gateway...");
      setTimeout(() => {
        if (data.status === "success") {
          window.location.href = data.session.url;
        }
      }, 3000);

      console.log(data);
      setCartInfo([]);
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (orderType === "cash") {
        CreateCashOrder(values);
      } else {
        CreateOnlineOrder(values);
      }
    },
  });

  return (
    <>
      <h2 className="text-xl mb-4 font-semibold">Shipping address</h2>
      <form onSubmit={formik.handleSubmit} className="pb-12">
        <input
          type="text"
          className="form-control mb-4 w-full"
          placeholder="city"
          name="shippingAddress.city"
          onChange={formik.handleChange}
          value={formik.values.shippingAddress.city}
        />
        <input
          type="tel"
          className="form-control mb-4 w-full"
          placeholder="phone"
          name="shippingAddress.phone"
          onChange={formik.handleChange}
          value={formik.values.shippingAddress.phone}
        />
        <textarea
          className="form-control mb-4 w-full"
          placeholder="details"
          name="shippingAddress.details"
          onChange={formik.handleChange}
          value={formik.values.shippingAddress.details}
        />
        <button
          onClick={() => setOrderType("cash")}
          className="btn-primary bg-blue-500 mr-4"
          type="submit"
        >
          Cash Order
        </button>
        <button
          type="submit"
          onClick={() => setOrderType("online")}
          className="btn-primary"
        >
          Online Order
        </button>
      </form>
    </>
  );
}
