import { NestMiddleware, Injectable, UnauthorizedException,BadRequestException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
dotenv.config();

@Injectable()
export class AuthenticateUser implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        let token = req.headers.token ? req.headers.token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjMxMTJjMGNjZGM4MDUyZDM5YjdlNyIsImVtYWlsIjoibmUxMXdAZ21haWwuY29tIiwidXNlclJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3Njg3NDA1MH0.iyyaBVQklQnZKgVNpPbe0_ebi08jtBp9yzDfvvA97NE';
        
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