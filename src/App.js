import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import WebFont from "webfontloader";

import Headers from "./components/Headers";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Prodpage from "./components/Prodpage";
import Allproducts from "./components/Allproducts";
import Searchbar from "./components/Searchbar";
import LoginPage from "./components/Login";
import Account from "./components/Account";
import Getnewpassword from "./components/Getnewpassword";
import Forgotpassword from "./components/Forgotpassword";
import Mycart from "./components/Mycart";
import Shippingpage from "./components/Shippingpage";
import Payment from "./components/Payment";
import ConfirmOrder from "./components/ConfirmOrder";
import Success from "./components/Success";
import Myorders from "./components/Myorders";
import Dashboard from "./components/Dashboard";

function App() {
  const { isAuthenticated } = useSelector((state) => state.userdetails);
  const ud = useSelector((state) => state.userdetails);
  const dispatch = useDispatch();
  const [Stripeapikey, setstripeapikey] = useState("");

  useEffect(() => {
    if (Object.keys(ud).length === 1) {
      localStorage.setItem("status", "none");
    } else if (Object.keys(ud).length === 3) {
      localStorage.setItem("status", isAuthenticated ? "loggedin" : "loggedout");
    }
  }, [ud, isAuthenticated]);

  useEffect(() => {
    if (localStorage.getItem("status") === "none" || localStorage.getItem("status") === "loggedin") {
      if (window.innerWidth < 1350) {
        localStorage.setItem("width", window.innerWidth);
      }
    }
    if (localStorage.getItem("status") === "loggedout") {
      localStorage.removeItem("status");
    }
  }, []);

  useEffect(() => {
    const getsapikey = async () => {
      const { data } = await axios.get("https://snap-n-shop-fullmernstack-ecommerce.onrender.com/api/v1/stripeapikey", { withCredentials: true });
      setstripeapikey(data.stripeapikey);
    };
    getsapikey();
  }, [dispatch]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Mulish:200,300,400,500,600,700,800,900']
      }
    });
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.userdetails);
  const [Stripeapikey, setstripeapikey] = useState("");

  useEffect(() => {
    const getsapikey = async () => {
      const { data } = await axios.get("https://snap-n-shop-fullmernstack-ecommerce.onrender.com/api/v1/stripeapikey", { withCredentials: true });
      setstripeapikey(data.stripeapikey);
    };
    getsapikey();
  }, []);

  return (
    <>
      <Headers key={location.pathname} />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product/:id" element={<Prodpage />} />
            <Route path="/products" element={<Allproducts />} />
            <Route path="/products/:keyword" element={<Allproducts />} />
            <Route path="/search" element={<Searchbar />} />
            <Route path="/account" element={<Account />} />
            <Route path="/password/forgot" element={<Forgotpassword />} />
            <Route path="/mycart" element={<Mycart />} />
            <Route path="/auth/password/reset/:id" element={<Getnewpassword />} />
            <Route path="/shipping" element={<Shippingpage />} />
            <Route path="/confirmorder" element={<ConfirmOrder />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/payment"
              element={
                Stripeapikey && (
                  <Elements stripe={loadStripe(Stripeapikey)}>
                    <Payment />
                  </Elements>
                )
              }
            />
            <Route path="/success" element={<Success />} />
            <Route path="/myorders" element={<Myorders />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/Home" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product/:id" element={<Prodpage />} />
            <Route path="/products" element={<Allproducts />} />
            <Route path="/products/:keyword" element={<Allproducts />} />
            <Route path="/search" element={<Searchbar />} />
            <Route path="/account" element={<LoginPage />} />
            <Route path="/password/forgot" element={<Forgotpassword />} />
            <Route path="/auth/password/reset/:id" element={<Getnewpassword />} />
            <Route path="/mycart" element={<LoginPage />} />
            <Route path="/shipping" element={<LoginPage />} />
            <Route path="/payment" element={<LoginPage />} />
            <Route path="/confirmorder" element={<LoginPage />} />
            <Route path="/myorders" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        )}
      </Routes>
      <Footer key={location.pathname} />
    </>
  );
};

export default App;
