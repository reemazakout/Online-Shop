import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Componants/Loading/Loading";
import { CartContext } from "../../Context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const [details, setDetails] = useState(null);
  const { AddProductToCart } = useContext(CartContext);
  let { id } = useParams();

  async function getProductsDetails() {
    console.log(id);
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    setDetails(data.data);
  }

  useEffect(() => {
    getProductsDetails();
  }, []);
  const imageitems = details?.images.map((imageurl) => {
    return {
      original: imageurl,
      thumbnail: imageurl,
    };
  });

  return (
    <>
      {details == null ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12 gap-6 pb-52 py-12">
          <div className="col-span-12 md:col-span-4">
            <ReactImageGallery items={imageitems} />
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-3xl font-bold">{details.title}</h2>
            <h3 className="text-primary font-semibold">
              {details.category.name}
            </h3>
            <p className="mt-4">{details.description}</p>
            <div className="flex justify-between mt-4 items-center">
              <span className="text-lg font-bold">{details.price} $</span>
              <span className="flex items-center">
                <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
                {details.ratingsAverage}
              </span>
            </div>
            <button
              onClick={() => {
                AddProductToCart({ id: details.id });
              }}
              className="btn-primary mt-4 w-full"
            >
              Add to cart
            </button>
            <Helmet>
              <title>{details.title}</title>
              <meta name="description" content={details.description} />
            </Helmet>
          </div>
        </div>
      )}
    </>
  );
}
