import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const pCollection = "products";
const pSchema = new mongoose.Schema(
    {
        id: {type: Number, required: true},
        title: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        status: {type: String, required: true},
        images: {type: String, required: true},
        code: {type: String, required: true},
        stock: {type: Number, required: true},
        category: {type: String, required: true},
    },
    {
        timestamps: true
    }
);

pSchema.plugin(paginate);

export const productsModel = mongoose.model(
    pCollection,
    pSchema
)