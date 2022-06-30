import ProductCard from "../ProductCard/ProductCard";
import "./ProductView.css"

export default function ProductView(props){
    //const {product} = props;
    const {productId} = props;
    const {handleAddItemToCart} = props;
    const {handleRemoveItemToCart} = props;
    return(
        <div className="product-view">
            <h1 className="product-id">Product # {productId}</h1>
            <ProductCard className="product-card" productId = {productId} showDescription = {true} product={props.product} shoppingCart = {props.shoppingCart} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart}/>
        </div>
    )
}