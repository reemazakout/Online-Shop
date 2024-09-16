import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState(null);

  const { token } = useContext(UserContext);

  async function getCartInfo() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "GET",
      headers: {
        token,
      },
    };
    try {
      const { data } = await axios.request(options);
      setCartInfo(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error.response.data.message.includes("No cart")) {
        setCartInfo([]);
      } else {
        toast.error(error.response.data.message);
      }
    }
  }

  async function AddProductToCart({ id }) {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "POST",
      headers: {
        token,
      },
      data: {
        productId: id,
      },
    };
    try {
      const { data } = await axios.request(options);

      setCartInfo(data);
      toast.success("product added to cart");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function UpdateProductToCart({ id, count }) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      method: "PUT",
      headers: {
        token,
      },
      data: {
        count,
      },
    };
    try {
      const { data } = await axios.request(options);
      setCartInfo(data);
      toast.success("product updated successfully");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function RemoveProductToCart({ id }) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      method: "DELETE",
      headers: {
        token,
      },
    };
    try {
      const { data } = await axios.request(options);
      if (data.numOfCartItems === 0) {
        setCartInfo([]);
      } else {
        setCartInfo(data);
      }
      toast.success("product Removed from cart");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function clearCart() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "DELETE",
      headers: {
        token,
      },
    };
    try {
      const { data } = await axios.request(options);
      toast.success("cart cleared successfully");
      setCartInfo([]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <CartContext.Provider
      value={{
        AddProductToCart,
        getCartInfo,
        cartInfo,
        RemoveProductToCart,
        UpdateProductToCart,
        clearCart,
        setCartInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
