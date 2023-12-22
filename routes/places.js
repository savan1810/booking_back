const express = require('express');
const router = express.Router();
const Place = require('../models/place');
const fetchUser=require('../middleware/middleware')



router.get('/getAllPlaces', async (req, resp) => {
    try {
        const t = await Place.find();
        resp.json(t);
    } catch (error) {
        console.error(err);
        resp.status(500).send("some error occured")
    }
})
router.get('/getPlaces',fetchUser, async (req, resp) => {
    try {
        const t = await Place.find({owner:req.id});
        resp.json(t);
    } catch (error) {
        console.error(err);
        resp.status(500).send("some error occured")
    }
})
router.post('/getPlacesById', async (req, resp) => {
    // console.log("hello",req.body)
    try {
        const {id}=req.body
        const t = await Place.find({_id:id});
        resp.json(t);
    } catch (error) {
        console.error(err);
        resp.status(500).send("some error occured")
    }
})

router.get('/places/:id', async (req, resp) => {
    console.log("hello")
    try {
        const t = await Place.find({_id:req.params.id});
        resp.json(t);
    } catch (error) {
        console.error(err);
        resp.status(500).send("some error occured")
    }
})

router.post('/addPlaces',fetchUser, async (req, resp) => {
    try {
        const {title,address,addedPhotos,description,perks,maxGuests,extraInfo,checkIn,checkOut,price}=req.body.form_data
        const t = new Place({owner:req.id,title,address,photos:addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price});
        const s=await t.save()
        resp.json(s);
    } catch (error) {
        console.error(err);
        resp.status(500).send("some error occured")
    }
})
router.post('/updatePlaces/:id', async (req, resp) => {
    try {
        const newNote = req.body.form_data;
        newNote.photos=newNote.addedPhotos
        // console.log(req.params.id,newNote.addedPhotos)
        let note = await Place.find({_id:req.params.id});
        if (!note) { return resp.status(404).send("not found") }
        note = await Place.findOneAndUpdate({_id:req.params.id}, { $set: newNote }, { new: true })
        resp.json(note);
    } catch (error) {
        // console.error(err);
        resp.status(500).send("some error occured")
    }
})  

router.post('/deleteImage/:id',async (req, resp) => {
    console.log(req.body)
    try{
        let note = await Place.findById(req.params.id);
        if (!note) { return resp.status(404).send("not found") }
        
        const note1=note.photos.filter((ele)=>{return(ele!==req.body.ele)})
        note = await Place.findOneAndUpdate({_id:req.params.id}, { $set: {photos:note1} }, { new: true })
        resp.json(note1)
    }catch (error) {
        // console.error(err);
        resp.status(500).send("some error occured")
    }
})

module.exports = router;