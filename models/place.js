const mongoose=require('mongoose');

const placeSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    photos:{
        type:Array,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    perks:{
        type:Array,
    },
    extraInfo:{
        type:String,
    },
    checkIn:{
        type:Number,
    },
    checkOut:{
        type:Number,
    },
    maxGuests:{
        type:Number,
    },
    price:{
        type:Number,
    },

});

module.exports=mongoose.model('places',placeSchema)