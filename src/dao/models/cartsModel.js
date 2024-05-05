import mongoose, { SchemaTypes } from "mongoose";
const cCollection = "carts";
const cSchema = new mongoose.Schema({
  products: [
    {
      _id: false,
      id: String,
      quantity: Number,
    },
  ],
});

export const cartsModel = mongoose.model(cCollection, cSchema);