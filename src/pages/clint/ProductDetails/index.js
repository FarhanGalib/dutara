import { Button, Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { requestSingleProduct } from "../../../store/actions/productDetailsAction";
import { makeStyles } from "@material-ui/core/styles";
import { requestAddToCart } from "../../../store/actions/cartAction";

const useStyles = makeStyles((theme)=>({
    quantity: { 
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center', 
        
        marginBottom: 15,

    },
    pieces:{
        marginLeft: 5,
        marginRight: 5,
    }
}));
const ProductDetails = () => {
    const classes = useStyles();
    const [pieces, setPieces] = useState(1);
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const { token } = useSelector(
        (state) => state.persistedStorage.currentUser
    );
    const currentProduct = useSelector((state) => state.productDetailsReducer);
    
    useEffect(() => {
        dispatch(requestSingleProduct(id, token));
    }, []);
    console.log("currentProduct",currentProduct);

    const handleNumberOfPieces=(type)=>{
        if(type==="increment"){
            setPieces(pieces+1);
        }else{
            if(pieces>1){
                setPieces(pieces-1);
            }
        }
    }
    const handleAddToCart =()=>{
        dispatch(requestAddToCart(id,pieces,token));
        history.push("/home");
    }
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
                                <div className={classes.quantity}>
                                    <button onClick={()=>handleNumberOfPieces("decrement")}>-</button>
                                   <p className={classes.pieces}>{pieces}</p>
                                    <button onClick={()=>handleNumberOfPieces("increment")}>+</button>
                                </div>
                                <Button color="primary" variant="contained" onClick={handleAddToCart}>add to cart</Button>
                               
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
