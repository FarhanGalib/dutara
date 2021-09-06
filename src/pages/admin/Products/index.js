import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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
import { requestDeleteProduct, requestProductList } from "../../../store/actions/productAction";

const useStyles = makeStyles((theme) => ({
    table: { minWidth: 650 },
    title: {
        display: "flex",
        alignItems: "center",
    },
    img: { 
        marginRight: 10,
    },
}));

const Products = () => {
    const classes = useStyles();
    const { token } = useSelector((state) => state.persistedStorage.currentUser);
    const { productList } = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const BASE_URL = "http://localhost:8080";
    useEffect(() => {
        dispatch(requestProductList(token));
    }, [productList]);

    const handleEditProduct = (id) => {
        history.push(`/product/edit/${id}`);
    };
    const handleDeleteProduct = (id) => {
       dispatch( requestDeleteProduct(id, token));
    };

    return (
        <div>
            <Container>
                <div className={classes.categoryTable}>
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>TITLE</TableCell>
                                    <TableCell>PRICE</TableCell>
                                    <TableCell>CATEGORY</TableCell>
                                    <TableCell>STOCK</TableCell>
                                    <TableCell>DESCRIPTION</TableCell>
                                    <TableCell>ACTIONS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productList &&
                                    productList.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell component="th" scope="row" >
                                               <div className={classes.title}>
                                               <img
                                                    src={BASE_URL+product.image}
                                                    alt="img"
                                                    height="50px"
                                                    className={classes.img}
                                                />
                                                {product.title}
                                               </div>
                                            </TableCell>
                                            <TableCell>
                                                {product.price}
                                            </TableCell>
                                            <TableCell>
                                                {product.category.name}
                                            </TableCell>
                                            <TableCell>
                                                {product.stock}
                                            </TableCell>
                                            <TableCell>
                                                {product.description}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={() =>
                                                        handleEditProduct(
                                                            product._id
                                                        )
                                                    }
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() =>
                                                        handleDeleteProduct(
                                                            product._id
                                                        )
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
            </Container>
        </div>
    );
};

export default Products;
