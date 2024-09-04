
const jwt = require('jsonwebtoken');

const verify = async (req,res,next) =>{
    const token = req.header('auth-token');

    if(!token){
        res.status(401).send({msg : "Token not provided"});
    }

    try{
        const verified = jwt.verify(token,'YOUR_SECRET_KEY');
        req.user() = verified;
        next();

    }

    catch(err){
        res.status(500).send({msg : "Server Error"});
        console.log(err);
    }
}

module.exports = verify;