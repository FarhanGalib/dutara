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

import { useEffect } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
    requestAddCartItem,
    requestAddCartItemSignin,
    setPersistedCart,
} from "../../../store/actions/cartAction";
import { requestCategoryList } from "../../../store/actions/categoryAction";
import { setSearchText } from "../../../store/actions/searchAction";
import { useHistory } from "react-router";
import { setError } from "../../../store/actions/tokenAction";
import { requestProductList } from "../../../store/actions/productAction";
import Products from '../Products';

const useStyles = makeStyles((theme) => ({}));
const BaseURL = "http://localhost:8080/files/";
const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const [category, setCategory] = useState("All");
    const dispatch = useDispatch();
    const { productId } = useSelector((state) => state.PersistedCartStorage);
    const { token, role } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    //const { productList } = useSelector((state) => state);
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
        //dispatch(requestProductList(token));
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
