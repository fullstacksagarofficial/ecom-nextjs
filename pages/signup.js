import React,{useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const router = useRouter();
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  useEffect(() => {
    if(localStorage.getItem('myuser')){
      router.push('/')
    }
  }, [])

  const handlechange = (e) => {
    if (e.target.name == "firstname") {
      setfirstname(e.target.value);
    } else if (e.target.name == "lastname") {
      setlastname(e.target.value);
    } 
    else if (e.target.name == "email") {
      setemail(e.target.value);
    } 
    else if (e.target.name == "password") {
      setpassword(e.target.value);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = { firstname,lastname, email, password };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    console.log(response);
    if (response.success == "true") {
      toast.success("Account Created Successfully !", {
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
    }
    else{
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
  return (
    <>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
         
               <Image
                src="/signup.webp"
                alt="Sign Up"
                width="100%"
                height="80px"
                layout="responsive"
                loading="lazy"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <h1 className="my-9 text-3xl">SIGN UP</h1>
              <form method="post" onSubmit={handlesubmit}>
               

                <div className="mb-6">
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    onChange={handlechange}
                    value={firstname}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Firstname"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    onChange={handlechange}
                    value={lastname}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Lastname"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={handlechange}
                    value={email}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handlechange}
                    value={password}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    SignUp
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Already have an account ?  &nbsp;
                    <Link
                      href={"/login"}
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                       Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
