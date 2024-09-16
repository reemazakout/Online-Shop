import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/Loo.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/User.context";
import { CartContext } from "../../Context/Cart.context";
import { WishListContext } from "../../Context/WishList.context";

export default function NavBar() {
  const { token, logout } = useContext(UserContext);
  const { getCartInfo, cartInfo } = useContext(CartContext);
  const { wishList, getWishList } = useContext(WishListContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (token) {
      getCartInfo();
      getWishList();
    }
  }, [token]);

  const navLinkClass = ({ isActive }) =>
    `relative before:transition-[width] before:duration-300 before:content-[''] before:block before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 hover:before:w-full hover:font-bold ${
      isActive ? "font-bold before:w-full" : "before:w-0"
    }`;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 p-4 bg-slate-100 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1 className="hidden md:block flex-shrink-0">
          <a href="/">
            <div className="flex items-center gap-2">
              <span className="text-primary font-extrabold  text-3xl">
                OnlineShop
              </span>
            </div>
          </a>
        </h1>

        <div className="flex items-center gap-6 md:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i
              className={`fa-solid ${
                menuOpen ? "fa-xmark" : "fa-bars"
              } text-2xl`}
            ></i>
          </button>
        </div>

        <div
          className={`flex-col md:flex md:flex-row md:items-center md:gap-6 ${
            menuOpen ? "flex" : "hidden"
          } md:flex w-full md:w-auto justify-center`}
        >
          <div className="flex flex-col md:flex-row md:gap-6 items-center mt-4 md:mt-0 w-full md:w-auto">
            {token && (
              <ul className="flex flex-col md:flex-row md:gap-6 items-center mt-4 md:mt-0 gap-4">
                <li>
                  <NavLink className={navLinkClass} to="/home">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className={navLinkClass} to="/product">
                    Product
                  </NavLink>
                </li>
                <li>
                  <NavLink className={navLinkClass} to="/categories">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink className={navLinkClass} to="/brands">
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink className={navLinkClass} to="/allorders">
                    Orders
                  </NavLink>
                </li>
              </ul>
            )}
            {token && (
              <>
                <Link to="/wishlist" className="cursor-pointer relative">
                  <i className="fa-solid fa-heart text-xl"></i>
                  <span className="text-xs absolute flex items-center justify-center top-0 translate-x-1/2 -translate-y-1/2 right-0 bg-primary text-white w-5 h-5 rounded-full">
                    {wishList == null ? (
                      <i className="fa-solid fa-spinner fa-spin" />
                    ) : (
                      wishList.count || 0
                    )}
                  </span>
                </Link>

                <Link to="/cart" className="cursor-pointer relative">
                  <i className="fa-solid fa-cart-shopping text-xl"></i>
                  <span className="text-xs absolute flex items-center justify-center top-0 translate-x-1/2 -translate-y-1/2 right-0 bg-primary text-white w-5 h-5 rounded-full">
                    {cartInfo == null ? (
                      <i className="fa-solid fa-spinner fa-spin" />
                    ) : (
                      cartInfo.numOfCartItems || 0
                    )}
                  </span>
                </Link>
              </>
            )}

            <ul className="flex flex-col md:flex-row md:gap-6 items-center mt-4 md:mt-0 gap-4">
              <li>
                <a href="https://www.facebook.com" aria-label="Facebook">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com" aria-label="TikTok">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" aria-label="Twitter">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" aria-label="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
            </ul>

            <ul className="flex flex-col md:flex-row md:gap-6 items-center mt-4 md:mt-0 gap-4">
              {!token ? (
                <>
                  <li>
                    <NavLink className={navLinkClass} to="/auth/login">
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={navLinkClass} to="/auth/signup">
                      Sign Up
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <span
                    onClick={logout}
                    className="cursor-pointer"
                    aria-label="Logout"
                  >
                    <i className="fa-solid font-bold fa-arrow-right-to-bracket"></i>
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
