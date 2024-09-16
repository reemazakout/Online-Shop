import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import required Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "../../Componants/Loading/Loading";

import "./CategorySlider.css"; // Import custom styles

export default function CategorySlider() {
  async function getCategory() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return await axios.request(options);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
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

  const breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 10 },
    480: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 30 },
    1024: { slidesPerView: 4, spaceBetween: 40 },
    1280: { slidesPerView: 6, spaceBetween: 50 },
  };

  const sliderConfig = {
    breakpoints,
    autoplay: { delay: 3000 },
    navigation: true,
    pagination: { clickable: true },
    modules: [Autoplay, Navigation, Pagination],
  };

  return (
    <div className="container">
      <span className="text-3xl font-semibold py-5 block">
        The most popular Categories
      </span>
      <Swiper {...sliderConfig}>
        {data?.data?.data.map((cat) => (
          <SwiperSlide key={cat?._id}>
            <Link to={`/categories/${cat._id}/subcategories`}>
              <img
                className="w-full h-72 object-cover"
                src={cat?.image}
                alt={cat?.name}
              />
              <div className="text-lg font-semibold py-4 pb-8">{cat?.name}</div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
