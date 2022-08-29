import React,{useState,useEffect} from "react";
import { useRouter } from "next/router";
import Order from "../models/Order";
import mongoose from "mongoose";
const MYOrder = ({order}) => {
  const products=order.product
  const router = useRouter();
const [date, setdate] = useState('')
// console.log(order);
useEffect(() => {
const d=new Date(order.createdAt)
setdate(d)
}, [])

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Ecommerce Store
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order ID #{order.oid}
              </h1>
              <p className="leading-relaxed mb-4">
                Your Order has been successfully placed ! Your Payment Status is{" "}
                {order.status}
              </p>
              <p className="leading-relaxed mb-4">
                Your Order placed on &nbsp;
                {date && date.toLocaleDateString("en-IN")}
              </p>
              <div className="flex mb-4">
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 text-center">
                  Item
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 text-center">
                  Quantity
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 text-center">
                  Total
                </a>
              </div>

              {Object.keys(products).map((key) => {
                return (
                  <div className="flex  py-2" key={key}>
                    <span className="text-gray-500 ">
                      {products[key].name} {products[key].size}/
                      {products[key].varient}
                    </span>
                    <span className="text-gray-500 ml-auto">
                      {products[key].qty}
                    </span>
                    <span className="ml-auto text-gray-900 ">
                    ₹ {products[key].price} X {products[key].qty}= ₹ {products[key].price * products[key].qty}
                    </span>
                  </div>
                );
              })}

              <div className="flex mt-5">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Subtotal : Rs.{order.amount}
                </span>
                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  Track Order
                </button>
              </div>
            </div>
            <img
              alt="order"
              className="lg:w-1/2 w-full lg:h-auto h-auto  rounded"
              src="/orders.webp"
            />
          </div>
        </div>
      </section>
    </>
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

  let order = await Order.findById( context.query.id );
  //   console.log(product);




  return {
    props: {
      order: JSON.parse(JSON.stringify(order))
    }, // will be passed to the page component as props
  };
}

export default MYOrder;
