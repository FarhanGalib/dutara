import axios from "axios";
import { actionTypes } from "../actionTypes";

export const setCurrentProduct = (currentProduct) => {
    return {
        type: actionTypes.SET_SINGLE_PRODUCT_FOR_PRODUCT_DETAILS_PAGE,
        payload: currentProduct,
    };
};
export const requestSingleProduct = (id, token) => {
    console.log("++++++++++++++++++++++++++++++++++++++++++++");
    return async (dispatch) => {
        const {data}  = await axios.get(
            "http://localhost:8080/products/"+id,
            {
                headers: {
                    authorization: `bearer ${token}`,
                },
            }
        );
        dispatch(setCurrentProduct(data));
        console.log("********************",data);
    };
};