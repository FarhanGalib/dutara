import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { requestAddNewUser } from "../../store/actions/userAction";

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
    passwordNotMatched: {
        color: "red",
        fontSize: 13,
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const [signUpInfo, setSignUpInfo] = useState({
        email: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        city: "",
        street: "",
        number: "",
        zipcode: "",
        lat: "",
        long: "",
        phone: "",
    });
    
    const [confirmPass, setConfirmPass] = useState("");
    const [isPassMatched, setIsPassMatched] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();
    // const [email, setEmail] = useState("");
    // const [pass, setPass] = useState("");

    const setRegValue = (key, e) => {
        setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    };
    // console.log(signUpInfo);
    const handleSignUp = (e) => {
        e.preventDefault();
        if (signUpInfo.password === confirmPass) {
            setIsPassMatched(true);
            dispatch(requestAddNewUser(signUpInfo));
            history.push("/signin");
        } else {
            setIsPassMatched(false);
        }
    };
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item sm={12} className={classes.formBackground}>
                    <form onSubmit={handleSignUp}>
                        <div className={classes.form}>
                            <div>
                                <p className={classes.heading}>SIGN UP</p>
                            </div>
                            <input
                                type="email"
                                value={signUpInfo.email}
                                onChange={(e) => setRegValue("email", e)}
                                className={classes.input}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="text"
                                value={signUpInfo.username}
                                onChange={(e) => setRegValue("username", e)}
                                className={classes.input}
                                placeholder="Username"
                                required
                            />
                            <input
                                type="text"
                                value={signUpInfo.city}
                                onChange={(e) => setRegValue("city", e)}
                                className={classes.input}
                                placeholder="City"
                                required
                            />

                            <input
                                type="password"
                                value={signUpInfo.password}
                                onChange={(e) => setRegValue("password", e)}
                                className={classes.input}
                                placeholder="Password [8-20 characters]"
                                required
                            />
                            <input
                                type="password"
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                className={classes.input}
                                placeholder="Confirm Password"
                                required
                            />
                            {!isPassMatched && (
                                <p className={classes.passwordNotMatched}>
                                    Password not matched!
                                </p>
                            )}

                            <input
                                type="submit"
                                className={classes.btn}
                                value="SIGN UP"
                            />

                            <p className={classes.signup}>
                                Already have an account?{" "}
                                <Link
                                    to="/signin"
                                    className={classes.signinLink}
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default SignUp;
