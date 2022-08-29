import React, { useState, useEffect } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineCloseCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import Head from "next/head";
import Script from "next/script";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PaytmChecksum = require("paytmchecksum");

const Checkout = ({ cart, clearcart, addtocart, removefromcart, subtotal }) => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [pincode, setpincode] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");

  const [disabled, setdisabled] = useState(true);

  const [user, setuser] = useState({ value: null });
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));

    if (myuser && myuser.token) {
      setuser(myuser);
      setemail(myuser.email);
      fetchdata(myuser.token);
    }
  }, []);

  useEffect(() => {
    if (
      firstname.length > 2 &&
      lastname.length > 2 &&
      email.length > 2 &&
      phone.length >= 10 &&
      pincode.length > 2 &&
      address.length > 2 &&
      city.length > 2 &&
      state.length > 2
    ) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  }, [firstname, lastname, email, phone, pincode, address, city, state]);

  const fetchdata = async (token) => {
    let udata = { token: token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(udata),
    });
    let res = await a.json();
    setfirstname(res.firstname);
    setlastname(res.lastname);
    setaddress(res.address);
    setpincode(res.pincode);
    setphone(res.phone);
    getpincode(res.pincode);
  };

  const getpincode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();

    if (Object.keys(pinJson).includes(pin)) {
      setcity(pinJson[pin][0]);
      setstate(pinJson[pin][1]);
    } else {
      setstate("");
      setcity("");
    }
  };
  const handlechange = async (e) => {
    if (e.target.name == "firstname") {
      setfirstname(e.target.value);
    } else if (e.target.name == "lastname") {
      setlastname(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "phone") {
      setphone(e.target.value);
    } else if (e.target.name == "pincode") {
      setpincode(e.target.value);
      if (e.target.value.length == 6) {
        getpincode(e.target.value);
      } else {
        setstate("");
        setcity("");
      }
    } else if (e.target.name == "address") {
      setaddress(e.target.value);
    } else if (e.target.name == "city") {
      setcity(e.target.value);
    } else if (e.target.name == "state") {
      setstate(e.target.value);
    }
  };

  const initiatepayment = async () => {
    let amount;
    let oid = Math.floor(Math.random() * Date.now());
    // get a transaction token
    const data = {
      email: email,
      firstname,
      lastname,
      phone,
      pincode,
      state,
      city,
      cart,
      subtotal,
      oid,
      address,
    };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txnResponse = await a.json();
    if (txnResponse.success) {
      let txnToken = txnResponse.txnToken;
      var config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: oid /* update order id */,
          token: txnToken /* update token value */,
          tokenType: "TXN_TOKEN",
          amount: amount /* update amount */,
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          },
        },
      };

      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    } else {
      if (txnResponse.cartclear) {
        clearcart(); // clear cart if someone change price
      }
      toast.error(txnResponse.error, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
        <Script
          type="application/javascript"
          crossorigin="anonymous"
          src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        ></Script>
      </Head>
      <div className="bg-gray-50">
        <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <h1 className="sr-only">Checkout</h1>

            <form
              className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
              method="POST"
            >
              <div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    Contact information
                  </h2>

                  <div className="mt-4">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      {user && user.token ? (
                        <input
                          type="text"
                          id="email"
                          name="email"
                          value={user.email}
                          readOnly
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-500sm:text-lg p-3 focus:outline-none"
                        />
                      ) : (
                        <input
                          type="text"
                          id="email"
                          name="email"
                          onChange={handlechange}
                          value={email}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-500sm:text-lg p-3 focus:outline-none"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-medium text-gray-900">
                    Shipping information
                  </h2>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="firstname"
                          name="firstname"
                          onChange={handlechange}
                          value={firstname}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-500sm:text-lg p-3 focus:outline-none  "
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="lastname"
                          name="lastname"
                          onChange={handlechange}
                          value={lastname}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-500sm:text-lg p-3 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          onChange={handlechange}
                          value={address}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-500sm:text-lg p-3 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          onChange={handlechange}
                          value={phone}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-500sm:text-lg p-3 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal code
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          onChange={handlechange}
                          value={pincode}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-500sm:text-lg p-3 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="city"
                          name="city"
                          onChange={handlechange}
                          value={city}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-500sm:text-lg p-3 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="state"
                          name="state"
                          onChange={handlechange}
                          value={state}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-500sm:text-lg p-3 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>
                <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  {Object.keys(cart).length == 0 && (
                    <div>No Item In the Cart</div>
                  )}
                  <ul role="list" className="divide-y divide-gray-200">
                    {Object.keys(cart).map((k) => {
                      return (
                        <li className="flex py-6 px-4 sm:px-6" key={k}>
                          <div className="flex-shrink-0">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg"
                              alt="Front of men&#039;s Basic Tee in black."
                              className="w-20 rounded-md"
                            />
                          </div>

                          <div className="ml-6 flex-1 flex flex-col">
                            <div className="flex">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm">
                                  <a
                                    href="#"
                                    className="font-medium text-gray-700 hover:text-gray-800"
                                  >
                                    {cart[k].name}({cart[k].size}/
                                    {cart[k].varient}){" "}
                                  </a>
                                </h4>
                                <p className="mt-1 text-sm text-gray-500">
                                  {" "}
                                  {cart[k].varient}
                                </p>
                              </div>

                              <div className="ml-4 flex-shrink-0 flow-root">
                                <button
                                  type="button"
                                  className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                                >
                                  <span className="sr-only">Remove</span>
                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="flex-1 pt-2 flex items-end justify-between">
                              <p className="mt-1 text-sm font-medium text-gray-900">
                                {" "}
                                {cart[k].qty} x ₹{cart[k].price}
                              </p>

                              <div className="ml-4">
                                <label htmlFor="quantity" className="sr-only">
                                  Quantity
                                </label>
                                ₹ {cart[k].price * cart[k].qty}
                              </div>
                              <div className="flex ">
                                <AiOutlineMinusCircle
                                  className="mx-2 my-1 cursor-pointer text-black"
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
                                  className="mx-2 my-1 cursor-pointer text-black"
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ₹ {subtotal}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        Free
                      </dd>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <dt className="text-base font-medium">Total</dt>
                      <dd className="text-base font-medium text-gray-900">
                        ₹ {subtotal}
                      </dd>
                    </div>
                  </dl>

                  <div
                    className="border-t border-gray-200 py-6 px-4 sm:px-6"
                    onClick={initiatepayment}
                    type="submit"
                  >
                    <button
                      disabled={disabled}
                      type="submit"
                      className="w-full disabled:bg-gray-300 bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                    >
                      Pay ₹ {subtotal}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Checkout;
