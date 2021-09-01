import React, { useState } from "react";
import Header from "../Header/NavBar";
import Footer from "../Footer";
import Dashboard from "../Dashboard";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    flexSidebarChildren:{
        display: "flex",
        flexDirection: "row",
    }
}));

const Layout = ({ children }) => {
    const classes = useStyles();
   const { token } = useSelector((state) => state.persistedStorage.currentUser);
    // const [tokenIsEmpty, setTokenIsEmpty] = useState(true);
    // if (Object.keys(token).length === 0 && token.constructor === 0) {
    //     setTokenIsEmpty(true);
    // } else {
    //     setTokenIsEmpty(false);
    // }
    return (
        <div className={classes.root}>
            {/* {!tokenIsEmpty ? (
                token.userInfo.role === "user" && <Header></Header>
            ) : (
                <Header></Header>
            )}
            {!tokenIsEmpty
                ? token.userInfo.role === "admin" && <Dashboard></Dashboard>
                : null}
            {children}
            {!tokenIsEmpty ? (
                token.userInfo.role === "user" && <Footer></Footer>
            ) : (
                <Footer></Footer>
            )} */}



            {/* <Header></Header> */}
            <div className={classes.flexSidebarChildren}>
                <Dashboard></Dashboard>
                <div>{children}</div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;
