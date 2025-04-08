import jwt from 'jsonwebtoken';
import { Router } from 'express';

export const validateJWT = Router();

validateJWT.use((req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "Token not provided" });
        return;
    }
    if (token.startsWith("Bearer")) {
        token = token.split(" ")[1]; 
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            res.status(401).json({ message: "Invalid token" + error.message });
        } else {
            req.decoded = decoded; 
            next(); 
        }
    })
})