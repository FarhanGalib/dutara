import { actionTypes } from "../../actionTypes";

const initialState = {
    token: {},
};
const authReducer = (state = initialState, action) => {
    


    switch (action.type) {
        case actionTypes.SET_TOKEN:
            return { ...state, token: action.payload };
        default:
            return state;
    }
};

export default authReducer;
