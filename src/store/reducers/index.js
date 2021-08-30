import { combineReducers } from "redux";
import addUserReducer from './AddUserReducer/addUserReducer';
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import authReducer from "./AuthReducer/authReducer";


const persistConfig = {
    key: 'dutara',
    storage: storage,
};

 const persistedStorage = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
    addUserReducer,
    persistedStorage
});

export default  rootReducer;