import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,useLocation } from "react-router-dom";
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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { requestDeleteSingleUser, requestUserList } from "../../../store/actions/userAction";

const useStyles = makeStyles((theme) => ({
    table: { minWidth: 650 },
}));
const Users = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [toggle, setToggle] = useState(true);
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const { userList } = useSelector((state) => state.userListReducer);
    const [user, setUser] = useState(userList);

    useEffect(() => {
        dispatch(requestUserList(token));
    }, [dispatch, toggle, location]);

    useEffect(() => {
        setUser(userList);
    },[userList]);

    const handleEditUser = (id) => {
        history.push(`/edit-profile/${id}`);
    };

    const handleDeleteUser = (id) => {
        dispatch(requestDeleteSingleUser(id,token));
        setToggle(!toggle);
    };
    return (
        <div>
            <div className={classes.userTable}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="User table">
                        <TableHead>
                            <TableRow>
                                <TableCell>NAME AND USERNAME</TableCell>
                                <TableCell>EMAIL AND PHONE NO.</TableCell>
                                <TableCell>ROLE</TableCell>
                                <TableCell>ADDRESS</TableCell>
                                <TableCell>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user? user.map((user) => (
                                <TableRow key={user?._id}>
                                    <TableCell>
                                        {`${user?.firstname} ${user?.lastname}`}{" "}
                                        <br />@{user?.username}
                                    </TableCell>
                                    <TableCell>
                                        {user?.email}
                                        <br />
                                        {user?.phone}
                                    </TableCell>
                                    <TableCell>{user?.role}</TableCell>
                                    <TableCell>
                                        {user?.address.number}-{user?.address.city}-
                                        {user?.address.zipcode}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() =>
                                                handleEditUser(user._id)
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() =>
                                                handleDeleteUser(user._id)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )):null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Users;
