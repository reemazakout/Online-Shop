import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function AuthLayout() {
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <Outlet className="container pb-[270px] pt-[90px]"></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
}
