import Layout from "./components/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUP from "./pages/SignUp";

import Users from "./pages/admin/Users";
import AddUser from "./pages/admin/AddUser";
import AddProduct from "./pages/admin/AddProduct";
import AdminProfile from "./pages/admin/AdminProfile";
import EditUserProfile from "./pages/admin/EditUserProfile";
import Category from "./pages/admin/Category";
import Page404 from "./pages/404";
import About from "./pages/About";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import EditCategory from "./pages/admin/Category/EditCategory";
import Products from "./pages/admin/Products";
import EditProduct from "./pages/admin/Products/EditProduct";
import ProductDetails from "./pages/clint/ProductDetails";
import UserProfile from "./pages/clint/UserProfile";
import Cart from "./pages/clint/Cart";
import Orders from "./pages/admin/Orders";
import UserOrder from "./pages/clint/UserOrder";
import { setLoader } from "./store/actions/loaderAction";

function App() {
    const { token, role } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const dispatch = useDispatch();
    const loader = useSelector((state) => state.LoaderReducer);
    // useEffect(() =>{
    //     setTimeout(() => {
    //         dispatch(setLoader(false))
    //     }, 6000);

    // })
    console.log(loader);
    return (
        <div>
            <Router>
             <Loader/> 
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
                        {/* <Route exact path="/cart/:customer-id">
                            <Cart />
                        </Route> */}
                        <Route exact path="/signup">
                            <SignUP />
                        </Route>

                        <Route exact path="/cart">
                            <Cart />
                        </Route>
                        {role === "admin" && <Route exact path="/orders">
                            <Orders />
                        </Route>}
                        {role === "user" &&<Route exact path="/my-order">
                            <UserOrder />
                        </Route>}

                        <Route exact path="/products">
                            <Products />
                        </Route>
                        <Route exact path="/product/:id">
                            <ProductDetails />
                        </Route>
                        {role === "admin" &&  <Route exact path="/users">
                            <Users />
                        </Route>}
                        {role === "admin" &&  <Route exact path="/add-user">
                            <AddUser />
                        </Route>}
                        {role === "admin" &&  <Route exact path="/add-product">
                            <AddProduct />
                        </Route>}
                        {role === "admin" && <Route exact path="/product/edit/:id">
                            <EditProduct />
                        </Route>}
                        {role === "user" &&  <Route exact path="/my-profile">
                            <UserProfile />
                        </Route>}

                       {role === "admin" &&  <Route exact path="/edit-profile/:id">
                            <EditUserProfile />
                        </Route>}

                        {<Route exact path="/category">
                            <Category />
                        </Route>}
                        {role === "admin" && <Route exact path="/category/edit/:id">
                            <EditCategory />
                        </Route>}

                        <Route exact path="/about">
                            <About />
                        </Route>
                        <Route path="*">
                            <Page404 />
                        </Route>
                    </Switch>
                </Layout>
              
            </Router>
        </div>
    );
}

export default App;
