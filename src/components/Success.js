import React from 'react';
import successful from "./1cbd3594bb5e8d90924a105d4aae924c.gif";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
const Success = () => {
  const [x, setx] = useState("");
useEffect(() => {
    if(localStorage.getItem("width") !== null){
        setx(localStorage.getItem("width"));
    }else{
        setx(window.innerWidth);
    }
  }, []);
  const styles = {
    container: {
      minHeight: x >= 1080 ? '1000px' : '3000px', // Adjusted height based on window width
      minWidth: x >= 1080 ? '1540px' : '1540px',
      height: "auto",
      width: "auto",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      textAlign: "center",
      position: "relative",
      minHeight :  x >= 1080 ? null : '1800px',
      height : x >= 1080 ? null : "auto",
    },
    hr2: {
      borderWidth: "2px",
      opacity: 0.6,
      width: "300px",
    },
    image : {
      paddingTop : x >= 1080 ? null : '100px',
      paddingBottom : x >= 1080 ? null : '100px',
      height : x >= 1080 ? null : '1200px',
      width : x >= 1080 ? null : '1200px',
    }
  };
  return (
    <div style={styles.container}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop : x >= 1080 ? '60px' : '200px', paddingBottom : x >= 1080 ? null : '150px' }}>
        <Link to="/mycart" style={{ fontSize: x >= 1080 ? '25px' : '35px', color: "green", textDecoration: "none" }}>Place Order <i className="fa-solid fa-cart-shopping"></i></Link>
        <hr style={styles.hr2} />
        <Link style={{ fontSize: x >= 1080 ? '25px' : '35px', color: "green", textDecoration: "none" }}>Confirm Order <i className="fa-solid fa-check"></i></Link>
        <hr style={styles.hr2} />
        <Link style={{ fontSize: x >= 1080 ? '25px' : '35px', color: "green", textDecoration: "none" }}>Payment <i className="fa-solid fa-circle-check"></i></Link>
      </div>
      <div style={styles.content}>
        <img src={successful} alt="Animated GIF" style={styles.image} />
        <h2 style={{ position: "relative", bottom: "130px", fontSize: x >= 1080 ? null : "75px"}}>Payment Successful!</h2>
        <Link style={{ position: "relative", bottom: "115px", fontSize: x >= 1080 ? '22px' : '70px', textDecoration: "none" }} to="/myorders">See Your Orders...</Link>
      </div>
    </div>
  );
};



export default Success;

