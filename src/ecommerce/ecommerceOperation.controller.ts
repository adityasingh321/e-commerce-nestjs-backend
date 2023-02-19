import { Controller, Post, Get, Body, Param, Req, Delete} from "@nestjs/common";
import { EComService } from "./ecommerce.service";
import { AuthenticateUser } from '../common/middleware/authenticate.middleware';
import {ApiHeader, ApiBody, ApiQuery, ApiExtraModels, ApiProperty} from '@nestjs/swagger'

@ApiExtraModels()
class OrderModel {
  @ApiProperty({ example: 'new kashi nagar' })
  address: string;

  @ApiProperty({ example: '495677' })
  pin: string;

}


@Controller('ecom')
export class EComOperationController {

    constructor(private readonly EComService: EComService){}
    // 

    @Post('/order')
    @ApiHeader({name:'token'})
    @ApiBody({ type: OrderModel })
    async orderProduct(@Body('address') address: string, @Body('pin') pin: string, @Req() req: any){
        const orderId = await this.EComService.orderProduct(req.user.id, req.user.email, address, pin)
        return {
            success: true,
            message: `your order id is ${orderId}`
        }
    }

    @Post(':id')
    @ApiHeader({name:'token'})
    async addToCart(@Param('id') id: string, @Req() req: any){
        const cart = await this.EComService.addToCart(id, req.user)
        return {
            success: true,
            cart: cart
        }
    }

    @Get()
    @ApiHeader({name:'token'})
    async getCart(@Req() req: any){
        const cart = await this.EComService.getUserCart(req.user.id)
        return {
            success: true,
            cart: cart
        }
    }

    @Delete('cancel/:id')
    @ApiHeader({name:'token'})
    async cancelOrder(@Param('id') id: string, @Req() req: any){
        await this.EComService.cancelOrder(id, req.user.id);
        return {
            success: true,
            message: `ordee with id ${id} has been cancelled`
        }
    }


}