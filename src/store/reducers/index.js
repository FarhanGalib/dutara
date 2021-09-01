import { combineReducers } from "redux";
import addUserReducer from './AddUserReducer/addUserReducer';
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import authReducer from "./AuthReducer/authReducer";
import categoryReducer from './CategoryReducer/categoryReducer';
import EditCategoryReducer from './CategoryReducer/EditCategoryReducer';
import userListReducer from './UserReducer/userListReducer';
import EditUserReducer from './UserReducer/EditUserReducer';



const persistConfig = {
    key: 'dutara',
    storage: storage,
};

 const persistedStorage = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
    addUserReducer,
    categoryStore: categoryReducer,
    EditCategoryReducer,
    userListReducer,
    EditUserReducer,
    persistedStorage,
});

export default  rootReducer;