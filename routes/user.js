const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const download = require('image-downloader');
var cors = require('cors')
const fetchUser=require('../middleware/middleware')
const app=express();
const multer = require('multer');


var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const jwt_Secret='hellomynameissavan';


//Route1:Create a user using :post /api/auth/createuser .no login required
router.post('/createuser',
  // name must be at least 5 chars long and we can also add custom msg as second parameter of body
  body('name', 'enter a valid name').isLength({ min: 3 }),
  // email must be an email
  body('email', 'enter a valid Email').isEmail(),
  // password must be at least 5 chars long
  body('password', 'enter a valid password').isLength({ min: 5 })
  , async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return resp.status(400).json({ errors: errors.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)
      //create a new user
      const user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      })

      return resp.status(200).json({ user })
    }
    catch (err) {
      resp.status(500).send(err)
    }
  })

//Route2: User logged in using :post /api/auth/login . no login required
router.post('/login', [
  // email must be an email
  body('email', 'enter a valid Email').isEmail(),
  // password must be at least 5 chars long
  body('password', 'password cannot be blank').exists()
]
  , async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    try {
      //this will find user by email entered by him
       console.log(req.body)
      const { email, password } = req.body
      //  let success=false;
      const user = await User.findOne({ email })
      if (!user) {
        success = false
        return resp.status(400).json({ error: "please enter correct credentials" });
      }

      //compare password with user's hash password
      const comparePass = await bcrypt.compare(password, user.password);
      
      if (!comparePass) {
        return resp.status(400).json({ error: "please enter correct credentials" });
      }
    
      // console.log(user._id)
      const jwtData = jwt.sign({ id: user._id}, jwt_Secret )
      console.log(jwtData)
      
      resp.cookie('jwtToken', jwtData, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
      })

    console.log("after cookie");
    resp.json("hello")
    }
    catch (error) {
      console.error(error);
      resp.status(500).send("Internal server error")
    }
  })

router.get('/co',fetchUser,async (req,resp)=>{
  const notes =await User.findOne({ _id:req.id});
  if(!notes){
    return resp.status(400).send("user not found")
  }
  resp.json(notes);
  
  // resp.send(req.cookies)
})
router.get('/logout',fetchUser,async (req,resp)=>{
  resp.clearCookie('jwtToken', '', { expires: new Date(0) }).json('logout successfully done')
  // resp.cookie('jwtToken', '')
  // resp.send(req.cookies)
})


const destination=path.join(__dirname, '..')

router.post('/upload-by-link',async(req,resp)=>{
  const {link}=req.body;

  const newName='photo' + Date.now()+'.jpg'
  await download.image({
    url:link,
    dest:destination+'/uploads/'+newName
  })
  resp.json(newName)
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage
})

router.post('/upload-local-image',upload.single('image'),async(req,resp)=>{
  resp.send('Image uploaded successfully');
})


module.exports = router;