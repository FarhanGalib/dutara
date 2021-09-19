import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Grid,
    Typography,
    TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { requestProductList } from "../../../store/actions/productAction";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import {
    requestAddCartItem,
    setPersistedCart,
} from "../../../store/actions/cartAction";

//////////////////////////////////////
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { setSearchText } from "../../../store/actions/searchAction";
import { requestCategoryList } from "../../../store/actions/categoryAction";
const theme = createTheme();

///////////////////////////////////////////////
const useStyles = makeStyles((theme) => ({}));

const Products = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { productList } = useSelector((state) => state);
    const searchText = useSelector((state) => state.SearchText);
    const categoryList = useSelector((state) => state.CategoryListForFilterReducer);
    const [category,setCategory] = useState("All");
    const { role, token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );

    useEffect(() => {
        dispatch(requestProductList(token));
        dispatch(requestCategoryList());
    }, []);

    const handleAddToCart = (productId) => {
        if (token === "") {
            dispatch(setPersistedCart(productId));
            history.push("/signin");
        } else if (role === "user") {
            dispatch(requestAddCartItem(productId, token));
        }
    };
    const handleProductDetails = (id) => {
        history.push(`/product/${id}`);
    };

    return (
        <>
            {/* <Container>
                <Grid container spacing={4}>
                    {productList &&
                        productList.filter((product) => {
                            if (searchText === "") return product;
                            else if (
                                product.title
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase())
                            )
                                return product;
                        }).map((product) => (
                            <Grid item   key={product._id}>
                                <div className="productContainer">
                                    <div>
                                        <img width="200px" src={`http://localhost:8080/files/${product.image}`} alt="" />
                                    </div>
                                    <div>
                                        <p>{product.title}</p>
                                        <p>{product.price}</p>
                                    </div>
                                    <div>
                                        <button onClick={()=>handleAddToCart(product._id)}>add to cart </button>
                                        <button onClick={()=>handleProductDetails(product._id)}>view details </button>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                </Grid>
            </Container> */}
            <Container maxWidth="lg">
                <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classes.title}
                    sx={{my: "50px"}}
                >
                    Product-List
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        {/* CATEGORY */}

                        <TextField
                                select
                                size= "small"
                                label="filter by category"
                                sx={{backgroundColor:"white", }}
                                value={category}
                                className={classes.sortByCategory}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                                variant="outlined"
                                fullWidth
                                SelectProps={{
                                    native: true,
                                }}
                                // helperText="filter product by category"
                            >
                                {categoryList?.map((c) => (
                                    <option key={c._id} value={c.name}>
                                        {c.name}
                                    </option>
                                ))}
                            </TextField>

                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* SEARCH BAR */}
                        <div >
                            <TextField
                                value={searchText}
                                size= "small"
                                //className={classes.searchTxt}
                                sx={{backgroundColor:"white", }}
                                fullWidth
                                type="text"
                                label="Search products"
                                placeholder="Search..."
                                onChange={(e)=>dispatch(setSearchText(e.target.value))}
                            />
                            
                        </div>
                    </Grid>
                </Grid>
               
            </Container>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container sx={{ py: 8 }} maxWidth="lg">
                    <Grid container spacing={2}>
                        {productList &&
                            productList
                            .filter((product)=>{
                                if(category==="All") return product;
                                else return (category===product?.category.name)? product:null;
                            })
                                .filter((product) => {
                                    if (searchText === "") return product;
                                    else if (
                                        product.title
                                            .toLowerCase()
                                            .includes(searchText.toLowerCase())
                                    )
                                        return product;
                                })
                                .map((product) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={4}
                                        md={3}
                                        key={product._id}
                                    >
                                        <Card
                                            sx={{
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <CardHeader
                                                subheader={
                                                    product.category.name
                                                }
                                            />
                                            
                                            <img
                                                src={`http://localhost:8080/files/${product.image}`}
                                                style={{
                                                    height: "200px",
                                                    margin: "auto",
                                                    width: "100%",
                                                    objectFit: "contain"
                                                }}
                                                alt={product.title}
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="h2"
                                                >
                                                    {product.title}
                                                </Typography>
                                                <Typography variant="small">
                                                    {`${product.price} TK`}
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{display: "flex", flexDirection: "row", justifyContent: `${role!=="admin"?"space-between": "right"}` }}>
                                                {role!=="admin" && <Button size="small" variant="outlined" sx={{"&:hover":{backgroundColor:"#306ddf", color:"white"}}} onClick={()=>handleAddToCart(product._id)}>
                                                    add to cart
                                                </Button>}
                                                <Button size="small" variant="outlined" sx={{"&:hover":{backgroundColor:"#306ddf", color:"white"}}} onClick={()=>handleProductDetails(product._id)}>
                                                    View
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                    </Grid>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default Products;
