import * as React from "react"
import "./Sidebar.css"
import { BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill, BsFillCartPlusFill, BsFillInfoCircleFill } from "react-icons/bs"
import { MdPayment } from "react-icons/md"
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import CheckoutForm from "../CheckoutForm/CheckoutForm"

export default function Sidebar(props) {
const {isOpen} = props;
const {shoppingCart} = props;
const {products} = props;
const {checkoutForm} = props;
const {handleOnCheckoutFormChange} = props;
const {handleOnSubmitCheckoutForm} = props;
  console.log(22,props)
  console.log(23, shoppingCart)
  console.log(26,isOpen);
  return (
    <section className="sidebar">
      <div className="wrapper">
        <button id="button-closed" className="toggle-button" onClick={props.handleOnToggle}><i className="material-icons"><BsFillArrowRightCircleFill /></i></button>
        <div className="icons">
          <span className="cart-icon icon button"><i className="material-icons" ><BsFillCartPlusFill /></i></span>
          <span className="payment-icon icon button"><i className="material-icons"><MdPayment /></i></span>
          <span className="checkout-icon icon button"><i className="material-icons"><BsFillInfoCircleFill /></i></span>
          {isOpen && <SidebarOpen checkedOut = {props.checkedOut} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} checkoutForm={checkoutForm} products={products} isOpen={isOpen} shoppingCart={shoppingCart} handleOnToggle={props.handleOnToggle}/>}
        </div>
      </div>
    </section>
    )
}


export function SidebarOpen(props){
  console.log(props);
  return(
    <div className="sidebar-open">
      <button id="button-open" className="toggle-button" onClick={props.handleOnToggle}><i className="material-icons"><BsFillArrowLeftCircleFill /></i></button>
      <ShoppingCart shoppingCart={props.shoppingCart} isOpen={props.isOpen} products={props.products} />
      <CheckoutForm checkedOut = {props.checkedOut} handleOnSubmitCheckoutForm = {props.handleOnSubmitCheckoutForm} handleOnCheckoutFormChange = {props.handleOnCheckoutFormChange} checkoutForm={props.checkoutForm} isOpen = {props.isOpen} shoppingCart = {props.shoppingCart} />
    </div>
  )
}