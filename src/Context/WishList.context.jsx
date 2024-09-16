import { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const WishListContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function WishListProvider({ children }) {
  const { token } = useContext(UserContext);
  const [wishList, setWishList] = useState(null);

  // useEffect(() => {
  //   if (token) {
  //     getWishList();
  //   }
  // }, []);

  async function removeWishList({ id }) {
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
        // * EDIT 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
        getWishList();
        toast.success("Product removed from wishlist");
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      toast.error("Failed to remove product from wishlist");
    }
  }

  async function getWishList() {
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
      console.log("GET");
      console.log(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to fetch wishlist");
    }
  }

  async function addWishList({ id }) {
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
      console.log(data);

      // * EDIT 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
      setWishList({ ...data, count: data.data.length });
      toast.success("Product added to wishlist");
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      toast.error("Failed to add product to wishlist");
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
