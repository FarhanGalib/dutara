import { Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { requestProductList } from "../../../store/actions/productAction";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { requestAddCartItem, setPersistedCart } from "../../../store/actions/cartAction";

const useStyles = makeStyles((theme) => ({
   
}));

const Products = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { productList } = useSelector((state) => state);
    const  searchText = useSelector((state) => state.SearchText);

    const { role, token } = useSelector( (state) => state.persistedStorage.currentUser);

    useEffect(() => {
        dispatch(requestProductList(token));

    }, []);


    const handleAddToCart=(productId)=> {
        if(token===""){
            dispatch(setPersistedCart(productId));
            history.push("/signin");
        }else if(role==="user"){
            dispatch(requestAddCartItem(productId, token));
        }
    };
    const handleProductDetails=(id)=> {
        history.push(`/product/${id}`);
    };
    
    return (
        <div>
            <Container>
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
                                        <img width="200px" src={`http://localhost:8080${product.image}`} alt="" />
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
            </Container>
        </div>
    );
};

export default Products;
