import express from 'express';
import Room from '../module/Room.js';



const router = express.Router()

// QN:1-creating room

router.post("/",async(request,response)=>{
    try {
        const room = await new Room(
            {
                NoOfseats:request.body.NoOfseats,
                Amenities:request.body.Amenities,
                PricePerHour:request.body.PricePerHour
                
            }
        ).save()

        if(!room){
            return response.status(400).json({message:"Error Adding Room"})
        }
        response.status(200).json(room)
        
    } catch (error) {
        console.log("adding room errors ",error)
        return response.status(500).json({message:"Internal Server Error"})
    }
})


// getting all rooms detail

router.get("/rooms",async(request,response)=>{
    try {
        const rooms = await Room.find()
        if(!rooms){
            return response.status(400).json({message:"Rooms Not Available"})
        }
        response.status(200).json(rooms)
        
    } catch (error) {
        console.log("get rooms errors ",error)
        return response.status(500).json({message:"Internal Server Error"})
    }
})

export const RoomRouter = router