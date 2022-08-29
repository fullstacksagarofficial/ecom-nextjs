import Link from "next/link";
import React from "react";
import Product from "../models/Product";
import Category from "../models/category";

import mongoose from "mongoose";
import connectDb from "../middleware/mongoose";

const Tshirts = ({products}) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {Object.keys(products).map((item) => {
            // console.log(products[item].size)
            return <Link
                href={`/product/${products[item].slug}`}
                className="cursor-pointer"
                key={products[item]._id}
              >
                <div className="lg:w-1/4 md:w-1/2 p-4 w-1/2   shadow-sm">
                  <a className="block relative rounded overflow-hidden border">
                    <img
                      alt="ecommerce"
                      className=" w-full h-full block"
                      src={"http://localhost:5000/img/"+products[item].img}

                    />
                  </a>
                  <div className="mt-4 cursor-pointer">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {products[item].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">Rs. {products[item].price}</p>
                    <div className="flex my-2">
                      {products[item].size.includes('S') &&
                        <span className="border px-2 mr-2 cursor-pointer">
                          S
                        </span>
                      }

                      {products[item].size.includes('M') && 
                        <span className="border px-2 mr-2 cursor-pointer">
                          M
                        </span>
                      }

                      {products[item].size.includes('L') && 
                        <span className="border px-2 mr-2 cursor-pointer">
                          L
                        </span>
                      }

                      {products[item].size.includes("XL") && 
                        <span className="border px-2 mr-2 cursor-pointer">
                          XL
                        </span>
                      }
                      {products[item].size.includes("XXL") &&
                        <span className="border px-2 mr-2 cursor-pointer">
                          XXL
                        </span>
                      }
                    </div>

                    <div className="flex my-2">
                      {products[item].color.includes('white') &&
                        <button className="mr-2 border-2 bg-white border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      }

                      {products[item].color.includes('black') &&
                        <button className="mr-2 border-2 bg-black border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      }

                      {products[item].color.includes('red') &&
                        <button className="mr-2 border-2 bg-red-600 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      }

                      {products[item].color.includes('green') &&
                        <button className="mr-2 border-2 bg-green-600 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      }
                    </div>
                  </div>
                </div>
              </Link>
          })}
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose
      .connect(process.env.MONGO_URI, {
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

  let products = await Product.find({ category: "62fe4eebdc35e034b3bdcef8",status:1 });

  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
      else{
        tshirts[item.title].color = [];
        tshirts[item.title].size = []; 
      }
    }
  }
  // console.log(tshirts);

  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  };
}

export default Tshirts;
