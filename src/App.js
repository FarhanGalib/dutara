import Layout from "./components/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUP from "./pages/SignUp";
import Cart from "./pages/Cart";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import AddProduct from "./pages/AddProduct";
import UserProfile from "./pages/UserProfile";
import EditUserProfile from "./pages/EditUserProfile";
import Category from "./pages/Category";
import Page404 from "./pages/404";
import About from "./pages/About";
import { useSelector } from "react-redux";
import { useState } from "react";
// import {isEmpty} from "lodash";
const _ = require("lodash");

function App() {
    const { token } = useSelector((state) => state.persistedStorage);
    // const [tokenIsEmpty, setTokenIsEmpty] = useState(true);
    // Object.keys(token).length === 0 && token.constructor === 0
    // if (_.isEmpty(token)) {
    //     setTokenIsEmpty(true);
    // } else {
    //     setTokenIsEmpty(false);
    // }
    return (
        <div>
            <Router>
                {/* <Loader> */}
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/home">
                            <Home />
                        </Route>
                        <Route exact path="/signin">
                            <SignIn />
                        </Route>
                        <Route exact path="/cart/:customer-id">
                            <Cart />
                        </Route>
                        <Route exact path="/signup">
                            <SignUP />
                        </Route>
                        {/* {!tokenIsEmpty
                            ? token.userInfo.role === "admin" && (
                                  <Route exact path="/users">
                                      <Users />
                                  </Route>
                              )
                            : null}

                        {!tokenIsEmpty
                            ? token.userInfo.role === "admin" && (
                                  <Route exact path="/add-user">
                                      <AddUser />
                                  </Route>
                              )
                            : null}

                        {!tokenIsEmpty
                            ? token.userInfo.role === "admin" && (
                                  <Route exact path="/add-product">
                                      <AddProduct />
                                  </Route>
                              )
                            : null}

                        {!tokenIsEmpty
                            ? token.userInfo.role === "admin" && (
                                  <Route exact path="/profile/:user-id">
                                      <UserProfile />
                                  </Route>
                              )
                            : null}

                        {!tokenIsEmpty
                            ? token.userInfo.role === "admin" && (
                                  <Route exact path="/edit-profile/:user-id">
                                      <EditUserProfile />
                                  </Route>
                              )
                            : null}
                        {!tokenIsEmpty
                            ? token.userInfo.role === "admin" && (
                                  <Route exact path="/category">
                                      <Category />
                                  </Route>
                              )
                            : null} */}
                        {/* //////////////////////////////////////////////////////////////////////// */}

                        <Route exact path="/users">
                            <Users />
                        </Route>
                        <Route exact path="/add-user">
                            <AddUser />
                        </Route>
                        <Route exact path="/add-product">
                            <AddProduct />
                        </Route>
                        <Route exact path="/profile/:user-id">
                            <UserProfile />
                        </Route>
                        <Route exact path="/edit-profile/:user-id">
                            <EditUserProfile />
                        </Route>
                        <Route exact path="/category">
                            <Category />
                        </Route>

                        {/* ////////////////////////////////////////////////////////////// */}
                        <Route exact path="/about">
                            <About />
                        </Route>
                        <Route path="*">
                            <Page404 />
                        </Route>
                    </Switch>
                </Layout>
                {/* </Loader> */}
            </Router>
        </div>
    );
}

export default App;
