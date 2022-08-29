import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Footer = () => {
  const [subscriptionEmail, setsubscriptionEmail] = useState("");

  const handlechange = (e) => {
    if (e.target.name == "subscriptionEmail") {
      setsubscriptionEmail(e.target.value);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = { subscriptionEmail };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    // console.log(response);
    if (response.success == "True") {
      toast.success("Subscription Added !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (response.error == "False") {
      toast.error("Email is Required !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setsubscriptionEmail("");
  };
  return (
    <>
      <footer
        aria-labelledby="footer-heading"
        className="bg-white border-t border-gray-200"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
              <div className="">
                
                <Image
                src="/logo.jpg"
                alt="Sign Up"
                width="160px"
                height="160px"
                layout="responsive"
                loading="lazy"
              />
              </div>

              <div className="mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6">
                <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Products
                    </h3>
                    <ul role="list" className="mt-6 space-y-6">
                      <li className="text-sm">
                        <Link href={"/"}>
                          <a className="text-gray-500 hover:text-gray-600">
                            Bags
                          </a>
                        </Link>
                      </li>
                      <li className="text-sm">
                        <Link href={"/"}>
                          <a className="text-gray-500 hover:text-gray-600">
                            Bags
                          </a>
                        </Link>
                      </li>
                      <li className="text-sm">
                        <Link href={"/"}>
                          <a className="text-gray-500 hover:text-gray-600">
                            Bags
                          </a>
                        </Link>
                      </li>
                      <li className="text-sm">
                        <Link href={"/"}>
                          <a className="text-gray-500 hover:text-gray-600">
                            Bags
                          </a>
                        </Link>
                      </li>
                      <li className="text-sm">
                        <Link href={"/"}>
                          <a className="text-gray-500 hover:text-gray-600">
                            Bags
                          </a>
                        </Link>
                      </li>
                      <li className="text-sm">
                        <Link href={"/"}>
                          <a className="text-gray-500 hover:text-gray-600">
                            Bags
                          </a>
                        </Link>
                      </li>

                      
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Company
                    </h3>
                    <ul role="list" className="mt-6 space-y-6">
                      

                      <li className="text-sm">
                  <Link href={"/about-us"}>
                    <a className="text-gray-500 hover:text-gray-600">About</a>
                  </Link>
                </li>

                <li className="text-sm">
                    <Link href={"/contact-us"}>
                    <a className="text-gray-500 hover:text-gray-600">Contact</a>
                  </Link>
                </li>

                <li className="text-sm">
                  <Link href={"/terms-and-condition"}>
                    <a className="text-gray-500 hover:text-gray-600">
                      Terms & Conditions
                    </a>
                  </Link>
                </li>

                <li className="text-sm">
                  <Link href={"/privacy-policy"}>
                    <a className="text-gray-500 hover:text-gray-600">
                      Privacy Policy
                    </a>
                  </Link>
                </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Customer Service
                  </h3>
                  <ul role="list" className="mt-6 space-y-6">
                    <li className="text-sm">
                      <a href="#" className="text-gray-500 hover:text-gray-600">
                        {" "}
                        Contact{" "}
                      </a>
                    </li>

                    <li className="text-sm">
                      <a href="#" className="text-gray-500 hover:text-gray-600">
                        {" "}
                        Shipping{" "}
                      </a>
                    </li>

                    <li className="text-sm">
                      <a href="#" className="text-gray-500 hover:text-gray-600">
                        {" "}
                        Returns{" "}
                      </a>
                    </li>

                    <li className="text-sm">
                      <a href="#" className="text-gray-500 hover:text-gray-600">
                        {" "}
                        Warranty{" "}
                      </a>
                    </li>

                    <li className="text-sm">
                      <a href="#" className="text-gray-500 hover:text-gray-600">
                        {" "}
                        Secure Payments{" "}
                      </a>
                    </li>

                    <li className="text-sm">
                      <a href="#" className="text-gray-500 hover:text-gray-600">
                        {" "}
                        FAQ{" "}
                      </a>
                    </li>

                    <li className="text-sm">
                      <a href="#" className="text-gray-500 hover:text-gray-600">
                        {" "}
                        Find a store{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Sign up for our newsletter
                </h3>
                <p className="mt-6 text-sm text-gray-500">
                  The latest deals and savings, sent to your inbox weekly.
                </p>
                <form
                  className="mt-2 flex sm:max-w-md"
                  method="POST"
                  onSubmit={handlesubmit}
                >
                  <label htmlFor="newsletter-email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="text"
                    id="subscriptionEmail"
                    name="subscriptionEmail"
                    onChange={handlechange}
                    value={subscriptionEmail}
                    autoComplete="email"
                    className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                  <div className="ml-4 flex-shrink-0">
                    <button
                      type="submit"
                      className="w-full bg-gray-600 border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 py-10 text-center">
            <p className="text-sm text-gray-500">
              &copy; 2022 All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
