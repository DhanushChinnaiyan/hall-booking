
import express from "express"
import dataBaseConnection from "./db.js"
import { RoomRouter } from "./routers/Room.js"
import { BookedRouter } from "./routers/Booking.js"


const app = express()

app.use(express.json())

// database connection 
dataBaseConnection()
// console.log(new Date().toLocaleString())

// Routers

// Room Router
app.use("/",RoomRouter)

// Booked Room Router
app.use("/booking",BookedRouter)



app.listen(9000,()=>console.log("app listened"))