const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name:String,
    country:String
});
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    review: {
        type: String,
    },
    createdOn: {
        type: Date,
        "default": Date.Now
    }
});
const gameSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    price: Number,
    minAge: Number,
    designers:[String],
    rate:{
        type:Number,
        min:1,
        max:5,
        "default":1
    },
    year:Number,
    minPlayers:Number,
    maxPlayers:Number,
    reviews:[reviewSchema],
    publisher:publisherSchema

});

mongoose.model("Game", gameSchema, "games");