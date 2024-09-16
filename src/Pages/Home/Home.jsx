import ProductCard from "../../Componants/ProductCard/ProductCard";
import Loading from "../../Componants/Loading/Loading";
import HomeSlider from "../../Componants/HomeSlider/HomeSlider";
import CategorySlider from "../../Componants/CategorySlider/CategorySlider";
import useProduct from "../../Hooks/useProduct";
import { Helmet } from "react-helmet";

export default function Home() {
  const { data, isLoading } = useProduct(); // destructiong from response  , also I can make const response = useProduct();

  if (isLoading) {
    return <Loading />;
  }
  console.log({ data });
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home Page" />
      </Helmet>
      <CategorySlider></CategorySlider>
      <HomeSlider></HomeSlider>
      <div className="py-4 container gap-4 grid grid-cols-12">
        {data.data.data.map((product) => {
          return <ProductCard productInfo={product} key={product.id} />;
        })}
      </div>
    </>
  );
}
