const mongoose=require('mongoose');
const mongoURI="mongodb+srv://savandhola1810:8365@cluster0.jeiewed.mongodb.net/Invincible_1";

const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("connected")
    }).catch((e)=>{
        console.log(e)
    });
}

module.exports=connectToMongo;