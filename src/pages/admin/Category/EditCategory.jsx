import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    requestSingleCategory,
    requestUpdateCategory,
} from "../../../store/actions/categoryAction";

const useStyles = makeStyles((theme) => ({}));

const EditCategory = () => {
    const classes = useStyles();
    const [category, setCategory] = useState({
        name: "",
        description: "",
    });

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const { name, description } = useSelector(
        (state) => state.EditCategoryReducer.categoryForEdit
    );
    console.log(token);

    useEffect(() => {
        dispatch(requestSingleCategory(id, token));
        setCategory({ ...category, name: name, description: description });
    }, []);

    useEffect(() => {
        setCategory({ ...category, name: name, description: description });
    }, [name, description]);

    const handleUpdateCategory = (e) => {
        e.preventDefault();
        dispatch(requestUpdateCategory(id, category, token));
        setCategory({ name: "", description: "" });
        history.push("/category");
    };

    return (
        <div>
            <Container>
                <div className={classes.form}>
                    <form onSubmit={handleUpdateCategory}>
                        <input
                            type="text"
                            className={classes.input}
                            onChange={(e) =>
                                setCategory({
                                    ...category,
                                    name: e.target.value,
                                })
                            }
                            value={category.name}
                            placeholder="Category Name"
                            required
                        />
                        <input
                            type="text"
                            className={classes.input}
                            onChange={(e) =>
                                setCategory({
                                    ...category,
                                    description: e.target.value,
                                })
                            }
                            value={category.description}
                            placeholder="Category description"
                            required
                        />
                        <input
                            type="submit"
                            className={classes.updateBtn}
                            value="UPDATE"
                        />
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default EditCategory;
