import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Product from "../../models/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from 'next/error'

const Post = ({error, buynow, addtocart, product, varients }) => {
  // console.log(product, varients);
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setpin] = useState();
  const [service, setservice] = useState();
  const [color, setcolor] = useState();
  const [size, setsize] = useState();
  useEffect(() => {
    if(!error){
      setcolor(product.color);
      setsize(product.size);
    }
  }, [router.query]);

  const checkService = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setservice(true);
      toast.success("Available !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setservice(false);
      toast.error("Not Available !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onChangePin = (e) => {
    setpin(e.target.value);
  };

  const refreshVarient = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${varients[newcolor][newsize]["slug"]}`;
    // console.log(url);
    // window.location=url;
    router.push(url);
  };

  if(error==404){
    return <Error statusCode={404} />
  }
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={"http://localhost:5000/img/"+product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}( {product.size} / {product.color})
              </h1>

              <p className="leading-relaxed mt-3">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(varients).includes("white") &&
                    Object.keys(varients["white"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVarient(size, "white");
                        }}
                        className={`border-2  ml-1 bg-white rounded-full w-6 h-6 focus:outline-none ${
                          color == "white" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}

                  {Object.keys(varients).includes("black") &&
                    Object.keys(varients["black"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVarient(size, "black");
                        }}
                        className={`border-2  ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${
                          color == "black" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}

                  {Object.keys(varients).includes("red") &&
                    Object.keys(varients["red"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVarient(size, "red");
                        }}
                        className={`border-2  ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none ${
                          color == "red" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}

                  {Object.keys(varients).includes("green") &&
                    Object.keys(varients["green"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVarient(size, "green");
                        }}
                        className={`border-2  ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none ${
                          color == "green" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => refreshVarient(e.target.value, color)}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base pl-3 pr-10"
                    >
                      {color && Object.keys(varients[color]).includes("S") && (
                        <option value={"S"}>S</option>
                      )}
                      {color && Object.keys(varients[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {color && Object.keys(varients[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                      {color && Object.keys(varients[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                      {color && Object.keys(varients[color]).includes("XXL") && (
                        <option value={"XXL"}>XXL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                {product.availableQty > 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ??? {product.price}
                  </span>
                )}

                {product.availableQty <= 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    OUT OF STOCK
                  </span>
                )}
                <button
                  disabled={product.availableQty <= 0}
                  onClick={() => {
                    buynow(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  className="flex ml-8 text-white bg-gray-600 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded disabled:bg-gray-400"
                >
                  Buy Now
                </button>

                <button
                  disabled={product.availableQty <= 0}
                  onClick={() => {
                    addtocart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  className="flex ml-4 text-white bg-gray-700 border-0 py-2 px-6 focus:outline-none hover:bg-redgray-600 rounded disabled:bg-gray-400"
                >
                  Add to Cart
                </button>

                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>

              <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap  items-end md:justify-start">
                <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                  <label
                    htmlFor="footer-field"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Check Availablity
                  </label>
                  <input
                    onChange={onChangePin}
                    type="text"
                    id="footer-field"
                    placeholder="Enter Pin Code"
                    name="footer-field"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-gray-200 focus:border-gray-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button
                  className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-gray-900 bg-transparent border border-gray-700 py-2 px-6 focus:outline-none hover:bg-gray-900 hover:text-white rounded"
                  onClick={checkService}
                >
                  Check
                </button>
              </div>

              {!service && service != null && (
                <div className="text-red-700 mt-3">
                  Opps ! Pin Code Not Available
                </div>
              )}
              {service && service != null && (
                <div className="text-green-700 mt-3">
                  Yupp ! Pin Code Available
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose
      .connect("mongodb://localhost:27017/ecomnextjs", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connection Successfull");
      })
      .catch((e) => {
        console.log("No Connection");
      });
  }

  let error='';
  let product = await Product.findOne({ slug: context.query.slug });
  //   console.log(product);
if(product==null){
  return {
    props: {
      error:404,
    }
  }
}

  let varients = await Product.find({
    title: product.title,
    category: product.category,
  });
  let colorSizeSlug = {};
  // example: {red:{xl:{slug:"wear-the-code-xl"}}}
  for (let item of varients) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      error:error,
      product: JSON.parse(JSON.stringify(product)),
      varients: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}

export default Post;
