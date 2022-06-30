import "./CheckoutForm.css"
import React from "react"

export default function CheckoutForm(props) {
    console.log(26, props)
    const handleOnChange = (e) =>{
        console.log(27,e.target.value);
        props.handleOnCheckoutFormChange(e.target.name, e.target.value);
    }
    return(
        <div className="checkout-form">
            <h1>Payment Info</h1>
            <form>
            <label>Email</label>
                <br/>
                <input type="email" name="email" placeholder="student@codepath.org" value={props.checkoutForm.email} onChange={handleOnChange} className="checkout-form-input"></input>
                <br/>
                <label>Name</label>
                <br/>
                <input type="text" name="name" placeholder = "Student Name" value={props.checkoutForm.name} onChange={handleOnChange} className="checkout-form-input"></input>  
            </form>
            <br/>
            <button onClick={props.handleOnSubmitCheckoutForm}>Checkout</button>
            {props.checkedOut && <Receipt products = {props.products} shoppingCart = {props.shoppingCart} checkedOut={props.checkoutForm} />}
            
        </div>
    )
}

export function Receipt(props){
    var itemSubtotal = 0;
    var tax = 0;
    var totalPrice = 0;
    return(
        <div className="receipt">
            <h1>Checkout Info</h1>
            <body>
                <p>Receipt</p>
                <p className="showing">Showing receipt for {props.checkedOut.name} available at {props.checkedOut.email}</p>
                {props.shoppingCart.map((item, key)=>{
                console.log(19, key);
                let product = props.products[item.itemId - 1];
                let subtotal = item.quantity * product.price;
                itemSubtotal += subtotal;
                tax = (itemSubtotal*0.0875);
                let total = (tax + subtotal)
                totalPrice += (itemSubtotal + tax);
                console.log(20,product);
                return(
                        <ul>
                            <li>{item.quantity} total {product.name} at a cost of ${product.price.toFixed(2)} for a total cost of ${total.toFixed(2)}</li>
                        </ul>
                )
                })}
                <ul>
                    <li>Before taxes, the subtotal was ${itemSubtotal.toFixed(2)}</li>
                    <li>After taxes and fees were applied, the total comes out to ${totalPrice.toFixed(2)}</li>
                </ul>
            </body>
        </div>
    )
}