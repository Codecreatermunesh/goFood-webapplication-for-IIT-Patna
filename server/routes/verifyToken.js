import jwt from 'jsonwebtoken';

const verifyToken = (req,res,next)=> {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token,process.env.JWT_SEC, (err,user)=>{
            if (err) return res.status(403).json("Invalid Token!");
            req.user = user;
            next();
        });
    }else {
        return res.status(401).json("Authentication rejected!");
    }
};

const verifyHeader = (req,res,next)=> {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC, (err,user)=>{
            if (err) return res.status(403).json("Invalid Token!");
            req.user = user;
            next();
        });
    }else {
        return res.status(401).json("Authentication rejected!");
    }
};

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res,()=>{
        if (req.user.id===req.params.id || req.user.isAdmin){
            next();
        } else {
            return res.status(403).json("You are not allowed");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not admin!");
      }
    });
};

//export default {verifyToken, verifyTokenAndAuthorization};

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};