import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  AiOutlineShoppingCart,
  AiOutlineCloseCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
// import { HiOutlineUserCircle } from "react-icons/hi";
import Image from "next/image";

const Navbar = ({
  user,
  cart,
  addtocart,
  clearcart,
  subtotal,
  removefromcart,
  logout,
}) => {
const router = useRouter();

  const [dropdown, setdropdown] = useState(false);
  const [sidebar, setsidebar] = useState(false);
  useEffect(() => {
    Object.keys(cart).length !== 0 && setsidebar(true);
    let exempted=['/checkout','/order','/orders','/about','/my-account','/signup','/login']
    if(exempted.includes(router.pathname)){
      setsidebar(false)
    }
  
  }, []);

  const toogleCart = () => {
    setsidebar(!sidebar);
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
  };

  const ref = useRef();
  return (
    <>
      <nav className="bg-white text-gray-900 py-5 shadow-slate-300 shadow-sm sticky top-0 z-50">
        <div className="container flex  justify-between items-start flex-col mx-auto md:flex-row px-5">
          <a href="" className="flex items-center ml-3 mt-1">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-gray-900">
              E-commerce Store
            </span>
          </a>
          <ul className="flex  items-center justify-center text-center space-x-2  mt-3 md:mt-0 text-gray-900 md:m-auto ">
            <li>
              <Link href={"/"}>
                <a className="block py-2 pr-4 pl-3 text-gray-900  font-semibold hover:text-gray-500">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href={"/about-us"}>
                <a className="block py-2 pr-4 pl-3 text-gray-900  font-semibold hover:text-gray-500">
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href={"/contact-us"}>
                <a className="block py-2 pr-4 pl-3 text-gray-900  font-semibold hover:text-gray-500">
                  Contact
                </a>
              </Link>
            </li>
            <li>
              <Link href={"/tshirts"}>
                <a className="block py-2 pr-4 pl-3 text-gray-900  font-semibold hover:text-gray-500">
                  T-shirt
                </a>
              </Link>
            </li>
            <li>
              <Link href={"/jeans"}>
                <a className="block py-2 pr-4 pl-3 text-gray-900  font-semibold hover:text-gray-500">
                  Jeans
                </a>
              </Link>
            </li>
            <li>
              <Link href={"/jeans"}>
                <a className="block py-2 pr-4 pl-3 text-gray-900  font-semibold  hover:text-gray-500">
                  Shoes
                </a>
              </Link>
            </li>
          </ul>
          <div className="text-xl absolute right-4 cursor-pointer flex space-x-3">
            {user.value && (
              <span
                className="py-2 mb-2 text-xl font-medium text-gray-900 focus:outline-none cursor-pointer"
                onMouseOver={() => {
                  setdropdown(true);
                }}
                onMouseLeave={() => {
                  setdropdown(false);
                }}
              >
                <Image
                  src="/user.png"
                  alt="User"
                  width="30px"
                  height="30px"
                  loading="lazy"
                />
              </span>
            )}

            {dropdown && (
              <div
                onMouseOver={() => {
                  setdropdown(true);
                }}
                onMouseLeave={() => {
                  setdropdown(false);
                }}
                className="cursor-pointer items-center absolute top-7 flex mx-5 bg-gray-100 w-36  right-16 rounded-md text-gray-800 px-3 py-3 text-lg shadow-sm shadow-gray-300 "
              >
                <ul>
                  <Link href={"/my-account"}>
                    <li className="py-1 hover:text-gray-600 ">My Account</li>
                  </Link>
                  <Link href={"/orders"}>
                    <li className="py-1 hover:text-gray-600 ">Orders</li>
                  </Link>

                  <li onClick={logout} className="py-1 hover:text-gray-600 ">
                    Logout
                  </li>
                </ul>
              </div>
            )}
            {!user.value && (
              <Link href={"/login"}>
                <button
                  type="button"
                  className="py-2.5 px-3 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-gray-900 dark:hover:bg-gray-700"
                >
                  Login
                </button>
              </Link>
            )}

            <button
              onClick={toogleCart}
              type="button"
              className="py-2.5 px-3 mr-2 mb-2 text-xl font-medium text-gray-900 focus:outline-none cursor-pointer"
            >
              {" "}
              <AiOutlineShoppingCart />
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className={`sidecart absolute top-0 right-0 bg-gray-200 h-[100vh] z-50 text-gray-900 w-72 transition-all
                ${sidebar ? "right-0" : "-right-96"}
                `}
        >
          <h3 className=" p-6 text-center bg-black text-gray-100 font-semibold text-xl  ">
            Shopping Cart
          </h3>
          <div className="p-6">
            <div
              className="absolute right-3 top-6 text-2xl cursor-pointer text-white "
              onClick={toogleCart}
            >
              <AiOutlineCloseCircle />
            </div>

            <ol className="list-decimal font-medium py-6 pl-3">
              {Object.keys(cart).length == 0 && (
                <div className="text-gray-800">No Item In the Cart</div>
              )}

              {Object.keys(cart).map((k) => {
                return (
                  <li key={k} className="mb-4 text-gray-900">
                    <div className="item flex">
                      <div className="w-2/3 ">
                        {cart[k].name}({cart[k].size}/{cart[k].varient})
                      </div>
                      <div className="flex w-1/3 text-gray-900">
                        <AiOutlineMinusCircle
                          className="mx-2 my-1 cursor-pointer font-thin text-gray-900"
                          onClick={() => {
                            removefromcart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].varient
                            );
                          }}
                        />{" "}
                        {cart[k].qty}{" "}
                        <AiOutlinePlusCircle
                          onClick={() => {
                            addtocart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].varient
                            );
                          }}
                          className="mx-2 my-1 cursor-pointer font-thin text-gray-900"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
              {subtotal != 0 && (
                <div className="py-1  mt-8">
                  <span className="underline text-xl">
                    Subtotal: ₹ {subtotal}
                  </span>
                </div>
              )}
            </ol>

            {Object.keys(cart).length != 0 && (
              <div className="flex justify-center space-x-4 ">
                <Link href={"/checkout"}>
                  <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
                    <BsCartCheck className="mr-2" />
                    <span>Checkout</span>
                  </button>
                </Link>

                <button
                  onClick={clearcart}
                  className="bg-transparent text-black border border-black hover:bg-gray-300 hover:text-gray-900 font-medium py-2 px-4 rounded inline-flex items-center justify-center "
                >
                  <span>Clear</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
