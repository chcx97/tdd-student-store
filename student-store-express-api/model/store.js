const {storage} = require("../data/storage")
const {BadRequestError} = require("./errors")
class Store {
    static async listProducts(){
        //list all products
        const products = await storage.get("products").value();
        return products;
    }
    static async fetchProducts(productId){
        //fetch a single product by its id
        const product = await storage.get("products").find({ id: Number(productId) }).value();
        return product;
    }
    static async getPurchaseOrder(){
        const orders = await storage.get("purchases").value();
        return orders;
    }
    static async purchaseOrder(shoppingCart, user){
          //create a purchase order
          if(!shoppingCart || !user.name || !user.email){
            throw new BadRequestError("Properties are empty")
        }
        let items = [];
        let total = 0;
        const products = await Store.listProducts();
        const orders = await Store.getPurchaseOrder();
        const orderId = orders.length + 1
        const createdAt = new Date().toISOString();
        const receipt = {user: user, items: []};

        shoppingCart.forEach((item) => {
            if(!item.itemId || !item.quantity){
                throw new BadRequestError("itemId/quantity is missing")
            }
            if(items.includes(item.itemId)){
                throw new BadRequestError("There are duplicate items in the cart");
            }
            const productDetails = products.find(product => product.id === item.itemId);
            total += productDetails.price * item.quantity
            receipt.items.push({name: productDetails.name, quantity: item.quantity, price: productDetails.price.toFixed(2), totalPrice: (productDetails.price*item.quantity).toFixed(2)})
            items.push(item.itemId);
        })
        total += 0.0875 * total;
        let newOrder = {id: orderId, name: user.name, email: user.email, order: shoppingCart, total: total, createdAt: createdAt, receipt: receipt};
        storage.get("purchases").push(newOrder).write();
        return newOrder;
    }
}
      
module.exports = Store