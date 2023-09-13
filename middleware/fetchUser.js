require('dotenv').config();
const jwt = require('jsonwebtoken');
const fetchUser = (req,res,next) => {
    const token = req.header('auth-token');
    console.log(token);
    if(!token){
        res.status(401).send({error:"Token not found"});
    }
    else{
        try{
            let data = jwt.verify(token,process.env.JWT_secret);
            req.user = data.user;
            next();
        }catch(error){
            res.status(401).send({error:"Invalid token"});
        }
    }
    
}

module.exports = fetchUser;