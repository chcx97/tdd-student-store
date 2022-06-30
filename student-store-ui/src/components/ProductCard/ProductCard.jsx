import * as React from "react"
import { Link } from "react-router-dom";
import "./ProductCard.css"
import { useState,} from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
export default function ProductCard(props) {

  const shoppingCart = props.shoppingCart;
  const [quantity, setQuantity] = useState(0);

  console.log(43,shoppingCart);
  console.log(quantity);
  const handleAdd = () => {
    console.log("am i being called?")
    props.handleAddItemToCart(props.product.id);
  }
  const handleRemove = () => {
    props.handleRemoveItemToCart(props.product.id);
  }
  
  
    return (
      <div className="product-card">
        <Link to = {`/products/${props.product.id}`}>
          <img className="media" src={props.product.image} alt="" />
        </Link>
        <h3 className="product-name">{props.product.name}</h3>
        <h4>{ratingToStars(5)}</h4>
        <h5 className="product-price">${props.product.price.toFixed(2)}</h5>
        {props.showDescription == true && <h6 className="product-description">{props.product.description}</h6>}
        <div className="btns">
          <button id ="remove"className="remove" onClick={()=>{setQuantity(quantity-1); handleRemove();}} value={props.product.id}><IoIosRemove /><i className="fa fa-remove"></i></button>
          <button id="add" className="add" onClick={()=>{setQuantity(quantity+1); handleAdd();}} value={props.product.id}><IoIosAdd /></button>
          <ul className="product-quantity" key={props.product.id}>{quantity > 0 ? quantity: null}</ul>
        </div>
      </div>
    )
}


function ratingToStars(rating) {
  if (rating === null || rating == 0) {
      return "⭐";

  }
  let result = ""
  let stars = Math.ceil(rating)
  for (let i = 0; i < stars; i++) {
      result += "⭐";

  }
  return result;
}