import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, FormControl, Grid, InputLabel, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch, useSelector } from "react-redux";
import { requestCategoryList } from "../../../store/actions/categoryAction";
import { requestSingleProduct, requestUpdateProduct } from "../../../store/actions/productAction";


const useStyles = makeStyles({});

const EditProduct = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [baseImage, setBaseImage] = useState("");
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        title: "",
        categoryId: "",
        description: "",
        price: "",
        stock: "",
        image: "",
    });
    const { categoryList } = useSelector((state) => state.categoryStore);
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const { singleProductForEdit } = useSelector((state) => state);

    console.log(currentProduct);

    useEffect(() => {
        dispatch(requestCategoryList());
        dispatch(requestSingleProduct(id, token));
    }, []);

    // useEffect(() => {
    //     setCurrentProduct({
    //         ...currentProduct,
    //         categoryId: categoryList[0]?._id,
    //     })
    // }, [categoryList]);

    useEffect(() => {
        setCurrentProduct({
            ...currentProduct,
            title: singleProductForEdit?.title,
            categoryId: singleProductForEdit?.category._id,
            description: singleProductForEdit?.description,
            price: singleProductForEdit?.price,
            stock: singleProductForEdit?.stock,
            image: singleProductForEdit?.image,
        });

    }, [singleProductForEdit, categoryList]);

    const uploadProductImage = async (e) => {
        setIsImageChanged(true);
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
        console.log(base64);
        setCurrentProduct({ ...currentProduct, image: base64 });
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const setEditedCurrentProduct = (e, key) => {
        setCurrentProduct({ ...currentProduct, [key]: e.target.value });
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        dispatch(requestUpdateProduct(id, currentProduct,isImageChanged, token));
        history.push("/products");
    };

    

    return (
        <div>
            <Container>
                <Typography variant="h4" className={classes.heading}>
                    Edit <span className={classes.headingStyle2}>Pro</span>
                    duct
                </Typography>
                <form type="submit" onSubmit={handleUpdateProduct}>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label="Product Title"
                        type="text"
                        value={currentProduct.title}
                        onChange={(e) => setEditedCurrentProduct(e, "title")}
                        className={classes.txtField}
                    />
                    <img height="400px" src={isImageChanged?baseImage:`http://localhost:8080${currentProduct?.image}`} alt="" />
                    <input
                        type="file"
                        onChange={(e) => uploadProductImage(e)}
                        
                    />

                    <TextField
                        required
                        select
                        value={currentProduct.categoryId}
                        className={classes.Category}
                        onChange={(e) =>
                            setCurrentProduct({
                                ...currentProduct,
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
                        value={currentProduct.price}
                        onChange={(e) => setEditedCurrentProduct(e, "price")}
                        className={classes.txtField}
                    />
                    <TextField
                        required
                        variant="outlined"
                        label="Product Stock"
                        type="number"
                        value={currentProduct.stock}
                        onChange={(e) => setEditedCurrentProduct(e, "stock")}
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
                        value={currentProduct.description}
                        onChange={(e) =>
                            setEditedCurrentProduct(e, "description")
                        }
                        className={classes.txtField}
                    />
                    <Button
                        type="submit"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                    >
                        Update Product
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default EditProduct;
