import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema

const BokkingSchema = new mongoose.Schema(
    {
        CustomerName:{
            type:String,
            required:true,
        },
        Date:{
            type:Date,
            required:true
        },
        StartTime:{
            type:Date,
            required:true
        },
        EndTime:{
            type:Date,
            required:true
        },
        RoomId:{
            type:ObjectId,
            ref:"room"
        }
    }
)

const BookingRoom = mongoose.model("bookingroom",BokkingSchema)

export default BookingRoom;