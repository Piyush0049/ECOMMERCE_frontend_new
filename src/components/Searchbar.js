import React, { useState } from 'react';
import backimage from './snapedit_1709804086088.jpeg';
import { useNavigate } from 'react-router-dom';
const SearchBar = () => {
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
    return (
        <div style={{ backgroundImage: `url(${backimage})`, backgroundSize: 'cover', minHeight: window.innerWidth >= 692 ? '1200px' : '3000px', height : "auto",
        width : "auto",// Adjusted height based on window width
        minWidth: window.innerWidth >= 692 ? '1540px' : '1540px', }}>
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

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: window.innerWidth >= 692 ? '500px' : "250px",
        margin: 'auto',
        position: 'relative',
        top: window.innerWidth >= 692 ? '350px' : '500px',
        right : window.innerWidth >= 692 ? null : '170px',
    },
    input: {
        flex: '1',
        padding: window.innerWidth >= 692 ? '12px' : '40px',
        fontSize: window.innerWidth >= 692 ? '18px' : '50px',
        border: '2px solid #ccc',
        borderRadius: window.innerWidth >= 692 ? '20px' : '40px',
        outline: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    button: {
        padding: window.innerWidth >= 692 ? '12px' : '40px',
        fontSize: window.innerWidth >= 692 ? '18px' : '50px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: window.innerWidth >= 692 ? '20px' : '40px',
        cursor: 'pointer',
        outline: 'none',
        transition: 'background-color 0.3s',
    },
};

export default SearchBar;
