import { NestMiddleware, Injectable, UnauthorizedException,BadRequestException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
dotenv.config();

@Injectable()
export class AuthenticateUser implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        let token = req.headers.token ? req.headers.token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTQ5MjM2ZjM3MWVkNjQ5NDI1ZTc0OCIsImVtYWlsIjoiYWRpQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzYyNjE4NjZ9.BcMIWmShwmMjRNUp47B9aNS86SJTqaxGbFo7NG9y-0g';
        
        let payload
        
        if (typeof token === 'string') {
            
            payload = jwt.verify(token, process.env.SECRET_KEY, function(err, doc){
                if(err){
                    throw new UnauthorizedException("Invalid token")
                }
                return doc
                
            })
        }

        if(!payload){
            throw new UnauthorizedException('Please login first to access this route')
        }
        console.log('from mw1 payload is ', payload);
        
        Object.assign(req, { user: payload});
        next()
    }
    
}