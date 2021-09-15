import { Button, Container, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { requestAddNewUserByAdmin } from "../../../store/actions/userAction";
import { makeStyles } from '@material-ui/core/styles';
import styles from "./addUser.module.css";

const useStyles = makeStyles((theme)=>({
    
}));

const AddUser = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const [userAddInfo, setUserAddInfo] = useState({
        lat: "",
        long: "",

        city: "",
        street: "",
        number: 0,
        zipcode: "",

        role: "user",

        email: "",
        username: "",

        phone: "",
        password: "",
        confirmPassword: "",
    });
    const setAddUserForm = (key, e) => {
        setUserAddInfo({ ...userAddInfo, [key]: e.target.value });
    };
    const handleAddUserForm = (e) => {
        e.preventDefault();
        dispatch(requestAddNewUserByAdmin(userAddInfo, token));
        history.push("/users");
    };
    console.log(userAddInfo);
    return (
        <div className={styles.root}>
            <Container>
                <Typography variant="h5" align="center">ADD USER</Typography>
                <form onSubmit={handleAddUserForm}>
                    <br />
                    <TextField
                        type="email"
                        variant="outlined"
                        label="Email"
                        value={userAddInfo.email}
                        onChange={(e) => setAddUserForm("email", e)}
                        id="email"
                        name="email"
                        className=""
                        
                        required
                    />
                    <br />

                    <br />
                    <TextField
                        type="text"
                        variant="outlined"
                        label=" Username"
                        value={userAddInfo.username}
                        onChange={(e) => setAddUserForm("username", e)}
                        id="username"
                        name="username"
                        className=""
                        required
                    />

                    <br />

                    <br />
                    <TextField
                        type="password"
                        variant="outlined"
                        label="Password"
                        helperText="password must be 8-20 characters"
                        value={userAddInfo.password}
                        onChange={(e) => setAddUserForm("password", e)}
                        id="password"
                        name="password"
                        className=""
                        required
                    />
                    <br />

                    <br />
                    <TextField
                        type="password"
                        variant="outlined"
                        label="Confirm Password"
                        helperText="password must be 8-20 characters"
                        value={userAddInfo.confirmPassword}
                        onChange={(e) => setAddUserForm("confirmPassword", e)}
                        id="confirmPassword"
                        name="confirmPassword"
                        className=""
                        required
                    />

                    {userAddInfo.password !== userAddInfo.confirmPassword && (
                        <p style={{ color: "red" }}>password not matched</p>
                    )}

                    <br />
                    <TextField
                        type="text"
                        variant="outlined"
                        label="Street"
                        value={userAddInfo.street}
                        onChange={(e) => setAddUserForm("street", e)}
                        id="street"
                        name="street"
                        className=""
                        required
                    />
                    <br />

                  

                    <br />
                    {/* <TextField
                        type="text"
                        variant="outlined"
                        label="Role"
                        value={userAddInfo.role}
                        onChange={(e) => setAddUserForm("role", e)}
                        id="role"
                        name="role"
                        className=""
                        required
                    /> */}
                     <TextField
                        required
                        select
                        value={userAddInfo.role}
                        className={classes.sortByCategory}
                        onChange={(e) =>
                            setUserAddInfo({
                                ...userAddInfo,
                                role: e.target.value,
                            })
                        }
                        
                        SelectProps={{
                            native: true,
                        }}
                        label="select role"
                        variant= "outlined"
                    >
                        {["user", "admin"].map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </TextField>

                    <br />

                    <br />
                    <TextField
                        type="text"
                        variant="outlined"
                        label="Phone Number"
                        value={userAddInfo.phone}
                        onChange={(e) => setAddUserForm("phone", e)}
                        id="phone"
                        name="phone"
                        className=""
                        required
                    />

                    <br />

                    <br />
                    <TextField
                        type="text"
                        variant="outlined"
                        label="Lat"
                        value={userAddInfo.lat}
                        onChange={(e) => setAddUserForm("lat", e)}
                        id="lat"
                        name="lat"
                        className=""
                        required
                    />

                    <br />

                    <br />
                    <TextField
                        type="text"
                        variant="outlined"
                        label="Long"
                        value={userAddInfo.long}
                        onChange={(e) => setAddUserForm("long", e)}
                        id="long"
                        name="long"
                        className=""
                        required
                    />

                    <br />

                    <br />
                    <TextField
                        type="text"
                        variant="outlined"
                        label="Zip Code"
                        value={userAddInfo.zipcode}
                        onChange={(e) => setAddUserForm("zipcode", e)}
                        id="zipcode"
                        name="zipcode"
                        className=""
                        required
                    />

                    <br />

                    <br />
                    <TextField
                        type="text"
                        variant="outlined"
                        label="House no."
                        value={userAddInfo.number}
                        onChange={(e) => setAddUserForm("number", e)}
                        id="number"
                        name="number"
                        className=""
                        required
                    />

                    <br />

                    <br />
                    <TextField
                        type="text"
                        variant="outlined"
                        label="City"
                        value={userAddInfo.city}
                        onChange={(e) => setAddUserForm("city", e)}
                        id="city"
                        name="city"
                        className=""
                        required
                    />
                    <br />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default AddUser;
