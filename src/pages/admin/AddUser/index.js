import { Container } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { requestAddNewUserByAdmin } from "../../../store/actions/userAction";

const AddUser = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const [userAddInfo, setUserAddInfo] = useState({
        lat: "",
        long: "",

        city: "",
        street:"",
        number: 0,
        zipcode: "",

        role: "",

        email: "",
        username: "",
        
        firstname: "",
        lastname: "",
        phone: "",
        password:"",
        confirmPassword:""
    });
    const setAddUserForm=(key, e)=>{
        setUserAddInfo({...userAddInfo, [key]: e.target.value })
    }
    const handleAddUserForm=( e)=>{
        e.preventDefault();
        dispatch(requestAddNewUserByAdmin(userAddInfo, token));
        history.push('/users');
    }
    console.log(userAddInfo);
    return (
        <div>
            <Container>
                <form onSubmit={handleAddUserForm}>
                    <label htmlFor="email" className="">
                        Email
                    </label>
                    <br />
                    <input
                        type="email"
                        value={userAddInfo.email}
                        onChange={(e) => setAddUserForm("email", e)}
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
                        value={userAddInfo.username}
                        onChange={(e) => setAddUserForm("username", e)}
                        id="username"
                        name="username"
                        className=""
                        required
                    />
                    
                    <br />
                    <label htmlFor="password" className="">
                        Password
                    </label>
                    <br />
                    <input
                        type="text"
                        value={userAddInfo.password}
                        onChange={(e) => setAddUserForm("password", e)}
                        id="password"
                        name="password"
                        className=""
                        required
                    />
                      <br />

                    <label htmlFor="confirmPassword" className="">
                        Confirm Password
                    </label>
                    <br />
                    <input
                        type="text"
                        value={userAddInfo.confirmPassword}
                        onChange={(e) => setAddUserForm("confirmPassword", e)}
                        id="confirmPassword"
                        name="confirmPassword"
                        className=""
                        required
                    />
                    <br />

                    {userAddInfo.password!==userAddInfo.confirmPassword && <p>password not matched</p>}


                    <br />
                    <label htmlFor="street" className="">
                    street
                    </label>
                    <br />
                    <input
                        type="text"
                        value={userAddInfo.street}
                        onChange={(e) => setAddUserForm("street", e)}
                        id="street"
                        name="street"
                        className=""
                        required
                    />
                    <br />

                    <label htmlFor="firstname" className="">
                        Last Name
                    </label>
                    <br />
                    <input
                        type="text"
                        value={userAddInfo.firstname}
                        onChange={(e) => setAddUserForm("firstname", e)}
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
                        value={userAddInfo.lastname}
                        onChange={(e) => setAddUserForm("lastname", e)}
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
                        value={userAddInfo.role}
                        onChange={(e) => setAddUserForm("role", e)}
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
                        value={userAddInfo.phone}
                        onChange={(e) => setAddUserForm("phone", e)}
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
                        value={userAddInfo.lat}
                        onChange={(e) => setAddUserForm("lat", e)}
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
                        value={userAddInfo.long}
                        onChange={(e) => setAddUserForm("long", e)}
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
                        value={userAddInfo.zipcode}
                        onChange={(e) => setAddUserForm("zipcode", e)}
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
                        value={userAddInfo.number}
                        onChange={(e) => setAddUserForm("number", e)}
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
                        value={userAddInfo.city}
                        onChange={(e) => setAddUserForm("city", e)}
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

export default AddUser;
