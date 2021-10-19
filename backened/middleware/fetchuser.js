var jwt = require('jsonwebtoken');

var JWT_secret = 'shubham@123'

const fetchuser=(req,res,next)=>{

    const token=req.header('auth-token')
    if(!token)
    {
        res.status(401).send("please enter correct credential");
    }
    try {
        const data=jwt.verify(token,JWT_secret);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send("please enter correct credential");   
    }

}
module.exports=fetchuser;
