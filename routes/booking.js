const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const fetchUser=require('../middleware/middleware')


router.post('/booking',(fetchUser),async (req,resp)=>{
    try{
        const {place,checkIn,checkOut,numberOfGuests,name,phone,price}=req.body
        const t = new Booking({place,user:req.id,checkIn:new Date(checkIn),checkOut:new Date(checkOut ),numberOfGuests,name,phone,price});
        const s=await t.save()
        resp.json(s);
    }catch(err){
        console.log(err);
        resp.status(500).json({err:"some error occurred"})
    }
})

router.get('/bookings',fetchUser,async (req,resp)=>{
    try {
        const t = await Booking.find({user:req.id}).populate("place").exec();;
        resp.json(t);
    } catch (error) {
        resp.status(500).json({err:"some error occurred"})
    }
})
router.get('/bookings/:id',async (req,resp)=>{
    try {
        const t = await Booking.find({_id:req.params.id}).populate("place").exec();;
        resp.json(t);
    } catch (error) {
        resp.status(500).json({err:"some error occurred"})
    }
})
module.exports = router;