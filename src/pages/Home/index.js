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
import { requestProductList } from "../../store/actions/productAction";

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
            {/* {role!=="admin" && <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-ride="carousel"
            >
                <ol class="carousel-indicators">
                    <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="0"
                        class="active"
                    ></li>
                    <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="1"
                    ></li>
                    <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="2"
                    ></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img
                            class="d-block w-100"
                            src={BaseURL+}
                            alt="First slide"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            class="d-block w-100"
                            src="..."
                            alt="Second slide"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            class="d-block w-100"
                            src="..."
                            alt="Third slide"
                        />
                    </div>
                </div>
                <a
                    class="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                >
                    <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a
                    class="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                >
                    <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>} */}
            {/* PRODUCT LIST */}
            <Products></Products>
        </Container>
    );
};

export default Home;
