const jwt = require("jsonwebtoken")

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET_KEY;

const authMiddleware = (req, res, next) => {
    try{
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(err){
                res.status(401).send("Not Authorized");
                return;
            }

            req.user = decoded.user;
            next();
        })
    }
    catch(err){
        res.status(500).send(err);
    }
}

module.exports = authMiddleware;