import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
import { Container } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./home.module.css";
import { useEffect } from "react";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
    searchBox: {
        display: "flex",

        backgroundColor: "white",
        height: 20,
        borderRadius: 40,
        padding: 10,
        maxWidth: 200,
        border: "1px solid red",
    },
    searchTxt: {
        backgroundColor: "white",
        border: "none",
        background: "none",
        outline: "none",
        color: "black",
        float: "left",
        lineHeight: 20,
        width: 240,
        paddingLeft: 5,
    },
    searchBtn: {
        color: "red",
        float: "right",
        height: 20,
        width: 80,
        borderRadius: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
            color: "orange",
            cursor: "pointer",
        },
    },
}));
const Home = () => {
    const classes = useStyles();
    const [category, setCategory] = useState("All");
    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    };

    useEffect(()=>{
        
    },[]);
    return (
        <div>
            <Container>
                <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classes.title}
                >
                    Product-List
                </Typography>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        {/* CATEGORY */}

                        {/* <TextField
                                select
                                
                                value={productCategory}
                               / className={classes.sortByCategory}
                                onChange={(e) =>
                                    setProductCategory(e.target.value)
                                }
                                variant="filled"
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="filter product by category"
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </TextField> */}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* SEARCH BAR */}
                        <div className={classes.searchBox}>
                            <input
                                className={classes.searchTxt}
                                type="text"
                                placeholder="Search..."
                            />
                            <div className={classes.searchBtn}>
                                <SearchIcon />
                            </div>
                        </div>
                    </Grid>
                </Grid>
                {/* PRODUCT LIST */}
                
            </Container>
        </div>
    );
};

export default Home;
