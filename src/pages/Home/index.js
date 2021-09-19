import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Container
} from "@mui/material";

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./home.module.css";
import { useEffect } from "react";
import axios from "axios";
import Products from "../clint/Products";
import { useDispatch, useSelector } from 'react-redux';
import { requestAddCartItem, requestAddCartItemSignin, setPersistedCart } from "../../store/actions/cartAction";
import { requestCategoryList } from "../../store/actions/categoryAction";
import { setSearchText } from "../../store/actions/searchAction";
import { useHistory } from "react-router";
import { setError } from "../../store/actions/tokenAction";


const useStyles = makeStyles((theme) => ({
    searchBox: {
         display: "flex",

         backgroundColor: "white",
         height: 40,
         borderRadius: 5,
         padding: 10,
         //maxWidth: 200,
         border: "1px solid lightgray",
         boxShadow: "1px 1px 1px 1px lightgray",
         alignItems: "center",
         justifyContent: "space-between"
    },
    searchTxt: {
         backgroundColor: "white",
         border: "none",
         background: "none",
         outline: "none",
         color: "black",
         float: "left",
        //  lineHeight: 5,
         width: 340,
         paddingLeft: 5,
    },
    searchBtn: {
        // color: "red",
        //  float: "right",
         height: 20,
        // width: 80,
        // borderRadius: 40,
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // "&:hover": {
        //     color: "orange",
        //     cursor: "pointer",
        // },
    },
}));



const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const [category, setCategory] = useState("All");
    const dispatch = useDispatch();
    const {productId} = useSelector(
        (state) => state.PersistedCartStorage
    );
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const categoryList = useSelector((state) => state.CategoryListForFilterReducer);
    const searchText = useSelector((state) => state.SearchText);
    const { error } = useSelector((state) => state.persistedStorage);


    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    };
   

    useEffect(()=>{
        dispatch(requestCategoryList());
        
    },[]);

    useEffect(()=>{
        if(productId && token ){
            dispatch(requestAddCartItemSignin(productId,token));
        }
    },[productId,token]);

    return (
      
            <Container maxWidth="lg">
                {/* <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classes.title}
                >
                    Product-List
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        

                        <TextField
                                select
                                size= "small"
                                label="filter by category"
                                sx={{backgroundColor:"white", }}
                                value={categoryList?.name}
                                className={classes.sortByCategory}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                                variant="outlined"
                                fullWidth
                                SelectProps={{
                                    native: true,
                                }}
                                // helperText="filter product by category"
                            >
                                {categories?.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </TextField>

                    </Grid>

                    <Grid item xs={12} sm={6}>
                        
                        <div >
                            <TextField
                                value={searchText}
                                size= "small"
                                //className={classes.searchTxt}
                                sx={{backgroundColor:"white", }}
                                fullWidth
                                type="text"
                                label="Search products"
                                placeholder="Search..."
                                onChange={(e)=>dispatch(setSearchText(e.target.value))}
                            />
                            
                        </div>
                    </Grid>
                </Grid>
                <br /><br /><br /> */}
                {/* PRODUCT LIST */}
                <Products></Products>
            </Container>
       
    );
};

export default Home;
