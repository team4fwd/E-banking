const jwt = require('jsonwebtoken')

function auth(req,res,next) {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });

    // if(req.session.user_id){
    //     // console.log(req.session.user_id)
    //     next()
    // }
    // else{
    //     return res.status(404).json({message:"Please Login"})    
    // }
}

function adminAuth(req,res,next) {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
        }
        req.isAdmin = decoded.isAdmin;
        if (req.isAdmin) {
            next();
        }else{
            return res.status(401).send({ message: "Unauthorized Admin Resource!" });
        }
        
    });
    // if(req.session.isAdmin){
    //     next()
    // }
    // else{
    //     return res.status(404).json({message:"Please Login Admin Resource"})    
    // }
}

module.exports = {"userAuth":auth,"adminAuth":adminAuth}