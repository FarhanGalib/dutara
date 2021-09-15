import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch, useSelector } from "react-redux";
import { requestCategoryList } from "../../../store/actions/categoryAction";
import { requestAddNewProduct } from "../../../store/actions/productAction";

const useStyles = makeStyles({});

const AddProduct = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [baseImage, setBaseImage] = useState("");
    const [isImageChanged, setIsImageChanged] = useState(false);

    
    const [newProduct, setNewProduct] = useState({
        title: "",
        categoryId: "",
        description: "",
        price: "",
        stock:"",
        image: "",
    });
    const { categoryList } = useSelector((state) => state.categoryStore);
   
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    console.log(newProduct);

    useEffect(() => {
        dispatch(requestCategoryList());
    }, []);

    useEffect(() => {
        setNewProduct({
            ...newProduct,
            categoryId: categoryList[0]?._id,
        })
    }, [categoryList]);

    const uploadProductImage = async (e) => {
        setIsImageChanged(true);
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
        console.log(base64);
        setNewProduct({ ...newProduct, image: base64 });
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const setAddProduct = (e, key) => {
        setNewProduct({ ...newProduct, [key]: e.target.value });
    };

    const requestAddProduct = (e) => {
        e.preventDefault();
        dispatch(requestAddNewProduct(newProduct, token));
        history.push("/products");
    };

    return (
        <div>
            <Container>
                <Typography variant="h4" className={classes.heading}>
                    Add <span className={classes.headingStyle2}>Pro</span>
                    duct
                </Typography>
                <form type="submit" onSubmit={requestAddProduct}>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label="Product Title"
                        type="text"
                        value={newProduct.title}
                        onChange={(e) => setAddProduct(e, "title")}
                        className={classes.txtField}
                    />
                    <img src={isImageChanged? baseImage : null} alt=""/>
                    <input
                        type="file"
                        onChange={(e) => uploadProductImage(e)}
                        required
                    />

                    <TextField
                        required
                        select
                        value={newProduct._id}
                        className={classes.sortByCategory}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                categoryId: e.target.value,
                            })
                        }
                        
                        SelectProps={{
                            native: true,
                        }}
                        helperText="select category"
                    >
                        {categoryList.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </TextField>

                    <TextField
                        required
                        variant="outlined"
                        label="Product Price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setAddProduct(e, "price")}
                        className={classes.txtField}
                    />
                     <TextField
                        required
                        variant="outlined"
                        label="Product Stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setAddProduct(e, "stock")}
                        className={classes.txtField}
                    />

                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label="Product Description"
                        type="text"
                        multiline
                        rows={4}
                        value={newProduct.description}
                        onChange={(e) => setAddProduct(e, "description")}
                        className={classes.txtField}
                    />
                    <Button
                        type="submit"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                    >
                        Add Product
                    </Button>
                </form>
            </Container>

           
        </div>
    );
};

export default AddProduct;
