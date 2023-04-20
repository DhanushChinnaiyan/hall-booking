import mongoose from "mongoose"

const dataBaseConnection = () => {
    const params = {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }

    try {
        mongoose.connect("mongodb+srv://dhanush:621417114021@cluster0.yv1vvqj.mongodb.net/roomBooking?retryWrites=true&w=majority",params)
        console.log("Mongodb conected")
        
    } catch (error) {
        console.log("monodb connection error",error)
    }
}


export default dataBaseConnection;