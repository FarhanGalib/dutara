import Layout from "./components/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUP from "./pages/SignUp";
import Cart from "./pages/admin/Cart";
import Users from "./pages/admin/Users";
import AddUser from "./pages/admin/AddUser";
import AddProduct from "./pages/admin/AddProduct";
import UserProfile from "./pages/admin/UserProfile";
import EditUserProfile from "./pages/admin/EditUserProfile";
import Category from "./pages/admin/Category";
import Page404 from "./pages/404";
import About from "./pages/About";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditCategory from "./pages/admin/Category/EditCategory";
// import {isEmpty} from "lodash";
const _ = require("lodash");

function App() {
    //const { token } = useSelector((state) => state.persistedStorage.token.userInfo);
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
                        <Route exact path="/edit-profile/:id">
                            <EditUserProfile />
                        </Route>
                        <Route exact path="/category">
                            <Category />
                        </Route>
                        <Route exact path="/category/edit/:id">
                            <EditCategory />
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
