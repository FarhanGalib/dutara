import { actionTypes } from "../../actionTypes";

const initialState = {
    currentUser: {
        email:"",
        role:"",
        token:"",
    },
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TOKEN:
            return {currentUser:{ ...state.currentUser, email: action.payload.userInfo.user, role: action.payload.userInfo.role, token: action.payload.userInfo.token}};
        default:
            return state;
    }
};

export default authReducer;
