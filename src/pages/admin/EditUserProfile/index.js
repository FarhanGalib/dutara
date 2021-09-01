import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { requestSingleUserInfo, requestUserUpdate } from "../../../store/actions/userAction";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const EditUserProfile = () => {
    const { id } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [toggle, setToggle] = useState(true);
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const { currentUserInfo } = useSelector((state) => state.EditUserReducer);
    const [userUpdateForm, setUserUpdateForm] = useState({
        lat: "",
        long: "",

        city: "",
        number: 0,
        zipcode: "",

        role: "",

        email: "",
        username: "",
        firstname: "",
        lastname: "",
        phone: "",
    });

    useEffect(() => {
        dispatch(requestSingleUserInfo(id, token));
    }, []);
    useEffect(() => {
        setUserUpdateForm({
            ...userUpdateForm,
            lat: currentUserInfo.address.geolocation.lat,
            long: currentUserInfo.address.geolocation.long,

            city: currentUserInfo.address.city,
            number: currentUserInfo.address.number,
            zipcode: currentUserInfo.address.zipcode,

            role: currentUserInfo.role,

            email: currentUserInfo.email,
            username: currentUserInfo.username,
            firstname: currentUserInfo.firstname,
            lastname: currentUserInfo.lastname,
            phone: currentUserInfo.phone,
        });
    }, [currentUserInfo]);

    const setForm = (key, e) => {
        setUserUpdateForm({ ...userUpdateForm, [key]: e.target.value });
    };
    const handleUserUpdateForm = (e) => {
        e.preventDefault();
       dispatch( requestUserUpdate(id, token, userUpdateForm));
       history.push("/users");
    };
    return (
        <div>
           <Container>
           <form onSubmit={handleUserUpdateForm}>
                <label htmlFor="email" className="">
                    Email
                </label>
                <br />
                <input
                    type="email"
                    value={userUpdateForm.email}
                    onChange={(e) => setForm("email", e)}
                    id="email"
                    name="email"
                    className=""
                    required
                />
                <br />
                <label htmlFor="username" className="">
                    Username
                </label>
                <br />
                <input
                    type="text"
                    value={userUpdateForm.username}
                    onChange={(e) => setForm("username", e)}
                    id="username"
                    name="username"
                    className=""
                    required
                />
                <br />
                <label htmlFor="firstname" className="">
                    First name
                </label>
                <br />
                <input
                    type="text"
                    value={userUpdateForm.firstname}
                    onChange={(e) => setForm("firstname", e)}
                    id="firstname"
                    name="firstname"
                    className=""
                    required
                />
                <br />
                <label htmlFor="lastname" className="">
                    Last Name
                </label>
                <br />
                <input
                    type="text"
                    value={userUpdateForm.lastname}
                    onChange={(e) => setForm("lastname", e)}
                    id="lastname"
                    name="lastname"
                    className=""
                    required
                />
                <br />
                <label htmlFor="role" className="">
                    Role
                </label>
                <br />
                <input
                    type="text"
                    value={userUpdateForm.role}
                    onChange={(e) => setForm("role", e)}
                    id="role"
                    name="role"
                    className=""
                    required
                />

                <br />
                <label htmlFor="phone" className="">
                    Phone Number
                </label>
                <br />
                <input
                    type="text"
                    value={userUpdateForm.phone}
                    onChange={(e) => setForm("phone", e)}
                    id="phone"
                    name="phone"
                    className=""
                    required
                />

                <br />
                <label htmlFor="lat" className="">
                    Lat
                </label>
                <br />
                <input
                    type="text"
                    value={userUpdateForm.lat}
                    onChange={(e) => setForm("lat", e)}
                    id="lat"
                    name="lat"
                    className=""
                    required
                />

                <br />
                <label htmlFor="long" className="">
                    Long
                </label>
                <br />
                <input
                    type="text"
                    value={userUpdateForm.long}
                    onChange={(e) => setForm("long", e)}
                    id="long"
                    name="long"
                    className=""
                    required
                />

                <br />
                <label htmlFor="zipcode" className="">
                    Zip Code
                </label>
                <br />
                <input
                    type="text"
                    value={userUpdateForm.zipcode}
                    onChange={(e) => setForm("zipcode", e)}
                    id="zipcode"
                    name="zipcode"
                    className=""
                    required
                />

                <br />
                <label htmlFor="number" className="">
                    House no.
                </label>
                <br />
                <input
                    type="text"
                    value={userUpdateForm.number}
                    onChange={(e) => setForm("number", e)}
                    id="number"
                    name="number"
                    className=""
                    required
                />

                <br />
                <label htmlFor="city" className="">
                    City
                </label>
                <br />
                <input
                    type="text"
                    value={userUpdateForm.city}
                    onChange={(e) => setForm("city", e)}
                    id="city"
                    name="city"
                    className=""
                    required
                />
                <br />
                <input type="submit" value="UPDATE" />
            </form>
           </Container>
        </div>
    );
};

export default EditUserProfile;
