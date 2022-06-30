import React from 'react'
import './ShoppingCart.css'
import { BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill, BsFillCartPlusFill, BsFillInfoCircleFill } from "react-icons/bs"
import { useState, useEffect } from 'react';

export default function ShoppingCart(props) {
  console.log(25,props);
  return (
    <div className='shopping-cart'>
      <h1>Shopping Cart</h1>
      {/* <span><i className='material-icon'><BsFillCartPlusFill/></i></span> */}
      {!props.shoppingCart.length == 0 ? <DisplayShoppingCart products={props.products} shoppingCart={props.shoppingCart} /> : <p className='notification'>No items added to cart yet. Start shopping now!</p>}
    </div>
  )
}

export function DisplayShoppingCart(props){
  console.log(17,props.shoppingCart);
  console.log(18,props)
  var itemSubtotal = 0;
  var tax = 0;
  var totalPrice = 0;
  return(
    <div className='display-shoppingcart'>
      <table className='table'>
        <tr id='table-head'>
          <th>Name</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Cost</th>
        </tr >
       {props.shoppingCart.map((item, key)=>{
          console.log(19, key);
          let product = props.products[item.itemId - 1]
          let subtotal = item.quantity * product.price
          itemSubtotal += subtotal;
          tax = (itemSubtotal*0.0875);
          totalPrice += (itemSubtotal + tax);
          console.log(20,product)
          return(
            <tr key={key} id="product-info">
              <td className='cart-product-name'>{product.name}</td>
              <td className='cart-product-quantity'>{item.quantity}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>${subtotal.toFixed(2)}</td>
            </tr>
          )
        })}
            <tr id='subtotal'>
              <td>Subtotal</td>
              <td className='subtotal'>${itemSubtotal.toFixed(2)}</td>
            </tr>
            <tr id='tax'>
              <td>Tax</td>
              <td>${tax.toFixed(2)}</td>
            </tr>
            <tr id='total'>
              <td>Total</td>
              <td className='total-price'>${totalPrice.toFixed(2)}</td>
            </tr>
      </table>
    </div>
  )
}