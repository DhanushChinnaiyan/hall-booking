import express from "express";
import BookingRoom from "../module/BookingRoom.js";
import Room from "../module/Room.js";

const router = express.Router();

// QN:2-Booking Room:

router.post("/room/:id", async (request, response) => {
  try {
    const postDate = new Date().toLocaleString();
    const alreadyBooked = await BookingRoom.find({
      RoomId: request.params.id,
      EndTime: { $gt: postDate },
    });

    if (alreadyBooked.length > 0) {
      return response.status(400).json({
        message: `Please try to book the room after ${alreadyBooked[0].EndTime}`,
      });
    }
    if (request.body.StartTime < postDate || request.body.EndTime < postDate) {
      return response.status(400).json({ message: "Error booking room" });
    }
    const bookedRoom = await new BookingRoom({
      CustomerName: request.body.CustomerName,
      Date: postDate,
      StartTime: request.body.StartTime,
      EndTime: request.body.EndTime,
      RoomId: request.params.id,
    }).save();

    if (!bookedRoom) {
      return response.status(400).json({ message: "Error booking room" });
    }
    response.status(200).json(bookedRoom);
  } catch (error) {
    console.log("Internal Server Error", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

// QN:3-List all rooms with booked data:

router.get("/allrooms", async (request, response) => {
  try {
    const postDate = new Date().toLocaleString();
    const allrooms = await Room.find();
    const allroomIds = [];
    const bookedIds = [];
    allrooms.map(async (element) => {
      allroomIds.push(element._id);
    });

    const alreadyBooked = await BookingRoom.find({
      RoomId: { $in: allroomIds },
      EndTime: { $gt: postDate },
    });

    alreadyBooked.map((element) => {
      bookedIds.push(element.RoomId);
    });

    const unreservedRooms = await Room.find({
      _id: { $nin: bookedIds },
    });
    // const reservedRooms = await Room.find({
    //   _id: { $in: bookedIds },
    // });
    response
      .status(200)
      .json({ UnreservedRooms: unreservedRooms, ReservedRooms: alreadyBooked });
  } catch (error) {
    console.log("Internal Server Error", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

//QN:4- get all booked room:

router.get("/allbookedrooms", async (request, response) => {
  try {
    const postDate = new Date().toLocaleString();

    const alreadyBooked = await BookingRoom.find({
      EndTime: { $gt: postDate },
    });
    if (alreadyBooked.length === 0) {
      return response.status(400).json({ message: "Rooms Not Booked" });
    }
    response.status(200).json({ BookedRooms: alreadyBooked });
  } catch (error) {
    console.log("Internal Server Error", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

// QN:5- Lst how many times a customer has booked the room

router.get("/counting", async (request, response) => {
  try {
    const alltimebokedstatus = await BookingRoom.find();
    const CustomerNames = [];
    const originalNmaes = [];
    alltimebokedstatus.map((names) => {
      CustomerNames.push(names.CustomerName);
    });
    CustomerNames.map((names) => {
      if (!originalNmaes.includes(names)) {
        originalNmaes.push(names);
      }
    });

    const fulldetails = [];
    const postDate = new Date().toLocaleString();
    originalNmaes.map((names) => {
      const details = [];
      for (let index = 0; index < alltimebokedstatus.length; index++) {
        let status;

        if (alltimebokedstatus[index].EndTime > postDate) {
          status = "Booked";
        } else {
          status = "Unreserved";
        }
        if (names === alltimebokedstatus[index].CustomerName) {
          details.push({
            CustomerName: alltimebokedstatus[index].CustomerName,
            RoomName: alltimebokedstatus[index].RoomId,
            Date: alltimebokedstatus[index].Date,
            StartTime: alltimebokedstatus[index].StartTime,
            EndTime: alltimebokedstatus[index].EndTime,
            BookingId: alltimebokedstatus[index]._id,
            BookingDate: alltimebokedstatus[index].Date,
            BookingStatus: status,
          });
        }
      }
      fulldetails.push(names, details);
    });

    response.status(200).json(fulldetails);
  } catch (error) {
    console.log("Internal Server Error", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

export const BookedRouter = router;
