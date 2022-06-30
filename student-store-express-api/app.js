const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const data = require('./data/db.json')
const storeRouter = require("./routes/store")
// const filterRouter = require("./routes/store.jsx")
const app =express()

app.use(morgan("tiny"))
app.use("/store", storeRouter)
app.use(express.json())
app.use(cors())


// app.use("/store", async(req, res, next)=>{
//     res.status(200).json(data)
// })

// app.use("/store", async(req,res,next)=>{
//     res.status(200).json(data)
// })

//ping pong works
// app.get("/", async (req, res, next) =>{
//     res.status(200).json({ping:"pong"})
// } )

module.exports = app