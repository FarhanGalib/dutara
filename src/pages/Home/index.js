import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Container,
} from "@mui/material";

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./home.module.css";
import { useEffect } from "react";
import axios from "axios";
import Products from "../clint/Products";
import { useDispatch, useSelector } from "react-redux";
import {
    requestAddCartItem,
    requestAddCartItemSignin,
    setPersistedCart,
} from "../../store/actions/cartAction";
import { requestCategoryList } from "../../store/actions/categoryAction";
import { setSearchText } from "../../store/actions/searchAction";
import { useHistory } from "react-router";
import { setError } from "../../store/actions/tokenAction";

const useStyles = makeStyles((theme) => ({
    
}));

const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const [category, setCategory] = useState("All");
    const dispatch = useDispatch();
    const { productId } = useSelector((state) => state.PersistedCartStorage);
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const categoryList = useSelector(
        (state) => state.CategoryListForFilterReducer
    );
    const searchText = useSelector((state) => state.SearchText);
    const { error } = useSelector((state) => state.persistedStorage);

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    };

    useEffect(() => {
        dispatch(requestCategoryList());
    }, []);

    useEffect(() => {
        if (productId && token) {
            dispatch(requestAddCartItemSignin(productId, token));
        }
    }, [productId, token]);

    return (
        <Container maxWidth="lg">
            {/* PRODUCT LIST */}
            <Products></Products>
        </Container>
    );
};

export default Home;
