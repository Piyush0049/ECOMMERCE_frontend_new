import axios from "axios";
import { USER_ORDER_REQUEST, USER_ORDER_SUCCESS, USER_ORDER_FAIL, USER_ORDERSTAT_REQUEST, USER_ORDERSTAT_SUCCESS, USER_ORDERSTAT_FAIL, ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS  } from "../constants/orderconstants";
export const createorder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_ORDER_REQUEST })
        const config = {
            "Content-Type": "application/json"
        }
        const { data } = await axios.post("https://snap-n-shop-fullmernstack-ecommerce.onrender.com/api/v1/order/create", order, config, { withCredentials: true})
        dispatch({
            type: USER_ORDER_SUCCESS,
            payload: data
        })
        const state = getState();
        localStorage.setItem("myorder", JSON.stringify(state.myorders.orderdet));
    } catch (error) {
        dispatch({
            type: USER_ORDER_FAIL,
            payload: error.response.data.message
        });
    }
}


export const updatestatus = (orderid, orderStatus) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_ORDERSTAT_REQUEST });
        const config = {
            "Content-Type": "application/json"
        }
        const { data } = await axios.put(`https://snap-n-shop-fullmernstack-ecommerce.onrender.com/api/v1/updateorder/${orderid}`, {orderStatus} , config, { withCredentials: true});
        console.log(data)
        dispatch({
            type: USER_ORDERSTAT_SUCCESS,
            payload: data
        })
        const state = getState();
        localStorage.setItem("myorder", JSON.stringify(state.myorders.orderdet));
    }
    catch (error) {
        dispatch({
            type: USER_ORDERSTAT_FAIL,
            payload: error.response.data.message
        });
        console.log(error)
    }
}


export const getallorders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST })
        const { data } = await axios.get("https://snap-n-shop-fullmernstack-ecommerce.onrender.com/api/v1/allorders", { withCredentials: true})
        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })
        const state = getState();       
      localStorage.setItem("Allorders", JSON.stringify(state.allorders.orderdets));
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        });
    }
}