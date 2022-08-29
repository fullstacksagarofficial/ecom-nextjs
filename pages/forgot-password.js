import React, { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Forgot = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handlechange = (e) => {
    if (e.target.name == "password") {
      setpassword(e.target.value);
    } else if (e.target.name == "confirmpassword") {
      setconfirmpassword(e.target.value);
    } 
  };
  const sendresetemail = async () => {
    let udata = {
      email,
      sendmail: true,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(udata),
    });
    let res = await a.json();
    console.log(res);
    if (res.success) {
      toast.success("Please Check your email to reset your password !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setpassword("");
      setconfirmpassword("");
     
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
  };
  const resetpassword = async () => {
    if (password == confirmpassword) {
      let udata = {
        password,
        sendmail: false,
      };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(udata),
      });
      let res = await a.json();
      if (res.success) {
        toast.success("Password Successfully Updated !", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setfirstname("");
        setlastname("");
        setemail("");
        setpassword("");
        setTimeout(() => {
          router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);
        }, 2000);
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
    else {
      toast.error("Password Must Be Same !", {
        position: "bottom-center",
        autoClose: 3000,
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
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
              <Image
                src="/forgot.jpg"
                alt="Forgot Password"
                width="100%"
                height="80px"
                layout="responsive"
                loading="lazy"
              />
            </div>
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              {router.query.token && (
                <div className="px-8 mb-4 text-center">
                  <h3 className="pt-4 mb-2 text-2xl">New Password</h3>
                </div>
              )}
              {!router.query.token && (
                <div className="px-8 mb-4 text-center">
                  <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                  <p className="mb-4 text-sm text-gray-700">
                    We get it, stuff happens. Just enter your email address
                    below and we'll send you a link to reset your password!
                  </p>
                </div>
              )}

              {router.query.token && (
                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="Password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      onChange={handlechange}
                      value={password}
                      name="password"
                      placeholder="New Password"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="Password"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="confirmpassword"
                      type="password"
                      onChange={handlechange}
                      value={confirmpassword}
                      name="confirmpassword"
                      placeholder="Confirm Password"
                    />
                  </div>
                  {password !== confirmpassword && <div className="mb-5 text-red-500">Password not match !</div>   }
                  <div className="mb-6 text-center">
                    <button
                    disabled={password !== confirmpassword}
                      onClick={resetpassword}
                      className="w-full px-4 py-2 font-bold text-white bg-gray-600 rounded-full hover:bg-gray-700 focus:outline-none focus:shadow-outline disabled:bg-gray-400 "
                      type="button"
                    >
                      Submit
                    </button>

                  </div>
                </form>
              )}

              {!router.query.token && (
                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Enter Email Address..."
                    />
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      onClick={sendresetemail}
                      className="w-full px-4 py-2 font-bold text-white bg-gray-500 rounded-full hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Send Mail
                    </button>
                  </div>
                  <hr className="mb-6 border-t " />
                  <div className="text-center text-blue-500 align-baseline hover:text-blue-800">
                    <Link
                      href={"/signup"}
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    >
                      Create an Account!
                    </Link>
                  </div>
                  <div className="text-center text-blue-500 align-baseline hover:text-blue-800">
                    <Link
                      href={"/login"}
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    >
                      Already have an account? Login!
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;
