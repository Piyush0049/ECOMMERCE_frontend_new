import React, { useState, useEffect } from 'react';
import backimage from "./snapedit_1711040704089.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createorder } from './actions/orderactions';
import { useStripe } from '@stripe/react-stripe-js';

const Payment = () => {
  const [x, setx] = useState("");
useEffect(() => {
    if(localStorage.getItem("width") !== null){
        setx(localStorage.getItem("width"));
    }else{
        setx(window.innerWidth);
    }
  }, []);
  const stripe = useStripe(); 
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '' 
  });
  const [paymentError, setPaymentError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const totalprice = Number(localStorage.getItem("totalprice"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalmoney = totalprice;
  const { cartitems } = useSelector((state) => state.cart);
  const shippingdet = JSON.parse(localStorage.getItem("shippingdetails"));

  const userAddress = {
    line1: shippingdet.userDetails.address,
    line2: shippingdet.userDetails.address,
    city: shippingdet.selectedCity.label,
    state: shippingdet.selectedState.value,
    country: "US",
    postal_code: "125001",
  };

  const orderdis = {
    shippinginfo: {
      address: shippingdet.userDetails.address,
      city: shippingdet.selectedCity.label,
      state: shippingdet.selectedState.value,
      country: "US",
      pincode: 125001,
      phoneno: shippingdet.userDetails.phone,
    },
    orderitems: cartitems,
    paymentInfo: {
      id: "",
      status: "succeeded"
    },
    itemsPrice: (totalprice * 100) / 118,
    taxPrice: (totalprice * 18) / 118,
    shippingPrice: 0,
    totalPrice: totalmoney,
    orderStatus: "pending"
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(cardDetails)
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to complete the payment?")) {
      setIsProcessing(true);

      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        const { data } = await axios.post("https://snap-n-shop-fullmernstack-ecommerce.onrender.com/api/v1/payment/process", {
          description: "Description of the export transaction goes here",
          amount: Math.round(totalprice * 100),
        }, config);

        const clientSecret = data.client_secret;
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: {
              number: cardDetails.cardNumber,
              exp_month: cardDetails.expiry.split('/')[0],
              exp_year: cardDetails.expiry.split('/')[1],
              cvc: cardDetails.cvc,
            },
            billing_details: {
              name: shippingdet.userDetails.name,
              email: shippingdet.userDetails.email,
              address: userAddress
            },
            payment_method: "pm_1PGwhhSHcH5kC6C6P8gjGcXk",
          }
        });

        if (result.error) {
          setPaymentError(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            const paymentId = result.paymentIntent.id;
            orderdis.paymentInfo.id = paymentId;
            dispatch(createorder(orderdis));
            navigate("/success");
          } else {
            setPaymentError("There's some issue while processing payment");
          }
        }
      } catch (error) {
        console.error('Error:', error.message);
        setPaymentError(error.message);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const styles = {
    container: {
      minHeight: x >= 692 ? '1000px' : '3000px', 
      minWidth: x >= 692 ? '1540px' : '1540px',
      height: "auto",
      width: "auto",
      alignItems: 'center',
      background: '#f0f0f0',
      backgroundImage: `url(${backimage})`, 
      backgroundSize: 'cover'
    },
    cardForm: {
      width: '500px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      background: '#fff',
    },
    hr2: {
      borderWidth: "2px",
      opacity: 0.6,
      width: "300px",
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      boxSizing: 'border-box'
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: x >= 692 ? "60px" : '110px', paddingBottom: x >= 692 ? null : '70px', }}>
        <Link to="/mycart" style={{ fontSize: x >= 692 ? '25px' : '35px', color: "green", textDecoration: "none" }}>Place Order <i className="fa-solid fa-cart-shopping"></i></Link>
        <hr style={styles.hr2} />
        <Link style={{ fontSize: x >= 692 ? '25px' : '35px', color: "green", textDecoration: "none" }}>Confirm Order <i className="fa-solid fa-check"></i></Link>
        <hr style={styles.hr2} />
        <Link style={{ fontSize: x >= 692 ? '25px' : '35px', color: "red", textDecoration: "none" }}>Payment <i className="fa-solid fa-circle-check"></i></Link>
      </div>
      <div style={{ minHeight: "500px", height: "auto", opacity: 0.9, paddingTop: '80px', display: 'flex', justifyContent: 'center' }}>
        <div style={styles.cardForm}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <div>
              <h1 style={{ marginTop: '20px', textAlign: 'center', fontSize: x >= 692 ? "45px" : '70px', }}>Card Info.</h1>
              <b><hr style={{ width: "200px", backgroundColor: "black", position: "relative", bottom: "14px" }} /></b>
            </div>
          </div>
          <form onSubmit={handlePayment}>
            <div style={{ justifyContent: "center", position: "relative", top: "40px" }}>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                placeholder="1234 1234 1234 1234"
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                name="expiry"
                value={cardDetails.expiry}
                placeholder="MM/YY"
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                name="cvc"
                value={cardDetails.cvc}
                placeholder="CVC"
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            {paymentError && <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{paymentError}</div>}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
              <button type="submit" className="btn btn-warning" disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Pay ₹${totalprice}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};



export default Payment;
