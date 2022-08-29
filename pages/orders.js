import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const Ordertable = () => {
  const router = useRouter();

  const [orders, setorders] = useState([]);

  useEffect(() => {
    const fetchorders = async () => {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem("myuser")).token }),
      });

      let response = await res.json();
      console.log(response);
      setorders(response.orders);
      console.log(orders);
    };

    if (!localStorage.getItem("myuser")) {
      router.push("/");
    } else {
      fetchorders();
    }
  }, []);

  return (
    <>
      <div className="container m-auto mt-4 mb-0">
        <h3 className="text-3xl font-normal py-5 text-gray-800 text-center">
          Orders
        </h3>
        <div className=" shadow-md sm:rounded-lg container flex justify-center m-auto my-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Order ID
                </th>

                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={item._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {item.firstname} {item.lastname}
                    </th>
                    <td className="px-6 py-4"> {item.oid}</td>

                    <td className="px-6 py-4">₹{item.amount}</td>
                    <td className="px-6 py-4">
                      <Link
                        href={"/order?id=" + item._id}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Ordertable;
