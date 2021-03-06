import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { actionTypes } from "../actionTypes";
import { setLoader } from "./loaderAction";

export const setCurrentProduct = (currentProduct) => {
    return {
        type: actionTypes.SET_SINGLE_PRODUCT_FOR_PRODUCT_DETAILS_PAGE,
        payload: currentProduct,
    };
};
export const requestSingleProduct = (id, token) => {
    return async (dispatch) => {
        dispatch(setLoader(true));

        const {data}  = await axios.get(
            `${BASE_URL}/products/${id}`,
            {
                headers: {
                    authorization: `bearer ${token}`,
                },
            }
        );
        dispatch(setCurrentProduct(data));
        dispatch(setLoader(false));

    };
};