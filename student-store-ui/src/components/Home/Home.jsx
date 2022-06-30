import * as React from "react"
import "./Home.css"
import Hero from "../Hero/Hero"
import ProductGrid from "../ProductGrid/ProductGrid"
import Contact from "../Contact/Contact"
import Footer from "../Footer/Footer"

import About from "../About/About"

export default function Home(props) {
  console.log(props);
  const {products} = props;
  const {handleAddItemToCart} = props;
  const {handleRemoveItemToCart} = props;
 
  return (
    <div className="home">
        <Hero/>

        <ProductGrid shoppingCart = {props.shoppingCart} products={products} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart} /> 
        <About />
        <Contact />
        <Footer />
    </div>
  )
}