import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { requestAddCartItem, requestCartList, requestCheckOut } from "../../../store/actions/cartAction";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { setCartProductQuantity } from "../../../store/actions/cartAction";
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
    Button,
    Grid,
} from "@material-ui/core";
import "./cart.css";

const useStyles = makeStyles((theme) => ({
    table: { minWidth: 250 },
    quantity: { display: "flex", flexDirection: "row" },
     cartContainer:{ border: "5px solid red",width:"100%", marginTop: 30, marginBottom:20},
    tableContainer: { marginBottom:20, marginRight: 20 },
    cartDetails:{ marginBottom:20},  marginLeft: 20,
}));

const Cart = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { cartList } = useSelector((state) => state.CartReducer);
    const [reload, setReload]= useState(true)
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    
    useEffect(() => {
        dispatch(requestCartList(token));
       
    }, [reload]);
   

    const handleQuantity = (type, itemId, productId, quantity) => {
        dispatch(
            setCartProductQuantity(type, itemId, productId, quantity, token)
        );
        setReload(!reload);
    };
    
    const checkOut = () => {
        dispatch(requestCheckOut(token));
    };
    const handleDeleteCartItem = (id) => {
       // dispatch(deleteProductFromCart(id))
    };
    return (
        <div className={classes.cartContainer}> 
            {cartList && (
                <div>
                    <div className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table
                                className={classes.table}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>IMAGE</TableCell>
                                        <TableCell>TITLE</TableCell>
                                        <TableCell>PRICE</TableCell>
                                        <TableCell>QUANTITY</TableCell>
                                        <TableCell>TOTAL PRICE</TableCell>
                                        <TableCell>DELETE</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartList &&
                                        cartList.products.map((item, index) => (
                                            <TableRow key={item._id}>
                                                <TableCell>
                                                    {" "}
                                                    <img
                                                        height="150px"
                                                        src={`http://localhost:8080${item.productId.image}`}
                                                        alt=""
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {item.productId.title}
                                                </TableCell>
                                                <TableCell>
                                                    {item.productId.price} TK
                                                </TableCell>
                                                <TableCell>
                                                    <div
                                                        className={
                                                            classes.quantity
                                                        }
                                                    >
                                                        <IconButton
                                                            onClick={() =>
                                                                handleQuantity(
                                                                    "decrement",
                                                                    item._id,
                                                                    item
                                                                        .productId
                                                                        ._id,
                                                                    item.quantity
                                                                )
                                                            }
                                                            variant="contained"
                                                            color="secondary"
                                                        >
                                                            <RemoveCircleOutlineIcon />
                                                        </IconButton>
                                                        <p> {item.quantity}</p>

                                                        <IconButton
                                                            onClick={() =>
                                                                handleQuantity(
                                                                    "increment",
                                                                    item._id,
                                                                    item
                                                                        .productId
                                                                        ._id,
                                                                    item.quantity
                                                                )
                                                            }
                                                            variant="contained"
                                                            color="primary"
                                                        >
                                                            <AddCircleOutlineIcon />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    {item.productId.price *
                                                        item.quantity}{" "}
                                                    TK
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() =>
                                                            handleDeleteCartItem( item._id)
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className={classes.cartDetails}>
                        <h4>Cart Details</h4>
                        <p>
                           {`Total Products: ${cartList.products.reduce(
                                (total, item) => total + item.quantity,
                                0
                            )}`}
                        </p>
                        <p>
                            {`Total  Price: ${cartList.products.reduce(
                                (total, item) =>
                                    total +
                                    item.productId.price * item.quantity,
                                0
                            )} TK`}
                        </p>
                        
                        <Button variant="contained" color="primary" onClick={()=>checkOut()}>
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
