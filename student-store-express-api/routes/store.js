const express = require("express")
const Store = require("../model/store")
const router = express.Router()


router.get("/", async(req,res,next)=>{
    const data = await Store.listProducts()
    try {
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
    
})

router.get("/:productId", async (req, res, next)=>{
    try {
        console.log(req.params.productId)
        const productId = req.params.productId
        const product = await Store.fetchProducts(productId)
        res.status(200).json(product)
    } catch (error) {
        next(error)   
    }
})

router.post("/", async(req, res, next) => {
    try {
        const shoppingCart = req.body.shoppingCart
        const user = req.body.user
        if(!shoppingCart && !user){
            res.status(400).send(error.details[0].message);
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router