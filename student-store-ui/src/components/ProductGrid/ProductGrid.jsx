
import * as React from "react"
import ProductCard from "../ProductCard/ProductCard"
import "./ProductGrid.css"
import { useState, useEffect } from "react";

export default function ProductGrid(props) {

//state variables
const [searchedActive, setSearchedActive] = useState(false);
const [searchInput, setSearchInput] = useState("");
const [filteredData, setFilteredData] = useState([]);
const [filteredCategory, setFilteredCategory] = useState([]);
const [filterActive, setFilterActive] = useState(false);

//prop variables
console.log(10, props);
const {products} = props;
const {handleAddItemToCart} = props;
const {handleRemoveItemToCart} = props;
 
console.log(props)
//useEffect for category
useEffect(()=>{
    setFilteredCategory(products);
    console.log(999,filteredCategory);
}, []);
//handle for category
const handleCategories = (e) =>{
    let typeCategory = e.target.value;
    console.log(94,typeCategory);
    typeCategory != "all categories" ? setFilteredCategory(products.filter((product) =>{
        if (typeCategory == product.category){
            return product;
        }
    })) : setFilteredCategory(products);
    setFilterActive(true);
}
console.log(852,filteredCategory)
//const {searched} = props;
const handleOnChange = (e) => {
    console.log(12,e.target.value);
    setSearchInput(e.target.value);
    getFilteredItems(searchInput, products);
    console.log(35, filteredData);
    if (e.target.value==''){
        setSearchedActive(false);
    }else{
        setSearchedActive(true);
    }
    
}
const getFilteredItems = (searchInput, products) => {
    if (!searchInput){
        return products;
    }
    const data = products.filter((product) => product.name.toLowerCase().includes(searchInput.toLowerCase()));
    console.log(15, data);
    setFilteredData(data);
    // setSearched(true);
    console.log(16,filteredData);
    console.log(30,products.filter((product) => product.name.toLowerCase().includes(searchInput.toLowerCase())));
    return filteredData;
}

const returnProducts = () => {
    console.log(111,searchedActive);
    if (searchedActive === false) {
        console.log("does this work?");
        if(filterActive){
        return(filteredCategory.map((product, i) => { 
            return (<ProductCard className="productCard" shoppingCart = {props.shoppingCart} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart} key={i} product={product}/> )
        }))
        }else{
            return(props.products.map((product, i) => { 
                return (<ProductCard className="productCard" shoppingCart = {props.shoppingCart} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart} key={i} product={product}/> )
            }))
        }
    }else if (searchedActive === true){
        console.log(1113,"does this work?");
        return(filteredData.map((product, i) => { 
            return (<ProductCard className="productCard" shoppingCart = {props.shoppingCart} id = {product.id} key={i} product={product}/> )
        }))
    }
}
  
    return (
      <div className="product-grid" id="buy">
      <div className="search-input">
      <input type="text" placeholder="Search products" onChange={handleOnChange} value={searchInput} className="textbox" />
      </div>
      <div className="categories">
        <li className="active-btn">
            <button id="all" value="all categories" onClick={handleCategories}>All Categories</button>
            <button id="clothing"value="clothing" onClick={handleCategories}>Clothing</button>
            <button id="food"value ="food" onClick={handleCategories}>Food</button>
            <button id="acc" value="accessories" onClick={handleCategories}>Accessories</button>
            <button id="tech" value="tech" onClick={handleCategories}>Tech</button>
        </li>
      </div>
      <div className="content"><h1>Best Selling Products</h1>
        {console.log(props.products)}
        <div className="grid" >
        {returnProducts()}
        </div>
        </div>
      </div>
    )
}