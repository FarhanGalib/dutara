import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuItem,
    Drawer,
    ListItemText,
    Avatar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import CartBadge from "../CartBadge";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../store/actions/tokenAction";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    appbar: {
        backgroundColor: "#f7f7f7",
    },
    menuButton: {
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    avatar: {
        backgroundColor: "orange",
    },
    navProperties: {
        [theme.breakpoints.up("sm")]: {
            marginRight: 70,
        },

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    navLinks: {
        display: "flex",
        flexDirection: "row",
        textDecoration: "none",
        justifyContent: "space-between",
        alignItems: "center",
    },
    space: {
        flexGrow: 1,

        [theme.breakpoints.down("xs")]: {
            textAlign: "center",
        },
    },
    navLink: {
        paddingLeft: 12,
        paddingRight: 12,
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
        color: "black",
        "&:hover": {
            color: "red",
        },
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    activeMobile: {
        backgroundColor: "#f1f1f1",
    },
    active: {
        paddingBottom: 5,
        borderBottom: "3px solid red",
    },
    cart: {
        marginLeft: 7,
    },
    profile: {
        marginLeft: 7,
    },
    logo1: {
        color: "#D44D12",
        fontSize: "25px",
        fontWeight: 600,

        [theme.breakpoints.up("xs")]: {
            marginLeft: 70,
        },
    },
    logo2: {
        color: "#91CA55",
        fontWeight: 900,
    },

    toolbar: theme.mixins.toolbar,
}));

const Header = () => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const { role, email, token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );

    const navlinks = [
        {
            text: "Home",
            path: "/",
        },
        {
            text: "About",
            path: "/about",
        },
        {
            text: "SignIn",
            path: "/signin",
        },
        {
            text: "SignUp",
            path: "/signup",
        },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleSignOut = () => {
        setAnchorEl(null);
        dispatch(setToken({ userInfo: { user: "", role: "", token: "" } }));
        history.push("/signin");
    };
    const userProfile = () => {
        setAnchorEl(null);
        history.push("/my-profile");
    };
    const userOrders = () => {
        setAnchorEl(null);
        history.push("/my-order");
    }
    return (
        <div>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    {/* Menu Button */}
                    <IconButton
                        color="primary"
                        className={classes.menuButton}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* SIDE BAR FOR MOBILE*/}
                    <Drawer
                        className={classes.drawer}
                        anchor="left"
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <List>
                            {navlinks.map((item) => (
                                <ListItem
                                    className={`${classes.item} ${
                                        location.pathname === item.path
                                            ? classes.activeMobile
                                            : null
                                    }`}
                                    key={item.text}
                                    onClick={() => history.push(item.path)}
                                >
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>

                    {/* LOGO */}
                    <div className={classes.space}>
                        <div>
                            <span className={classes.logo1}>দো</span>
                            <span className={classes.logo2}>তারা</span>
                        </div>
                    </div>
                    <div className={classes.navProperties}>
                        <div className={classes.navLinks}>
                            <NavLink
                                to="/"
                                style={{ textDecoration: "none" }}
                                className={`${classes.navLink} ${
                                    classes.item
                                } ${
                                    location.pathname === "/"
                                        ? classes.active
                                        : null
                                }`}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/about"
                                style={{ textDecoration: "none" }}
                                className={`${classes.navLink} ${
                                    classes.item
                                } ${
                                    location.pathname === "/about"
                                        ? classes.active
                                        : null
                                }`}
                            >
                                About
                            </NavLink>
                            {role === "" && (
                                <NavLink
                                    to="/signin"
                                    style={{ textDecoration: "none" }}
                                    className={`${classes.navLink} ${
                                        classes.item
                                    } ${
                                        location.pathname === "/signin"
                                            ? classes.active
                                            : null
                                    }`}
                                >
                                    Signin
                                </NavLink>
                            )}
                            {role === "" && (
                                <NavLink
                                    to="/signup"
                                    style={{ textDecoration: "none" }}
                                    className={`${classes.navLink} ${
                                        classes.item
                                    } ${
                                        location.pathname === "/signup"
                                            ? classes.active
                                            : null
                                    }`}
                                >
                                    Signup
                                </NavLink>
                            )}
                        </div>

                        {/* cart badge */}
                        {role !== "" && (
                            <div className={classes.cart}>
                                <CartBadge />
                            </div>
                        )}
                        {/* profile */}
                        {role !== "" && (
                            <IconButton
                                onClick={handleProfileMenuOpen}
                                className={classes.profile}
                            >
                                <Avatar alt="" className={classes.avatar}>
                                    F
                                </Avatar>
                            </IconButton>
                        )}
                        {role !== "" && (
                            <Menu
                                anchorEl={anchorEl}
                                // anchorOrigin={{
                                //     vertical: "bottom",
                                //     horizontal: "center",
                                // }}
                                // keepMounted
                                // transformOrigin={{
                                //     vertical: "top",
                                //     horizontal: "center",
                                // }}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={userProfile}>
                                    My Profile
                                </MenuItem>
                                <MenuItem onClick={userOrders}>
                                    My Orders
                                </MenuItem>
                                <MenuItem onClick={handleSignOut}>
                                    Signout
                                </MenuItem>
                            </Menu>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar}></div>
        </div>
    );
};

export default Header;
