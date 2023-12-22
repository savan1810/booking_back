const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
    place:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"places"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    checkIn:{
        type:Date,
        req:true
    },
    checkOut:{
        type:Date,
        req:true
    },
    numberOfGuests:{
        type:Number,
        req:true
    },
    name:{
        type:String,
        req:true
    },
    phone:{
        type:Number,
        req:true
    },
    price:{
        type:Number,
        req:true
    },

});

module.exports=mongoose.model('bookings',bookingSchema)