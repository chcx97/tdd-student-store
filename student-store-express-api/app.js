const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const data = require('./data/db.json')
const storeRouter = require("./routes/store")

const app =express()
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))
app.use("/store", storeRouter)

// app.get("/store", async (res, req, next)=>{
//     res.status(200).json(data);
// })

module.exports = app