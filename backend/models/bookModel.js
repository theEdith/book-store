import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        trim:true
    },
    author: {
        type: String,
        required: true,
        trim:true
    },
    publishYear: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    }
);




//create a model for bookSchema
export const Book = new mongoose.model("Book", bookSchema);