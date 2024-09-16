import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";

async function getSubCategories(id) {
  const options = {
    url: `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
    method: "GET",
  };
  return await axios.request(options);
}

const SubCategory = () => {
  const { id } = useParams(); // Extract id from URL params
  const { data, isLoading, error } = useQuery({
    queryKey: ["subCategories", id],
    queryFn: () => getSubCategories(id), // Pass id to the query function
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 5000,
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
    gcTime: 10000,
    retry: 3,
    retryDelay: 2000,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const subCategories = data?.data?.data || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-primary mb-4">SubCategories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subCategories.map((subCategory, index) => (
          <div
            key={subCategory?._id || index}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transform hover:scale-105 transition-transform"
          >
            <h2 className="text-xl font-semibold text-primary">
              {subCategory?.name}
            </h2>
            <p className="text-primary mt-2">{subCategory?.slug}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategory;
