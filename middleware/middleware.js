var jwt = require('jsonwebtoken');
const jwt_Secret='hellomynameissavan';

const middleware=async (req,resp,next)=>{

    const jwtToken=req.cookies.jwtToken;
    if(!jwtToken){
        resp.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
        let data=jwt.verify(jwtToken,jwt_Secret);
        req.id=data.id
        next()
    } catch (error) {
        resp.status(401).send({error:"please authenticate using a valid token"})
    }
    
}

module.exports=middleware;