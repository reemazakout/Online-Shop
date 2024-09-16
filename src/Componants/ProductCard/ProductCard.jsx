import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import { WishListContext } from "../../Context/WishList.context";

export default function ProductCard({ productInfo = {} }) {
  const {
    images = [],
    title = "No title",
    price,
    category = {},
    ratingsAverage,
    id,
  } = productInfo;

  const { AddProductToCart } = useContext(CartContext);
  const { addWishList, removeWishList } = useContext(WishListContext);

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (id) {
      setIsInWishlist(wishlist.includes(id));
    }
  }, [id]);

  const handleWishlistClick = () => {
    const updatedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (id) {
      if (isInWishlist) {
        const index = updatedWishlist.indexOf(id);
        if (index !== -1) {
          updatedWishlist.splice(index, 1);
        }
        removeWishList({ id });
      } else {
        updatedWishlist.push(id);
        addWishList({ id });
      }
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(!isInWishlist);
    }
  };

  return (
    <div className="relative shadow-lg col-span-12 sm:col-span-6 lg:col-span-3 md:col-span-4 xl:col-span-2 rounded-lg overflow-hidden group">
      <img
        className="w-full"
        src={images[0] || "/path/to/default-image.jpg"} // Provide a default image path
        alt={title || "No title"}
      />
      <div className="p-3">
        <h3 className="text-primary">{category.name || "Unknown Category"}</h3>
        <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>
        <div className="flex justify-between items-center mt-4">
          <span>{price ? `$${price}` : "Price not available"}</span>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-star text-yellow-500"></i>
            <span>{ratingsAverage ?? "No rating"}</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
        <div
          onClick={handleWishlistClick}
          className="cursor-pointer bg-primary p-3 rounded-full text-white transform transition-transform duration-500 ease-in-out hover:scale-125 hover:rotate-12"
        >
          {isInWishlist ? (
            <i className="fa-solid fa-heart text-black"></i>
          ) : (
            <i className="fa-solid fa-heart"></i>
          )}
        </div>
        <div
          onClick={() => {
            if (id) {
              AddProductToCart({ id });
            }
          }}
          className="cursor-pointer bg-primary p-3 rounded-full text-white transform transition-transform duration-500 ease-in-out hover:scale-125 hover:rotate-12"
        >
          <i className="fa-solid fa-shopping-cart"></i>
        </div>
        <div className="cursor-pointer bg-primary p-3 rounded-full text-white transform transition-transform duration-500 ease-in-out hover:scale-125 hover:rotate-12">
          <Link to={`/product/${id}`} className="fa-solid fa-eye"></Link>
        </div>
      </div>
    </div>
  );
}
