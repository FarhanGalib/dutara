import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    requestAddNewCategory,
    requestCategoryList,
    requestDeleteCategory,
} from "../../../../store/actions/categoryAction";
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
    Grid,
} from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    table: { minWidth: 650 },
    input: { display: "block", marginTop: 15 },
    submitBtn: { display: "block", marginTop: 15, marginBottom: 15 },
}));
const CategoryTable = () => {
    const classes = useStyles();
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: "",
    });
    const [showForm, setShowForm] = useState(false);
    const [loadedCategory, setLoadedCategory] = useState([]);
    const [toggle, setToggle] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const { categoryList } = useSelector((state) => state.categoryStore);
    const loader = useSelector((state) => state.LoaderReducer);

    useEffect(() => {
        dispatch(requestCategoryList());
    }, [toggle]);

    useEffect(() => {
        setLoadedCategory([...categoryList]);
    }, [categoryList]);

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
        <>
            {!loader && (
                <Container maxWidth="lg">
                    <div className={classes.form}>
                        <Typography
                            variant="h5"
                            align="center"
                            sx={{ my: "50px" }}
                        >
                            CATEGORY
                        </Typography>
                        {!showForm && (
                            <Button
                                variant="outlined"
                                onClick={() => setShowForm(true)}
                                style={{ outline: "none" }}
                            >
                                Add Category
                            </Button>
                        )}
                        {showForm && (
                            <form onSubmit={handleAddNewCategory}>
                                <Typography
                                    variant="h6"
                                    color="textSecondary"
                                    align="center"
                                    sx={{ my: "30px" }}
                                >
                                    Add Category
                                </Typography>
                                <Container maxWidth="xs">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                label="category name"
                                                variant="outlined"
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
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                label="category description"
                                                variant="outlined"
                                                className={classes.input}
                                                onChange={(e) =>
                                                    setNewCategory({
                                                        ...newCategory,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                value={newCategory.description}
                                                placeholder="Category description"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                fullWidth
                                                type="submit"
                                                className={classes.submitBtn}
                                                variant="contained"
                                                color="primary"
                                                style={{ outline: "none" }}
                                            >
                                                SUBMIT
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </form>
                        )}
                    </div>

                    <div className={classes.categoryTable}>
                        <Typography
                            variant="h6"
                            color="textSecondary"
                            align="center"
                            sx={{ mb: "20px", mt: "50px" }}
                        >
                            Category List
                        </Typography>

                        <TableContainer component={Paper} sx={{ mb: "50px" }}>
                            <Table
                                className={classes.table}
                                aria-label="simple table"
                            >
                                <TableHead sx={{ backgroundColor: "#BDBDBD" }}>
                                    <TableRow>
                                        <TableCell>NAME</TableCell>
                                        <TableCell>DESCRIPTION</TableCell>
                                        <TableCell>ACTION</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loadedCategory.length !== 0
                                        ? categoryList.map((category) => (
                                              <TableRow key={category._id}>
                                                  <TableCell>
                                                      {category.name}
                                                  </TableCell>
                                                  <TableCell>
                                                      {category.description}
                                                  </TableCell>
                                                  <TableCell>
                                                      <div style={{display:"flex"}}>
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
                                                                  handleEditCategory(
                                                                      category._id
                                                                  )
                                                              }
                                                          >
                                                              <EditIcon />
                                                          </IconButton>
                                                          <IconButton
                                                              style={{
                                                                  outline:
                                                                      "none",
                                                                  backgroundColor:
                                                                      "#ee4e4e",
                                                                  color: "white",
                                                              }}
                                                              onClick={() =>
                                                                  handleDeleteCategory(
                                                                      category._id
                                                                  )
                                                              }
                                                          >
                                                              <DeleteIcon />
                                                          </IconButton>
                                                      </div>
                                                  </TableCell>
                                              </TableRow>
                                          ))
                                        : null}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Container>
            )}
        </>
    );
};

export default CategoryTable;
