import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MyAccount = () => {
  const router = useRouter();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [pincode, setpincode] = useState("");
  const [address, setaddress] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [user, setuser] = useState({ value: null });

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push("/");
    }
    if (myuser && myuser.token) {
      setuser(myuser);
      fetchdata(myuser.token);
    }
  }, []);

  const handlechange = async (e) => {
    if (e.target.name == "firstname") {
      setfirstname(e.target.value);
    } else if (e.target.name == "lastname") {
      setlastname(e.target.value);
    } else if (e.target.name == "address") {
      setaddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setpincode(e.target.value);
    } else if (e.target.name == "phone") {
      setphone(e.target.value);
    } else if (e.target.name == "city") {
      setcity(e.target.value);
    } else if (e.target.name == "state") {
      setstate(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.value);
    } else if (e.target.name == "confirmpassword") {
      setconfirmpassword(e.target.value);
    } else if (e.target.name == "newpassword") {
      setnewpassword(e.target.value);
    }
  }
  const fetchdata = async (token) => {
    let data = { token: token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    // console.log(res);
    setfirstname(res.firstname);
    setlastname(res.lastname);
    setaddress(res.address);
    setpincode(res.pincode);
    setphone(res.phone);
  }

  const handleusersubmit = async () => {
    let data = {
      token: user.token,
      address,
      firstname,
      lastname,
      pincode,
      phone,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    // console.log(res);
    if (res.success) {
      toast.success("Information Updated !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Something Went Wrong !", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handlepasswordsubmit = async () => {
    if(newpassword==confirmpassword){
      let data = {
        token: user.token,
        password,
        confirmpassword,
        newpassword
      };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      // console.log(res);
      if (res.success) {
        toast.success("Password Updated !", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Something Went Wrong !", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      
    }
    else{
      toast.error("Password must be same !", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    setpassword('')
    setconfirmpassword('')
    setnewpassword('')
    
  
  };

  return (
    <>
      <div className="bg-gray-50">
        <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="mt-6 pt-6">
            <h2 className="text-lg font-medium text-gray-900">
              Delievery Details
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
                <div className="mt-1">
                  <button
                    onClick={handleusersubmit}
                    type="button"
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6">
            <h2 className="text-lg font-medium text-gray-900">
              Change Password
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handlechange}
                    value={password}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-500sm:text-lg p-3 focus:outline-none  "
                  />
                </div>
              </div>

           
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    id="newpassword"
                    name="newpassword"
                    onChange={handlechange}
                    value={newpassword}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-500sm:text-lg p-3 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    onChange={handlechange}
                    value={confirmpassword}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-500sm:text-lg p-3 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <div className="mt-7">
                  <button
                    onClick={handlepasswordsubmit}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MyAccount;
