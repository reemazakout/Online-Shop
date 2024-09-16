import { useContext, useEffect } from "react";
import { WishListContext } from "../../Context/WishList.context";
import Loading from "../../Componants/Loading/Loading";
import { Link } from "react-router-dom"; // Import Link for navigation

export default function WishList() {
  const { wishList, removeWishList, getWishList } = useContext(WishListContext);

  useEffect(() => {
    getWishList();
  }, []);

  const isLoading = wishList === null;
  const products = wishList?.data || [];
  const hasProducts = products.length > 0;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !hasProducts ? (
        <div className="text-center py-36">
          <h1 className="text-3xl mb-6">No products in the wishlist</h1>
          <Link to="/home" className="btn-primary ">
            Go Back to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 container">
          {products.map((item, index) => (
            <div
              key={`${item?._id}-${index}`}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <img
                className="w-full h-auto mb-4"
                src={item?.imageCover || ""}
                alt={item?.title || "Product"}
              />
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {item?.slug || "No Title"}
                </h2>
                <p className="text-gray-500 mb-2 text-sm">
                  {item?.description || "No Description"}
                </p>
                <div className="flex items-center mb-2">
                  <div className="text-yellow-500 flex items-center mr-4">
                    <i className="fa-solid fa-star mr-1"></i>
                    <span>{item?.ratingsQuantity || 0}</span>
                  </div>
                  <div className="text-red-500 flex items-center">
                    <i className="fa-solid fa-heart mr-1"></i>
                    <span>Love</span>
                  </div>
                </div>
                <div className="text-lg text-green-500 font-bold mb-2">
                  ${item?.price || "0.00"}
                </div>
              </div>
              <div>
                <button
                  onClick={() => removeWishList({ id: item?._id || "" })}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-600 flex items-center text-sm"
                >
                  <i className="fa-solid fa-trash mr-2"></i>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
