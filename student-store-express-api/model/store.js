const {storage} = require("../data/storage")

class Store {
    static async listProducts(){
        //list all products
        const products = storage.get("products")
        return products
    }
    static async fetchProducts(productId){
        //fetch a single product by its id
        const product = storage.get("products").find({ id: Number(productId) }).value()
        return product
    }
    static async purchaseOrder(){
        //create a purchase order
    }
}

module.exports = Store