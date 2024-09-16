// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Loading from "../../Componants/Loading/Loading";

export default function BrandDetails() {
  //   const { id } = useParams();
  //   async function getBrands({ id }) {
  //     const options = {
  //       url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
  //       method: "GET",
  //     };
  //     return await axios.request(options);
  //   }
  //   const { data, isLoading, isError } = useQuery({
  //     queryKey: ["brands"],
  //     queryFn: getBrands,
  //   });
  //   if (isLoading) {
  //     return <Loading />;
  //   }
  //   if (isError) {
  //     return <div>Error loading brands.</div>;
  //   }
  //   return (
  //     <>
  //       {data.data.data.map((brand) => (
  //         <div key={brand._id}>
  //           <h1>{brand.name}</h1>
  //           <img src={brand.image} alt={brand.name} />
  //         </div>
  //       ))}
  //     </>
  //   );
}
