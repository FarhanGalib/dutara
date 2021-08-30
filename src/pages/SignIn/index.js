import { Container, Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import styles from "./index.module.css";

import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { requestSignIn } from "../../store/actions/tokenAction";

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor:"black",
        marginTop: 200,
    },
    formBackground: {
        // backgroundColor: "white",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",

        // border: "1px solid #129efe",
    },
    heading: {
        fontSize: 30,
        fontWeight: "500",
        color: "#129efe",
    },
    input: {
        display: "block",
        width: 200,
        outline: "none",
        borderRadius: 15,
        height: 30,
        paddingLeft: 8,
        paddingRight: 8,
        border: "none",
        backgroundColor: "lightgrey",
        marginBottom: 10,
    },

    btn: {
        border: "1px solid #129efe",
        backgroundColor: "white",
        color: "black",
        borderRadius: 50,
        height: 30,
        width: 100,
        "&:hover": {
            color: "white",
            backgroundColor: "#129efe",
        },
    },

    signup: {
        fontSize: 13,
    },
    signupLink: {
        cursor: "pointer",
    },
    notFound: {
        color: "red",
        fontSize: 13,
    },
}));

const SignIn = () => {
    const classes = useStyles();
    const [signInInfo, setSignInInfo] = useState({
        email: "",
        password: "",
    });
    const history = useHistory();
    const dispatch = useDispatch();

    const setValues = (key, e) => {
        setSignInInfo({ ...signInInfo, [key]: e.target.value });
    };
    console.log(signInInfo);
    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(requestSignIn(signInInfo));
        history.push("/home");
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item sm={12} className={classes.formBackground}>
                    <form onSubmit={handleSignIn}>
                        <div className={classes.form}>
                            <div>
                                <p className={classes.heading}>SIGN IN</p>
                            </div>
                            <input
                                type="email"
                                value={signInInfo.email}
                                onChange={(e) => setValues("email", e)}
                                className={classes.input}
                                placeholder="Email"
                                required
                            />

                            <input
                                type="password"
                                onChange={(e) => setValues("password", e)}
                                value={signInInfo.password}
                                className={classes.input}
                                placeholder="Password"
                                required
                            />
                            {false && (
                                <p className={classes.notFound}>
                                    User or password is incorrect!
                                </p>
                            )}

                            <input
                                type="submit"
                                className={classes.btn}
                                value="SIGN IN"
                            />

                            <p className={classes.signup}>
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className={classes.signupLink}
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </Grid>
              
            </Grid>
           
        </div>
    );
};

export default SignIn;
