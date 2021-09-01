import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    requestAddNewCategory,
    requestCategoryList,
    requestDeleteCategory,
} from "../../../store/actions/categoryAction";
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

const useStyles = makeStyles((theme) => ({
    table: { minWidth: 650 },
}));
const Category = () => {
    const classes = useStyles();
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: "",
    });
    const [toggle, setToggle] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const { categoryList } = useSelector((state) => state.categoryStore);
    console.log(token);

    useEffect(() => {
        dispatch(requestCategoryList());
    }, [toggle]);

    const handleAddNewCategory = (e) => {
        e.preventDefault();
        dispatch(requestAddNewCategory(newCategory, token));
        setNewCategory({ name: "", description: "" });
        setToggle(!toggle);
    };
    const handleEditCategory = (id) => {
        history.push(`/category/edit/${id}`);
    };
    const handleDeleteCategory = (id) => {
        dispatch(requestDeleteCategory(id, token));
        setToggle(!toggle);
    };
    return (
        <div>
            <Container>
                <div className={classes.form}>
                    <form onSubmit={handleAddNewCategory}>
                        <input
                            type="text"
                            className={classes.input}
                            onChange={(e) =>
                                setNewCategory({
                                    ...newCategory,
                                    name: e.target.value,
                                })
                            }
                            value={newCategory.name}
                            placeholder="Category Name"
                            required
                        />
                        <input
                            type="text"
                            className={classes.input}
                            onChange={(e) =>
                                setNewCategory({
                                    ...newCategory,
                                    description: e.target.value,
                                })
                            }
                            value={newCategory.description}
                            placeholder="Category description"
                            required
                        />
                        <input
                            type="submit"
                            className={classes.submitBtn}
                            value="Submit"
                        />
                    </form>
                </div>

                <div className={classes.categoryTable}>
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>NAME</TableCell>
                                    <TableCell>DESCRIPTION</TableCell>
                                    <TableCell>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categoryList.map((category) => (
                                    <TableRow key={category._id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>
                                            {category.description}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() =>
                                                    handleEditCategory(
                                                        category._id
                                                    )
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    handleDeleteCategory(
                                                        category._id
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

export default Category;
