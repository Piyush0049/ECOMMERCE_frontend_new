import React, { useState, useEffect } from 'react';
import backimage from './snapedit_1709804086088.jpeg';
import { useNavigate } from 'react-router-dom';
const SearchBar = () => {
    const [x, setx] = useState("");
useEffect(() => {
    if(localStorage.getItem("width") !== null){
        setx(localStorage.getItem("width"));
    }else{
        setx(window.innerWidth);
    }
  }, []);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const handleSearchInputChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };

    const [hoveri, setHoveri] = useState(false);

    const ButtonHoverStyle = {
        backgroundColor: '#7ED5F9',
        color: 'black',
    };
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Adjust to column layout
            maxWidth: x >= 1080 ? '500px' : "250px",
            margin: 'auto',
            position: 'relative',
            top: x >= 1080 ? '350px' : '500px',
            right : x >= 1080 ? null : '170px',
        },
        
        input: {
            flex: '1',
            padding: x >= 1080 ? '12px' : '40px',
            fontSize: x >= 1080 ? '18px' : '50px',
            border: '2px solid #ccc',
            borderRadius: x >= 1080 ? '20px' : '40px',
            outline: 'none',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        button: {
            padding: x >= 1080 ? '12px' : '40px',
            fontSize: x >= 1080 ? '18px' : '50px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: x >= 1080 ? '20px' : '40px',
            cursor: 'pointer',
            outline: 'none',
            transition: 'background-color 0.3s',
        },
    };
    return (
        <div style={{ backgroundImage: `url(${backimage})`, backgroundSize: 'cover', minHeight: x >= 1080 ? '1200px' : '3000px', height : "auto",
        width : "auto",// Adjusted height based on window width
        minWidth: x >= 1080 ? '1540px' : '1540px', }}>
            <div style={styles.container}>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleSearchInputChange}
                    placeholder="Search..."
                    style={styles.input}
                />
                <button
                    onClick={handleSearch}
                    style={{ ...styles.button, ...(hoveri ? ButtonHoverStyle : null) }}
                    onMouseEnter={() => setHoveri(true)}
                    onMouseLeave={() => setHoveri(false)}
                >
                    Search
                </button>
            </div>
        </div>
    );
};



export default SearchBar;
