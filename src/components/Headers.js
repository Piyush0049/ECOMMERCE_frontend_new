import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import profilepic from "./snap--shop-high-resolution-logo.png";
import { deleteuser, userlogout } from './actions/useractions';

function Headers() {
  const [x, setx] = useState(window.innerWidth);
  const location = useLocation();
  const dispatch = useDispatch();
  const { cartitems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.userdetails);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("width") !== null) {
      setx(localStorage.getItem("width"));
    } else {
      setx(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    console.log(location)
  }, [location]);

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.setItem("cartitem", "");
      localStorage.setItem("shippingdetails", null);
      localStorage.removeItem('width');
      dispatch(userlogout());
    }
  }

  const deleteaccount = () => {
    if (window.confirm("Are you sure you want to DELETE your Account?")) {
      localStorage.removeItem('width');
      dispatch(deleteuser());
    }
  }

  const a = x >= 1080 ? "0" : '2';

  const headerStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 999,
    backgroundColor: 'black',
    opacity: 0.7,
    color: '#ffffff',
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={headerStyle}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" style={{ fontSize: x >= 1080 ? "20px" : '60px' }}>Snap & Shop</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ fontSize: x >= 1080 ? '30px' : '60px', padding: x >= 1080 ? '5px 10px' : '10px 20px' }}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/Home" className="nav-link" aria-current="page" style={{ fontSize: x >= 1080 ? "15px" : '45px' }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link" style={{ fontSize: x >= 1080 ? "15px" : '45px' }}>Products</Link>
              </li>
              <li className="nav-item">
                <Link to="/myorders" className="nav-link" style={{ fontSize: x >= 1080 ? "15px" : '45px' }}>My Orders</Link>
              </li>
              <li className="nav-item">
                <Link to="/search" className="nav-link" style={{ fontSize: x >= 1080 ? "15px" : '45px' }}>Search<i className="fa-solid fa-magnifying-glass" style={{ fontSize: x >= 1080 ? "17px" : '45px' }}></i></Link>
              </li>
              <li className="nav-item">
                <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: x >= 1080 ? "15px" : '45px' }}>
                  Your Account<i className="fa-solid fa-user" style={{ fontSize: x >= 1080 ? "15px" : '45px' }}></i>
                </div>
                <ul className="dropdown-menu" style={{ fontSize: x >= 1080 ? "15px" : '45px', position: 'absolute', top: '100%', left: x >= 1080 ? "32%" : "190px", transform: 'translateX(-50%)' }}>
                  {isAuthenticated && user.work === "admin" &&
                    (<li><Link to="/dashboard" className="dropdown-item"><b>Dashboard</b></Link></li>)
                  }
                  {!isAuthenticated ?
                    (<li><Link to="/login" className="dropdown-item">Log In</Link></li>)
                    :
                    (null)
                  }
                  <li><Link to="/account" className="dropdown-item">My Account</Link></li>
                  {isAuthenticated &&
                    (<>
                      <li><button className="dropdown-item" onClick={() => logout()}>Log Out</button></li>
                      <li><button className="dropdown-item" onClick={() => deleteaccount()}>Delete Account</button></li>
                    </>)
                  }
                </ul>
              </li>
              <li className="nav-item">
                {isAuthenticated && (
                  <li className="nav-item" >
                    <Link to="/mycart" className="nav-link" style={{ fontSize: x >= 1080 ? "15px" : '45px' }}>My Cart<i className="fa-solid fa-cart-shopping" style={{ fontSize: x >= 1080 ? "20px" : '45px', marginTop: "3px" }}></i>
                      <span className={`position-absolute top-${a} start-45 translate-middle badge rounded-pill bg-danger`} style={{ width: x >= 1080 ? "17px" : '30px', height: x >= 1080 ? "17px" : '30px', fontSize: x >= 1080 ? "10px" : '25px', textAlign: "center", marginTop: x >= 1080 ? "18px" : null, marginBottom: x >= 1080 ? null : "25px", marginLeft: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {cartitems !== null && (
                          cartitems.length > 0 && (
                            cartitems.length
                          ))}
                      </span>
                    </Link>
                  </li>
                )}
              </li>
              <li className="nav-item">
                {isAuthenticated && (
                  <>
                    <img onMouseEnter={() => setShowMessage(true)} onMouseLeave={() => setShowMessage(false)} src={profilepic} alt="Uploaded" style={{ width: x >= 1080 ? "40px" : "75px", height: x >= 1080 ? "40px" : "75px", borderRadius: "100%", marginLeft: x >= 1080 ? "10px" : null }} />
                    {showMessage && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: "50%",
                          transform: 'translateX(-50%)',
                          backgroundColor: '#333',
                          color: '#fff',
                          padding: '10px 20px',
                          whiteSpace: "nowrap",
                          borderRadius: '5px',
                          fontSize: x >= 1080 ? "13px" : "30px",
                          zIndex: '999',
                        }}
                      >
                        Welcome, {user.username}. You are currently logged in.
                      </div>
                    )}
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Headers;
