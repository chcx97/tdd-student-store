import * as React from "react"
import "./ProductDetail.css"
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import NotFound from "../NotFound/NotFound";
import ProductView from "../ProductView/ProductView";

export default function ProductDetail(props) {
  const {productId} = useParams();
  //props
  const {handleAddItemToCart} = props;
  const {handleRemoveItemToCart} = props;
  //states
  const {products} = props;
  console.log(13,products);
  const [product, setProduct]=useState();
  const [isLoading, setIsLoading] = useState(false);
  
  console.log(15,productId);
  //useEffect
  useEffect(()=>{
    const fetchProductId = async() => {
      setIsLoading(true);
      await axios.get(`https://codepath-store-api.herokuapp.com/store/${productId}`)
        .then((res) => {
          console.log(48,res.data.product);
          setProduct(res.data.product)
          
        }).catch((error)=>{
          console.error(error);
          setProduct(null);
        })
    }
    fetchProductId();
    setIsLoading(false);
  },[])
  console.log(89,props.shoppingCart);
  console.log(79,product)
  console.log(isLoading);
  return (
    <div className="product-detail">
      {isLoading == true && <h1 className="loading">Loading...</h1>}
      {product ? <ProductView shoppingCart = {props.shoppingCart} product={product} productId={productId} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart}/>:<NotFound/>}
    </div>
  )
}
