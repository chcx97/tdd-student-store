import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import ProductDetail from "../ProductDetail/ProductDetail"
import NotFound from "../NotFound/NotFound"
import Home from "../Home/Home"
import { useState, useEffect } from "react"
import "./App.css"
import { BrowserRouter, Routes, Route, Router, Link } from "react-router-dom";
import axios from "axios"
import CheckoutForm from "../CheckoutForm/CheckoutForm"


export default function App() {
  const totalPrice = 0;
   //empty object
  // const shoppingCartInfo = {
  //   itemId: 0,
  //   quantity: 0
  // };
  //state variables
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({}); 
  const [checkedOut, setCheckedOut] = useState(false);
 //useEffect function to receive an api response
  useEffect(() => {
    // Update the document title using the browser API
    const fetchProducts = async() => {
      setIsFetching(true)
      try {
        const getProducts = await axios.get("https://codepath-store-api.herokuapp.com/store");
        console.log(getProducts.data.products.length);
        if (getProducts.data.products.length > 0){
          setProducts(getProducts.data.products);
        } else{
          setError("There are no products in the response");
        }
      } catch (error) {
        console.log(error);
        setError(error);

      }
      finally{
        setIsFetching(false)
      }
    }
    fetchProducts()
  },[])


  //console.log(getProducts);

  console.log(14,products);
  console.log(49.5,shoppingCart);
  //console.log(shoppingCart.quantity);
  //handlers
  const handleOnToggle = () => {
    if(isOpen == true){
      setIsOpen(false);
    } else if(isOpen == false){
      setIsOpen(true);
    }
  }
  const handleAddItemToCart = (productId) => {
    const index = shoppingCart.findIndex(item => item.itemId === productId);
    if (index != -1){
      let newItems = shoppingCart;
      newItems[index].quantity += 1;
      setShoppingCart([...newItems])
    }else{
      setShoppingCart([...shoppingCart,{itemId: productId, quantity: 1}]);
    }
  }
  
  const handleRemoveItemFromCart = (productId) => {
    let index = shoppingCart.findIndex(item => item.itemId === productId)
    if (index != -1){
      let newItems = shoppingCart;
      newItems[index].quantity -= 1;
      if (newItems[index].quantity == 0){
        //at position index, remove 1 item
        newItems.splice(index, 1);
      }
    }
  }
  const handleOnCheckoutFormChange = (name, value) => {
    setCheckoutForm((prevCheckOut) => ({...prevCheckOut, [name] : value}));
  }
  const handleOnSubmitCheckoutForm = () => {
    axios.post("http://localhost:3001/store",{
      user:{name: checkoutForm.name, email: checkoutForm.value}, shoppingCart
    })
    .then(function(response){
      console.log(response);
      setShoppingCart([]);
      setCheckoutForm({ email: "", name: "" })
      setCheckedOut(true);
      return(<CheckoutForm checkedOut = {checkedOut} products = {products} shoppingCart = {shoppingCart}/>)
    })
    .catch(function(error){
      console.log(error);
      setCheckedOut(false);
      return(<p className="error">Oh no! There was an error. 😞</p>)
    })
  }
  //useEffect to fetch api data

  return (
    <div className="app">
      
      <BrowserRouter>
        <main>
             <Routes>
             <Route path="/" element={(
               <>
                 <Navbar />
                 <Home  shoppingCart = {shoppingCart} products={products} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemFromCart}/>
                 <Sidebar checkedOut = {checkedOut} isOpen={isOpen} shoppingCart={shoppingCart} products={products} checkoutForm={checkoutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} handleOnToggle={handleOnToggle}/>
               </>
             )}   
             />
             <Route path="/products/:productId" element={(
               <>
                 <Navbar />
                 <ProductDetail shoppingCart={shoppingCart} products={products} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemFromCart}/>
                 <Sidebar checkedOut = {checkedOut} isOpen={isOpen} shoppingCart={shoppingCart} products={products} checkoutForm={checkoutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} handleOnToggle={handleOnToggle}/>               </>
             )}   
             />
             <Route path="*" element={(
               <>
                 <Navbar />
                 <NotFound />
                 <Sidebar checkedOut = {checkedOut} isOpen={isOpen} shoppingCart={shoppingCart} products={products} checkoutForm={checkoutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} handleOnToggle={handleOnToggle}/>               </>
             )}   
             />
           </Routes>
        </main>

      </BrowserRouter>
    </div>
  )
}
