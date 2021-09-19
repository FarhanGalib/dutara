import React, { useState } from "react";
import Header from "../Header/NavBar";
import Footer from "../Footer";
import Dashboard from "../Dashboard";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    flexSidebarChildren: {
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
    },
    children: {
        flexGrow: 1,
         backgroundColor: "#f5f5f5f5"
    },
}));

const Layout = ({ children }) => {
    const classes = useStyles();
    const { token, role } = useSelector(
        (state) => state.persistedStorage.currentUser
    );

    return (
        <div className={classes.root}>
            {(role === "" || role === "user") && <Header></Header>}
            <div
                className={`${
                    role === "admin" ? classes.flexSidebarChildren : null
                }`}
            >
                {role === "admin" && <Dashboard></Dashboard>}
                <div className={classes.children}>{children}</div>
            </div>

            {(role === "" || role === "user") && <Footer />}
        </div>
    );
};

export default Layout;
