import axios from "axios";
import { actionTypes } from "../actionTypes";

export const setPersistedCart = (productId) => {
    return {
        type: actionTypes.SET_PERSISTED_CART,
        payload: productId,
    };
};






export const setCartList = (cartList) => {
    return {
        type: actionTypes.SET_CART_LIST,
        payload: cartList,
    };
};
export const requestCartList = (token) => {
    return async (dispatch) => {
        const { data } = await axios.get("http://localhost:8080/cart", {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        dispatch(setCartList(data));
    };
};


export const requestAddCartItem = (productId, token) => {
    return async (dispatch) => {
        const { data } = await axios.post("http://localhost:8080/cart",{
            product:{
                id: productId,
                quantity : 1
            }
        } ,
        {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        console.log(data);
    };
};



export const setCartProductQuantity=(type, itemId, productId, quantity, token)=>{
   
    return async (dispatch) => {
        const {data} = await axios.post("http://localhost:8080/cart",{
            product:{
                id: productId,
                quantity : type==="increment"? quantity+1: quantity>1?quantity-1:1,
            },
        },
        {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
      
    }
}







export const requestCheckOut = (token) => {
    return async (dispatch) => {
        const { data } = await axios.get("http://localhost:8080/order/checkout", {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        console.log(data);
    };
};



