import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState(null);
  const { token } = useContext(UserContext);

  const handleUnauthorized = () => {
    toast.error("You must be logged in first");
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 1500); // Delay to show toast message before redirect
  };

  async function AddProductToCart({ id }) {
    if (!token) {
      handleUnauthorized();
      return;
    }

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
      toast.success("Product added to cart successfully");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  }

  async function getCartInfo() {
    if (!token) {
      setCartInfo(null);
      return;
    }

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
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message?.includes("No cart")) {
        setCartInfo([]);
      } else if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch cart");
      }
    }
  }

  async function UpdateProductToCart({ id, count }) {
    if (!token) {
      handleUnauthorized();
      return;
    }

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
      toast.success("Product quantity updated successfully");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error("Failed to update product quantity");
      }
    }
  }

  async function RemoveProductToCart({ id }) {
    if (!token) {
      handleUnauthorized();
      return;
    }

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
      toast.success("Product removed from cart successfully");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error("Failed to remove product from cart");
      }
    }
  }

  async function clearCart() {
    if (!token) {
      handleUnauthorized();
      return;
    }

    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "DELETE",
      headers: {
        token,
      },
    };
    try {
      const { data } = await axios.request(options);
      toast.success("Cart cleared successfully");
      setCartInfo([]);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error("Failed to clear cart");
      }
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
