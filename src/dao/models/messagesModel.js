import mongoose from "mongoose";

const messageCollection = "message";
const messageSchema = new mongoose.Schema(
    {
        user: String,
        message: String,
    },
    {
        timestamps: true
    }
)

export const messagesModel = mongoose.model(messageCollection, messageSchema)