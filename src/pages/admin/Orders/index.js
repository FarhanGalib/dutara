import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Container,
} from "@material-ui/core";
import { requestOrderList } from "../../../store/actions/orderActon";
import { requestChangeOrderStatus } from "../../../store/actions/orderActon";
import HelpIcon from "@material-ui/icons/Help";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
    table: { minWidth: 650 },
    actions: {},
    pending: { backgroundColor: "#f4b328", marginRight: 5, color: "white" },
    delivered: {
        backgroundColor: "#2cea60",
        marginLeft: 5,
        marginRight: 5,
        color: "white",
    },
    canceled: {
        backgroundColor: "#ff1515",
        marginLeft: 5,
        marginRight: 5,
        color: "white",
    },
}));
const Orders = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { orderList } = useSelector((state) => state.OrdersReducer);
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );

    useEffect(() => {
        dispatch(requestOrderList(token));
    }, []);

    const handleStatus = (orderId, status) => {
        dispatch(requestChangeOrderStatus(orderId, status, token));
    };
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ORDER OF</TableCell>
                            <TableCell>ORDER TIME</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell>SHIPPING ADDRESS</TableCell>
                            <TableCell>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList &&
                            orderList.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        {`${item.userId.firstname} ${item.userId.lastname}`}{" "}
                                        <br />
                                        {`@${item.userId.username}`}{" "}
                                    </TableCell>
                                    <TableCell>{new Date(item.date).toUTCString()}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>
                                        {item.userId.address.geolocation.lat}-
                                        {item.userId.address.geolocation.long}-
                                        {item.userId.address.city}-
                                        {item.userId.address.zipcode}
                                    </TableCell>
                                    <TableCell>
                                        <div className={classes.actions}>
                                            <IconButton
                                                variant="contained"
                                                className={classes.pending}
                                                onClick={() => handleStatus(item._id, 0)}
                                            >
                                                <HelpIcon />
                                            </IconButton>
                                            <IconButton
                                                variant="contained"
                                                className={classes.delivered}
                                                onClick={() => handleStatus(item._id, 1)}
                                            >
                                                <CheckIcon />
                                            </IconButton>
                                            <IconButton
                                                variant="contained"
                                                className={classes.canceled}
                                                onClick={() => handleStatus(item._id, 2)}
                                                disabled={false}
                                            >
                                                <CancelIcon />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Orders;
