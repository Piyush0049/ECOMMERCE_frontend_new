import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { forgotuserpassword } from './actions/useractions';
const Forgotpassword = () => {
    const [x, setx] = useState("");
useEffect(() => {
    if(localStorage.getItem("width") !== null){
        setx(localStorage.getItem("width"));
    }else{
        setx(window.innerWidth);
    }
  }, []);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotuserpassword(email));
        setMessage(`Password reset link sent to ${email}`);

    };
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: x >= 1080 ? '1000px' : '3000px', 
            minWidth: x >= 1080 ? '1540px' : '1540px',
            height : "auto",
            width : "auto",
            flexDirection: 'column',
            backgroundColor : "#83DBFF",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}>
            <h2 style={{ marginBottom: '20px', fontSize: x >= 1080 ? '40px' : '100px', fontFamily : "sans-serif" }}><b>Forgot Your Password?</b></h2>
            <form onSubmit={handleSubmit} style={{ width: '400px', textAlign: 'center' }}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    style={{
                        width: '100%',
                        padding:  x >= 1080 ? '10px' : '30px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        textAlign : "center",
                        fontSize : x >= 1080 ? '18px' : '35px',
                    }}
                    required
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop : "10px",
                        fontSize : x >= 1080 ? '18px' : '35px',
                    }}
                >
                    Send Reset Link
                </button>
            </form>
            {message && <p style={{ marginTop: '20px', fontSize : "20px" }}><b>{message}</b></p>}
        </div>
    );
};

export default Forgotpassword;


