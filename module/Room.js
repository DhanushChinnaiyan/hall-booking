import mongoose from "mongoose";


const RoomSchema = new mongoose.Schema(
    {
        NoOfseats:{
            type:Number,
            required:true
        },
        Amenities:{

            type:[],
            required:true
        },
        PricePerHour:{
            type:Number,
            required:true
        }
    }
)


const Room = mongoose.model("room",RoomSchema)

export default Room;