import axios from "axios";
import { actionTypes } from "../actionTypes";

export const setToken =(token) => {
    return ({
        type: actionTypes.SET_TOKEN,
        payload: token,
    });
};
export const requestSignIn=(signInInfo)=>{
    return async (dispatch) =>{
       const {data} = await axios.post('http://localhost:8080/signin',
            {
                email: signInInfo.email,
                  password: signInInfo.password,
            }
          );
          dispatch(setToken(data));
    }
}