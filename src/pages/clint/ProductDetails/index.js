import { Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { requestSingleProduct } from "../../../store/actions/productDetailsAction";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const currentProduct = useSelector((state) => state.productDetailsReducer);
    
    useEffect(() => {
        dispatch(requestSingleProduct(id, token));
    }, []);
    console.log("currentProduct",currentProduct);
    return (
        <div>
            {currentProduct && (
                <Container>
                    <Grid container>
                        <Grid item>
                            <div>
                                <img
                                    width="300px"
                                    src={`http://localhost:8080${currentProduct.image}`}
                                    alt=""
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <div>
                                <p>{currentProduct.title}</p>
                                <p>{currentProduct.category.name}</p>
                                <p>{currentProduct.description}</p>
                                <p>{`${currentProduct.price} TK`}</p>
                                <div>
                                    <button>-</button>
                                    <input type="number" />
                                    <button>+</button>
                                </div>
                                <button>add to cart</button>
                            </div>
                            <div></div>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </div>
    );
};

export default ProductDetails;
