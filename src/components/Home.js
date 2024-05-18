import React, { useEffect } from 'react';
import backgroundImage from './background-5.jpeg';
import ProductItem from './ProductItem';
import { allproducts } from './actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
function Home() {
    const [x, setx] = useState("");
useEffect(() => {
    if(localStorage.getItem("width") !== null){
        setx(localStorage.getItem("width"));
    }else{
        setx(window.innerWidth);
    }
  }, []);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allproducts())
    }, [dispatch]);
    

    const { products } = useSelector((state) => state.products)
    const containerStyle1 = {
        minHeight: x >= 692 ? '800px' : '1600px', // Adjusted height based on window width
        maxWidth: x >= 692 ? '1540px' : x,
        height : "auto",
        width : "auto",
        overflowX: 'hidden', // Prevent horizontal overflow
        zIndex: -1, // Ensure the image is behind other content
        position: 'relative', // Add position relative for positioning children
        backgroundColor: "#7CE2F0"
    };

    const containerStyle2 = {
        minHeight: x >= 692 ? '800px' : '1500px', // Adjusted height based on window width
        maxWidth: x >= 692 ? '1540px' : x,
        height : "auto",
        width : "auto",
        overflowX: 'hidden', // Prevent horizontal overflow
        zIndex: 2, // Ensure the image is behind other content
        position: 'relative', // Add position relative for positioning children
        backgroundColor: "#87E6F9"
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover', // Ensure the image covers the entire container
        opacity: 0.4, // Set the opacity to darken the image
        backgroundColor: 'black', // Set the background color to blackish
        clipPath: 'polygon(70% 0, 100% 65%, 30% 100%, 0 38%)'
        // Apply the clip path to trim the bottom part
    };


    const textStyle = {
        zIndex: 2, // Ensure the text appears above the image
        color: 'white', // Set the text color to white
        position: 'absolute', // Position the text absolutely within the container
        top: '30%', // Align the text vertically centered
        left: '50%', // Align the text horizontally centered
        transform: 'translate(-50%, -50%)', // Center the text horizontally and vertically
    };

    const productsContainerStyle = {
        display: 'flex', // Use flexbox for horizontal alignment
        flexWrap: 'wrap', // Allow items to wrap to the next line
        justifyContent: 'center', // Center items horizontally
        alignItems: 'center', // Center items vertically
        position: 'relative', // Position the container relatively
        width: '90%', // Set the width to 90% of the container
        margin: 'auto', // Center the container horizontally,
        marginTop: "120px",
        marginRight: "120px"
    };

    return (
        <>
            <div style={containerStyle1}>
                <img src={backgroundImage} alt="Background" style={imageStyle} />
                <div style={textStyle}>
                    <h1 style={{
                        fontFamily: "fantasy",
                        fontSize: x >= 692 ? '50px' : '130px',
                        marginLeft: x >= 692 ? '70px' : '00px',
                        whiteSpace: 'nowrap' // Ensure text stays on one line
                    }}>
                        WELCOME TO SNAP & SHOP
                    </h1>
                    <h1 style={{
                        fontFamily: "fantasy",
                        fontSize: x >= 692 ? '35px' : '80px',
                        marginLeft: x >= 692 ? '180px' : '290px',
                        marginTop: "30px",
                        whiteSpace: 'nowrap' // Ensure text stays on one line
                    }}>
                        ORDER WITH A "SNAP"
                    </h1>

                </div>
            </div>
            <div style={containerStyle2}>
                <h3 style={{ fontFamily: "revert", position: "absolute", left: '50%', transform: 'translateX(-50%)', color: "black", textAlign: "center", fontSize:x >= 692 ? '50px' : '100px', marginTop: x >= 692 ? '80px' : '40px', whiteSpace: 'nowrap'}}>Featured Products : </h3>
                <hr style={{ position: "relative", top: "140px", borderWidth: "2px", opacity: 0.9, marginLeft: "300px", marginRight: "300px" }} />
                <div style={productsContainerStyle}>
                    {products.map(product => (
                        <ProductItem product={product} />
                    ))}

                </div>
            </div>
        </>
    );
}

export default Home;