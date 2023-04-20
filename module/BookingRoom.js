import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema

const BokkingSchema = new mongoose.Schema(
    {
        CustomerName:{
            type:String,
            required:true,
        },
        Date:{
            type:String,
            required:true
        },
        StartTime:{
            type:String,
            required:true
        },
        EndTime:{
            type:String,
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