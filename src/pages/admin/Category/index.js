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
    TextField,
    Button,
    Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    table: { minWidth: 650 },
    input: {display: "block", marginTop:15},
    submitBtn: {display: "block", marginTop:15, marginBottom: 15},
}));
const Category = () => {
    const classes = useStyles();
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: "",
    });
    const [loadedCategory, setLoadedCategory] = useState([]);
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
    
    useEffect(() => {
        setLoadedCategory([...categoryList]);
    },[categoryList])

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
                    <Typography variant="h5" align="center">CATEGORY</Typography>
                    <form onSubmit={handleAddNewCategory}>
                        <Typography variant="h6" color="textSecondary" align="center">ADD CATEGORY</Typography>
                        <TextField
                            type="text"
                            label="category name"
                            variant= "outlined"
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
                        <TextField
                            type="text"
                            label="category description"
                            variant= "outlined"
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
                        <Button
                            type="submit"
                            className={classes.submitBtn}
                            variant="contained"
                            color="primary"
                        >SUBMIT</Button>
                    </form>
                </div>

                <div className={classes.categoryTable}>
                <Typography variant="h6" color="textSecondary" align="center">CATEGORY LIST</Typography>

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
                                {loadedCategory.length!==0? categoryList.map((category) => (
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
                                )):null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>
        </div>
    );
};

export default Category;
