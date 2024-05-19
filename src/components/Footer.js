import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function Footer() {
  const [x, setx] = useState("");
  const location = useLocation();

  useEffect(() => {
    console.log(location)
  }, [location]);


   useEffect(() => {
    if(localStorage.getItem("width") !== null){
        setx(localStorage.getItem("width"));
    }else{
        setx(window.innerWidth);
    }
  }, []);

  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    bottom: 0,
    minHeight: x >= 1080 ? '250px' : '400px',
    height: 'auto',
    minWidth: x >= 1080 ? '1540px' : '1540px',
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  };

  const headingStyle = {
    fontSize: x >= 1080 ? '15px' : '40px',
  };

  const paragraphStyle = {
    width: x >= 1080 ? '220px' : '320px',
    fontSize: x >= 1080 ? '15px' : '27px',
  };

  const hrStyle = {
    margin: '20px 0',
  };

  const copyrightContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div>
      <footer style={footerStyle}>
        <div style={containerStyle}>
          <div style={{ marginRight: '90px' }}>
            <h3 style={headingStyle}>About Us</h3>
            <p style={paragraphStyle}>
              "Snap & Shop" revolutionizes online shopping by integrating cutting-edge image recognition technology.
            </p>
          </div>
          <div style={{ marginRight: '160px' }}>
            <h3 style={headingStyle}>Contact Us</h3>
            <p style={paragraphStyle}>Email: S&S@gmail.com</p>
            <p style={paragraphStyle}>Phone: +94857XXXXX</p>
          </div>
          <div>
            <h3 style={headingStyle}>Follow Us</h3>
            <Link to="/" className="nav-link active mt-2" aria-current="page" style={paragraphStyle}>
              Facebook
            </Link>
            <Link to="/" className="nav-link active mt-2" aria-current="page" style={paragraphStyle}>
              Twitter
            </Link>
            <Link to="/" className="nav-link active mt-2" aria-current="page" style={paragraphStyle}>
              Instagram
            </Link>
          </div>
        </div>
        <hr style={hrStyle} />
        <div style={copyrightContainerStyle}>
          <p style={paragraphStyle}>&copy; 2024 Snap & Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
