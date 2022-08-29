import "../styles/globals.css";
import React, { useState, useEffect } from "react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { stringify } from "postcss";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }) {
  const [cart, setcart] = useState({});
  const [subtotal, setsubtotal] = useState(0);
  const [user, setuser] = useState({ value: null });
  const [key, setkey] = useState();

  const router = useRouter();

  const [progress, setProgress] = useState(0); // loading bar

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")));
        savecart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      localStorage.clear();
    }

    // check JWT myuser in local storage
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
      setuser({ value: myuser.token, email:myuser.email });
    }
    setkey(Math.random());
  }, [router.query]); //everytime useeffect run by using router.query

  const savecart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart));

    let subtotal = 0;
    let keys = Object.keys(mycart);
    for (let i = 0; i < keys.length; i++) {
      subtotal += mycart[keys[i]].price * mycart[keys[i]].qty;
    }
    setsubtotal(subtotal);
  };

  const addtocart = (itemcode, qty, price, name, size, varient) => {
    if(Object.keys(cart).length==0){
      setkey(Math.random())

    }
    let newcart = cart;
    
    if (itemcode in cart) {
      newcart[itemcode].qty = cart[itemcode].qty + qty;
    } else {
      newcart[itemcode] = { qty: 1, price, name, size, varient };
    }
    setcart(newcart);
    savecart(newcart);
  };

  const clearcart = () => {
    setcart({});
    savecart({});
  };

  const removefromcart = (itemcode, qty, price, name, size, varient) => {
    let newcart = cart;
    if (itemcode in cart) {
      newcart[itemcode].qty = cart[itemcode].qty - qty;
    }
    if (newcart[itemcode].qty <= 0) {
      delete newcart[itemcode];
    }
    setcart(newcart);
    savecart(newcart);
  };

  const buynow = (itemcode, qty, price, name, size, varient) => {
    let newcart={}

    newcart[itemcode]= { qty: 1, price, name, size, varient }


    setcart(newcart);
    savecart(newcart);
    router.push("/checkout");
  };

  
  const logout = () => {
    localStorage.removeItem("myuser");
    setuser({});
    setkey(Math.random);
    toast.success("Logout Successfully !", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    router.push("/");
  };

  return (
    <>
      <LoadingBar
        color="#000"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer
        position="top-left"
        autoClose={800}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {key &&  <Navbar
          user={user}
          key={key}
          cart={cart}
          addtocart={addtocart}
          clearcart={clearcart}
          subtotal={subtotal}
          removefromcart={removefromcart}
          logout={logout}
        ></Navbar> }
      <Component
        buynow={buynow}
        cart={cart}
        addtocart={addtocart}
        clearcart={clearcart}
        subtotal={subtotal}
        removefromcart={removefromcart}
        {...pageProps}
      />

      <Footer></Footer>
    </>
  );
}

export default MyApp;
