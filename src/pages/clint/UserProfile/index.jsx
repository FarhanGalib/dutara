import { Button, Container, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { requestUpdateUserInfo, requestUserInfoByUser } from "../../../store/actions/userAction";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
    txtField: {
        marginBottom: 15,
    },
}));

const UserProfile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory()
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const { CurrentUserInfoReducer: currentUser } = useSelector(
        (state) => state
    );
    const [user, setUser] = useState({
        lat: "",
        long: "",

        city: "",
        street: "",
        number: 0,
        zipcode: "",

        role: "",
        email: "",
        username: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        dispatch(requestUserInfoByUser(token));
    }, []);

    useEffect(() => {
        setUser({
            ...user,
            lat: currentUser?.address.geolocation.lat,
            long: currentUser?.address.geolocation.long,

            city: currentUser?.address.city,
            street: currentUser?.address.street,
            number: currentUser?.address.number,
            zipcode: currentUser?.address.zipcode,

            role: currentUser?.role,
            email: currentUser?.email,
            username: currentUser?.username,
            phone: currentUser?.phone,
        });
    }, [currentUser]);

    const handleChange = (e, key) => {
        setUser({ ...user, [key]: e.target.value });
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(user.password.length, user.confirmPassword.length, user.password === user.confirmPassword,user.password , user.confirmPassword)
        if (
            user.password.length > 7 &&
            user.confirmPassword.length > 7 &&
            user.password === user.confirmPassword
        ) {

            dispatch(requestUpdateUserInfo(user,token))
            history.push("/home")
        }
    };
    console.log(user);
    return (
        <div>
            <Container>
                {currentUser && (
                    <form type="submit" onSubmit={handleUpdate}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Email"
                            type="email"
                            value={user?.email}
                            onChange={(e) => handleChange(e, "email")}
                            className={classes.txtField}
                        />
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="username"
                            type="text"
                            value={user?.username}
                            onChange={(e) => handleChange(e, "username")}
                            className={classes.txtField}
                        />
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="password"
                            type="password"
                            value={user?.password}
                            onChange={(e) => handleChange(e, "password")}
                            className={classes.txtField}
                        />
                        {user.password.length < 8 && (
                            <p style={{ color: "red" }}>
                                password must be 8-20 character
                            </p>
                        )}
                        <TextField
                            required
                            fullWidth
                            type="password"
                            variant="outlined"
                            label="confirm password"
                            value={user?.confirmPassword}
                            onChange={(e) => handleChange(e, "confirmPassword")}
                            className={classes.txtField}
                        />

                        {user.password !== user.confirmPassword && (
                            <p style={{ color: "red" }}>
                                confirm password not matched with password
                            </p>
                        )}
                        {user.confirmPassword.length < 8 && (
                            <p style={{ color: "red" }}>
                                password must be 8-20 character
                            </p>
                        )}
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="role"
                            type="text"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={user?.role}
                            //onChange={(e) => handleChange(e, "role")}
                            className={classes.txtField}
                        />
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="lat"
                            type="text"
                            value={user?.lat}
                            onChange={(e) => handleChange(e, "lat")}
                            className={classes.txtField}
                        />
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="long"
                            type="text"
                            value={user?.long}
                            onChange={(e) => handleChange(e, "long")}
                            className={classes.txtField}
                        />
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="city"
                            type="text"
                            value={user?.city}
                            onChange={(e) => handleChange(e, "city")}
                            className={classes.txtField}
                        />
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="street"
                            type="text"
                            onChange={(e) => handleChange(e, "street")}
                            className={classes.txtField}
                        />
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="number"
                            type="number"
                            value={user?.number}
                            onChange={(e) => handleChange(e, "number")}
                            className={classes.txtField}
                        />
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="zipcode"
                            type="text"
                            value={user?.zipcode}
                            onChange={(e) => handleChange(e, "zipcode")}
                            className={classes.txtField}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Update
                        </Button>
                    </form>
                )}
            </Container>
        </div>
    );
};

export default UserProfile;
