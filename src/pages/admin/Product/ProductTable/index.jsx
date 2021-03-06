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
    Typography,
} from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
    requestDeleteProduct,
    requestProductList,
} from "../../../../store/actions/productAction";
import { BASE_URL } from "../../../../utils/constants";

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

const ProductTable = () => {
    const classes = useStyles();
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const { productList } = useSelector((state) => state);
    const loader = useSelector((state) => state.LoaderReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const [reload, setReload] = useState(true);

    useEffect(() => {
        dispatch(requestProductList(token));
    }, [reload]);

    const handleEditProduct = (id) => {
        history.push(`/product/edit/${id}`);
    };
    const handleDeleteProduct = (id) => {
        dispatch(requestDeleteProduct(id, token));
        setReload(!reload);
    };

    return (
        <>
            {!loader && (
                <Container maxWidth="lg" sx={{ my: "50px" }}>
                    <div className={classes.categoryTable}>
                        <Typography
                            variant="h5"
                            sx={{ my: "50px" }}
                            align="center"
                        >
                            Product List
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table
                                className={classes.table}
                                aria-label="simple table"
                            >
                                <TableHead sx={{ backgroundColor: "#BDBDBD" }}>
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
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <div
                                                        className={
                                                            classes.title
                                                        }
                                                    >
                                                        <img
                                                            src={
                                                                BASE_URL +
                                                                "/files/" +
                                                                product.image
                                                            }
                                                            alt="img"
                                                            style={{
                                                                height: "100px",
                                                                objectFit:
                                                                    "contain",
                                                            }}
                                                            className={
                                                                classes.img
                                                            }
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
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                        }}
                                                    >
                                                        <IconButton
                                                            style={{
                                                                outline:
                                                                    "none",
                                                                backgroundColor:
                                                                    "#52ff6f",
                                                                color: "white",
                                                                marginRight:
                                                                    "5px",
                                                            }}
                                                            onClick={() =>
                                                                handleEditProduct(
                                                                    product._id
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
                                                                handleDeleteProduct(
                                                                    product._id
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Container>
            )}
        </>
    );
};

export default ProductTable;
