import { NestMiddleware, Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CheckAdmin implements NestMiddleware{
    use(@Req() req, res: Response, next: NextFunction) {

        console.log("mw2");
        if(req.user.userRole == 'customer'){
            throw new UnauthorizedException('Only admin can perform this operation')
        }
        
        // Object.assign(req, { data: { message: 'Hello from middleware!' } });
        next()
    }
    
}