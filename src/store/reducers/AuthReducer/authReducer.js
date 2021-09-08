import { actionTypes } from "../../actionTypes";

const initialState = {
    currentUser: {
        email: "",
        role: "",
        token: "",
    },
    error: null,
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TOKEN:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    email: action.payload.userInfo.user,
                    role: action.payload.userInfo.role,
                    token: action.payload.userInfo.token,
                },
            };
        case actionTypes.SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default authReducer;
