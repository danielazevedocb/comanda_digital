import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
  
  // Receber o token
  const authToken = req.headers.authorization;

  if(!authToken){
    return res.status(401).end();
  }

  const [,token] = authToken.split(" ")
  
  try{
    //validar esse toke
    const { sub } = verify(
        token,
        process.env.JWT_SECRET
    ) as IPayload;

    req.user_id = sub; 
    
    return next();
    
  }catch(err){
    return res.status(401).end();
  }
}