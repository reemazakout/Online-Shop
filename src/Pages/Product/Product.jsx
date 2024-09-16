import { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "../../Componants/ProductCard/ProductCard";
import Loading from "../../Componants/Loading/Loading";
import useProduct from "./../../Hooks/useProduct";
import { Helmet } from "react-helmet";

export default function Product() {
  const { data, isLoading, isError } = useProduct();
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10; // Number of products per page

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  // Pagination logic
  const pageCount = Math.ceil(data.data.data.length / productsPerPage);
  const offset = currentPage * productsPerPage;
  const currentProducts = data.data.data.slice(
    offset,
    offset + productsPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <Helmet>
        <title>Product</title>
        <meta name="description" content="Product Page" />
      </Helmet>
      <div className="py-4 container gap-4 grid grid-cols-12">
        {currentProducts?.map((product) => {
          return <ProductCard productInfo={product} key={product.id} />;
        })}
      </div>

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        forcePage={currentPage}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"prev-link"}
        nextLinkClassName={"next-link"}
        disabledClassName={"disabled"}
      />
    </>
  );
}
