import axios from "axios";
import { actionTypes } from "../actionTypes";

export const requestAddNewCategory = (newCategory, token) => {
    return async (dispatch) => {
        const category =await axios.post(
            "http://localhost:8080/category",

            {
                name: newCategory.name,
                description: newCategory.description,
            },
            {
                headers: {
                    authorization: `bearer ${token}`,
                },
            }
        );
    };
};

export const setCategoryList = (categoryList) => {
    return {
        type: actionTypes.SET_CATEGORY_LIST,
        payload: categoryList,
    };
};

export const requestCategoryList = () => {
    return async (dispatch) => {
        const { data } = await axios.get("http://localhost:8080/category");
        dispatch(setCategoryList(data));
    };
};

export const requestDeleteCategory = (id, token) => {
    return async (dispatch) => {
       await axios.delete(`http://localhost:8080/category/${id}`, {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
    };
};

export const requestUpdateCategory = (id, category, token) => {
    return async (dispatch) => {
        await axios.patch(`http://localhost:8080/category/${id}`, category, {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
    };
};




export const setSingleCategoryForEdit = (singleCategory) => {
    return {
        type: actionTypes.SET_SINGLE_CATEGORY_FOR_EDIT,
        payload: singleCategory
    }
}
export const requestSingleCategory = (id, token) => {
    return async (dispatch) => {
        const {data} = await axios.get(`http://localhost:8080/category/${id}`, {
            headers: {
                authorization: `bearer ${token}`,
            },
        })
        dispatch(setSingleCategoryForEdit(data));
      
    };
};
