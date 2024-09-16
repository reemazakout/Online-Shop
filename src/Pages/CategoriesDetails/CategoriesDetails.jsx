import { Link, useParams } from "react-router-dom";
import Loading from "../../Componants/Loading/Loading";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoriesDetails() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  async function getCategory() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setDetails(data.data);
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  }

  useEffect(() => {
    getCategory();
  }, [id]);

  return (
    <>
      {details == null ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <img
                src={details.image}
                alt={details.name}
                className="w-full h-80 rounded-lg object-contain"
              />
            </div>
            <div className="w-full md:w-2/3 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {details.name}
              </h2>
              <p className="text-lg text-gray-600 mb-6">{details.slug}</p>
              <div className="flex space-x-4">
                <Link to="/categories" className="btn-primary">
                  Back to Categories
                </Link>
                <Link
                  to="/home"
                  className="btn-secondary text-gray-700 py-2 px-4 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
                >
                  Back to Home Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
