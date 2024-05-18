import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
const Myorders = () => {
    const [x, setx] = useState("");
    useEffect(() => {
        if (localStorage.getItem("width") !== null) {
            setx(localStorage.getItem("width"));
        } else {
            setx(window.innerWidth);
        }
    }, []);
    const { orderdet } = useSelector((state) => state.myorders);
    const { user } = useSelector((state) => state.userdetails);
    const userid = user._id;
    var filteredOrders = [];
    if (orderdet[0] !== null) {
        filteredOrders = orderdet.filter((order) => (order.user === userid));
    }

    const styles = {
        title: {
            textAlign: 'center',
            marginBottom: '20px',
        },
        ordersContainer: {
            display: 'grid',
            gridGap: '20px',
            position: "relative",
            top: "50px",
            zIndex: 3,
        },
        orderCard: {
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
        },
        hr2: {
            borderWidth: "2px",
            opacity: 0.6,
            width: "300px",
        },
        container: {
            fontFamily: 'Arial, sans-serif',
            minWidth: '1360px',
            margin: '0 auto',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            position: "relative",
            top: "10px",
            minHeight: "1100px",
            width: "auto",
            height: "auto"
        },
        header: {
            textAlign: 'center',
            marginBottom: '40px',
            marginTop: "20px",
            fontSize: x >= 692 ? null : '60px',
        },
        productList: {
            listStyleType: 'none',
            padding: 0,
            margin: 0,
        },
        grandTotalContainer: {
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            width: "300px",
            fontSize: x >= 692 ? null : '25px',
        },
        grandTotalContainer3: {
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            width: "300px",
            position: "relative",
            left: "750px"
        },
        grandTotalContainer2: {
            marginTop: '18px',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            width: "300px",
            fontSize: x >= 692 ? null : '25px',
        },
        checkoutButton: {
            marginTop: '80px',
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            display: 'block',
            margin: '0 auto',
        },
        image: {
            width: x >= 692 ? "100px" : '150px',
            height: x >= 692 ? "100px" : '150px',
            borderRadius: '10px',
            marginRight: '20px',
        },
        details: {
            flex: '1',
        },
        product: {
            marginBottom: '30px',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '5px 7px 14px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
        },
        noOrderMessage: {
            textAlign: 'center',
            fontSize: x >= 692 ? '50px' : '100px',
            color: '#666',
            minHeight: x >= 692 ? '1600px' : '3000px', // Adjusted height based on window width
            minWidth: x >= 692 ? '1540px' : "1540px",
            height: "auto",
            width: "auto",
            backgroundColor: "#A0E1FC",
        },
        textMessage: {
            position: "relative",
            top: "300px"
        }
    };
    return (<>
        <div>
            {filteredOrders.length !== 0 && orderdet[0] !== null ? filteredOrders.map((order) => (
                <div key={order._id} style={{ position: 'relative', minHeight: '1450px' }}>
                    <div style={{
                        minHeight: x >= 692 ? '1600px' : '3000px', // Adjusted height based on window width
                        minWidth: x >= 692 ? '1540px' : '1540px',
                        height: "auto",
                        width: "auto",
                        backgroundColor: "#A7F7FE",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0,
                    }}>
                        <div style={styles.ordersContainer}>
                            <div style={styles.container}>
                                <h1 style={styles.header}><b>My Order Summary : </b></h1>
                                <div style={styles.grandTotalContainer3}>
                                    <div style={{ fontSize: x >= 692 ? "20px" : '37px', whiteSpace: 'nowrap' }}>
                                        Placed On: {order.createdAt.toString().slice(0, 10)}
                                    </div>

                                </div>
                                <ul style={styles.productList}>
                                    {order.orderitems.map((p) => (
                                        <div key={p._id} style={styles.product}>
                                            <img style={styles.image} src={p.image} alt={p.name} />
                                            <div style={styles.details}>
                                                <h3 style={{ marginBottom: '10px', fontSize: x >= 692 ? "20px" : '50px', fontWeight: 'bold' }}>{p.name}</h3>
                                                <p style={{ marginBottom: '5px', color: '#666', fontSize: x >= 692 ? "20px" : '45px', }}>Price: ₹{p.price}</p>
                                                <p style={{ marginBottom: '5px', color: '#666', fontSize: x >= 692 ? "20px" : '45px', }}>Quantity: {p.quantity}</p>
                                                <p style={{ marginBottom: '5px', color: '#666', fontSize: x >= 692 ? "20px" : '45px', }}>Total: ₹{p.price * p.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </ul>

                                <div style={{ display: "flex" }}>
                                    <div style={{ marginLeft: "70px" }}>
                                        <h2 style={{ marginBottom: "40px", fontSize: x >= 692 ? null : '50px', }}><b>Shipping Address : </b></h2>
                                        <div style={styles.grandTotalContainer2}>
                                            <div>Address :</div>
                                            <div>{order.shippinginfo.address}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer2}>
                                            <div>Country :</div>
                                            <div>{order.shippinginfo.country}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer2}>
                                            <div>State :</div>
                                            <div>{order.shippinginfo.state}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer2}>
                                            <div>City :</div>
                                            <div>{order.shippinginfo.city}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer2}>
                                            <div><b>Order Status :</b></div>
                                            <div><b>{order.orderStatus}</b></div>
                                        </div>
                                    </div>

                                    <div style={{ marginLeft: "450px" }}>
                                        <h2 style={{ marginBottom: "40px", fontSize: x >= 692 ? null : '50px', }}><b>Invoice Details : </b></h2>
                                        <div style={styles.grandTotalContainer}>
                                            <div>Sub Total:</div>
                                            <div>₹{order.itemsPrice}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer}>
                                            <div>GST (18%):</div>
                                            <div>₹{order.taxPrice}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer}>
                                            <div>Shipping Charges:</div>
                                            <div>₹{order.shippingPrice}</div>
                                        </div>
                                        <hr style={{ marginTop: '30px', borderWidth: "3px", borderColor: "black" }} />
                                        <div style={styles.grandTotalContainer}>
                                            <div style={{ fontSize: x >= 692 ? null : '35px' }}><b>Grand Total:</b></div>
                                            <div style={{ fontSize: x >= 692 ? null : '35px' }}><b>₹{order.totalPrice}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )) : <div style={styles.noOrderMessage}><h1 style={styles.textMessage}><b>No orders to display!</b></h1></div>}
        </div>



    </>
    );
};

export default Myorders;
