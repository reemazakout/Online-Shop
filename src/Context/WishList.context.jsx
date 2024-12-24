import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const WishListContext = createContext(null);

export default function WishListProvider({ children }) {
  const { token } = useContext(UserContext);
  const [wishList, setWishList] = useState(null);

  const handleUnauthorized = () => {
    toast.error("You must be logged in first");
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 1500); // Delay to show toast message before redirect
  };

  async function removeWishList({ id }) {
    if (!token) {
      handleUnauthorized();
      return;
    }

    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      method: "DELETE",
      headers: {
        token,
      },
    };
    try {
      const { data } = await axios.request(options);
      if (data.count === 0) {
        setWishList([]);
      } else {
        getWishList();
        toast.success("Product removed from wishlist successfully");
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error("Failed to remove product from wishlist");
      }
    }
  }

  async function getWishList() {
    if (!token) {
      setWishList(null);
      return;
    }

    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/wishlist",
      method: "GET",
      headers: {
        token,
      },
    };
    try {
      const { data } = await axios.request(options);
      setWishList(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error("Failed to fetch wishlist");
      }
    }
  }

  async function addWishList({ id }) {
    if (!token) {
      handleUnauthorized();
      return;
    }

    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/wishlist",
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
      setWishList({ ...data, count: data.data.length });
      toast.success("Product added to wishlist successfully");
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error("Failed to add product to wishlist");
      }
    }
  }

  return (
    <WishListContext.Provider
      value={{
        wishList,
        setWishList,
        addWishList,
        getWishList,
        removeWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
