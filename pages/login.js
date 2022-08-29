import React,{useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const router = useRouter();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');


  useEffect(() => {
    if(localStorage.getItem('myuser')){
      router.push('/')
    }
  }, [])
  

  const handlechange = (e) => {
    if (e.target.name == "email") {
      setemail(e.target.value);
      // console.log(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.value);
      // console.log(e.target.value);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    // console.log(response);
    if (response.success == "True") {
      // console.log(response.success);
      localStorage.setItem('myuser', JSON.stringify({token: response.token,email:response.email}) );
      toast.success("You Are successfully loged In !", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push(process.env.NEXT_PUBLIC_HOST);
      }, 2000);
    } else {
      toast.error("Invalid Credentials !", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setemail("");
    setpassword("");
  };
  return (
    <>
      <section>
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                  <Image
                src="/login.webp"
                alt="Logo"
                width="100%"
                height="80px"
                layout="responsive"
                loading="lazy"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <h1 className="my-9 text-3xl">LOGIN</h1>
              <form method="post" onSubmit={handlesubmit}>
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

                <div className="flex justify-between items-center mb-6">
                 
                  <Link href={"/forgot-password"} className="text-gray-800">
                    Forgot password?
                  </Link>
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account ? &nbsp;
                    <Link
                      href={"/signup"}
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Register
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

export default Login;
