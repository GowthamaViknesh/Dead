import mongoose from "mongoose";

const Userschema = await mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true }
})

const User = new mongoose.model("User", Userschema)

export default User