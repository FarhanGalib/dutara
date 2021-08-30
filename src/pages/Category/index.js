import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));
const Category = () => {
    const classes = useStyles();
    const [newCategory, setNewCategory] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const handleAddNewCategory=(e)=> {
        dispatch(requestAddNewProducts(newCategory));
    }
    return (
        <div>
            <form onSubmit={handleAddNewCategory}> 
                <input
                    type="text"
                    className={classes.input}
                    onChange={(e) => setNewCategory(e.target.value)}
                    value={newCategory}
                    placeHolder="Add new category"
                    required
                />
                <input
                    type="submit"
                    className={classes.submitBtn}
                    value="Submit"
                />
            </form>
        </div>
    );
};

export default Category;
