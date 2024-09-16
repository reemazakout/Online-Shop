import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow pt-36 pb-8">
          {" "}
          <div className="container">
            <Outlet className="container" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
