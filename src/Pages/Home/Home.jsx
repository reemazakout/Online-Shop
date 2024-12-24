import Loading from "../../Componants/Loading/Loading";
import HomeSlider from "../../Componants/HomeSlider/HomeSlider";
import CategorySlider from "../../Componants/CategorySlider/CategorySlider";
import useProduct from "../../Hooks/useProduct";
import { Helmet } from "react-helmet";
import Product from "../Product/Product";

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
      <Product></Product>
    </>
  );
}
