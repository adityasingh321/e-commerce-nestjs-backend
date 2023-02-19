import { Controller, Post, Get, Body, Param, Patch, Delete, Response, Req} from "@nestjs/common";
import { EComService } from "./ecommerce.service";
import { AuthenticateUser } from '../common/middleware/authenticate.middleware';
import {ApiHeader, ApiBody, ApiQuery, ApiExtraModels, ApiProperty} from '@nestjs/swagger'

@ApiExtraModels()
class AuthModel {
  @ApiProperty({ example: 'new@gmail.com' })
  email: string;

  @ApiProperty({ example: '12345' })
  password: string;

}

@Controller('auth')
export class EComController {

    constructor(private readonly EComService: EComService){}

    @Post('register')
    @ApiBody({ type: AuthModel })
    async register(@Body('email') email: string, @Body('password') password: string){
        const result = await this.EComService.createUser(email, password)
        return {
            success: true,
            user: result
        };
    }

    @Post('/login')
    @ApiBody({ type: AuthModel })
    async login(@Body('email') email: string, @Body('password') password: string, @Req() req: any){
        // console.log(req.data);
        
        const result = await this.EComService.login(email, password)
        
        return {
            success: true,
            token: result
        }
    }

}