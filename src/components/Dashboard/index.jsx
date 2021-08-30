import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { setToken } from "../../store/actions/tokenAction";
import CategoryIcon from '@material-ui/icons/Category';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    active: {
        backgroundColor: "#f1f1f1",
    },
    item: {
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#f8f8f8",
        },
    },
    logo: {
        paddingLeft: theme.spacing(8),
    },
    logo1: {
        color: "#D44D12",
        fontSize: "25px",
        fontWeight: 600,
    },
    logo2: {
        color: "#91CA55",
        fontWeight: 900,
    },
}));

const Dashboard = () => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const navlinks = [
        {
            text: "Home",
            icon: <HomeIcon color="primary" />,
            path: "/",
        },
        {
            text: "Add Product",
            icon: <AddCircleOutlineIcon color="primary" />,
            path: "/create-product",
        },
        {
            text: "Orders",
            icon: <ShoppingCartIcon color="primary" />,
            path: "/orders",
        },
        {
            text: "Add User",
            icon: <AddIcon color="primary" />,
            path: "/add-user",
        },
        {
            text: "Users",
            icon: <PeopleAltIcon color="primary" />,
            path: "/users",
        },
        {
            text: "Categories",
            icon: <CategoryIcon color="primary" />,
            path: "/category",
        },
    ];

    const signOut = () => {
        dispatch(setToken({}));
        history.push("/signin");
    };
    return (
        <div>
            <Drawer
                className={classes.drawer}
                anchor="left"
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.logo}>
                    <span className={classes.logo1}>দো</span>
                    <span className={classes.logo2}>তারা</span>
                </div>

                <List>
                    {navlinks.map((item) => (
                        <ListItem
                            className={`${classes.item} ${
                                location.pathname === item.path
                                    ? classes.active
                                    : null
                            }`}
                            key={item.text}
                            onClick={() => history.push(item.path)}
                        >
                            <ListItemIcon> {item.icon} </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                    <ListItem className={classes.item} onClick={signOut}>
                        <ListItemIcon>
                            {" "}
                            <ExitToAppIcon color="primary" />{" "}
                        </ListItemIcon>
                        <ListItemText primary="Sign Out" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default Dashboard;
