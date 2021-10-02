import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
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
    Typography,
} from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
    requestDeleteSingleUser,
    requestUserList,
} from "../../../../store/actions/userAction";

const useStyles = makeStyles((theme) => ({
    table: { minWidth: 650 },
    role: { display: "inline-block", padding: "2px 8px", borderRadius: 15 },
    user: { backgroundColor: "#4ff5c3" },
    admin: { backgroundColor: "#f5c94f" },
}));
const UserTable = () => {
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
    const loader = useSelector((state) => state.LoaderReducer);

    useEffect(() => {
        dispatch(requestUserList(token));
    }, [dispatch, toggle, location]);

    useEffect(() => {
        setUser(userList);
    }, [userList]);

    const handleEditUser = (id) => {
        history.push(`/edit-profile/${id}`);
    };

    const handleDeleteUser = (id) => {
        dispatch(requestDeleteSingleUser(id, token));
        setToggle(!toggle);
    };
    return (
        <>
            {!loader && (
                <Container
                    maxWidth="lg"
                    sx={{ my: "50px" }}
                    className={classes.userTable}
                >
                    <Typography variant="h5" align="center" sx={{ my: "50px" }}>
                        User List
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="User table"
                        >
                            <TableHead sx={{ backgroundColor: "#BDBDBD" }}>
                                <TableRow>
                                    <TableCell>NAME AND USERNAME</TableCell>
                                    <TableCell>EMAIL AND PHONE NO.</TableCell>
                                    <TableCell>ROLE</TableCell>
                                    <TableCell>ADDRESS</TableCell>
                                    <TableCell>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user
                                    ? user.map((user) => (
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
                                              <TableCell>
                                                  <div
                                                      className={`${
                                                          classes.role
                                                      } ${
                                                          user?.role === "user"
                                                              ? classes.user
                                                              : classes.admin
                                                      }`}
                                                  >
                                                      {user?.role}
                                                  </div>
                                              </TableCell>
                                              <TableCell>
                                                  {user?.address.number}-
                                                  {user?.address.city}-
                                                  {user?.address.zipcode}
                                              </TableCell>
                                              <TableCell>
                                                  <div
                                                      style={{
                                                          display: "flex",
                                                      }}
                                                  >
                                                      <IconButton
                                                          style={{
                                                              outline: "none",
                                                              backgroundColor:
                                                                  "#52ff6f",
                                                              color: "white",
                                                              marginRight:
                                                                  "5px",
                                                          }}
                                                          onClick={() =>
                                                              handleEditUser(
                                                                  user._id
                                                              )
                                                          }
                                                      >
                                                          <EditIcon />
                                                      </IconButton>
                                                      <IconButton
                                                          style={{
                                                              outline: "none",
                                                              backgroundColor:
                                                                  "#ee4e4e",
                                                              color: "white",
                                                          }}
                                                          onClick={() =>
                                                              handleDeleteUser(
                                                                  user._id
                                                              )
                                                          }
                                                      >
                                                          <DeleteIcon />
                                                      </IconButton>
                                                  </div>
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            )}
        </>
    );
};

export default UserTable;
