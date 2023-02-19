import { Controller, Post, Get, Body, Param, Patch, Delete, Req, UseGuards } from "@nestjs/common";
import { ProductService } from "./products.service";
import {checkAdmin} from '../guards/role.guard'
import { ValidateToken } from "src/guards/validateToken.guard";
import {ApiHeader, ApiBody, ApiQuery, ApiExtraModels, ApiProperty} from '@nestjs/swagger'


@ApiExtraModels()
class AddProductModel {
  @ApiProperty({ example: 'Bottle' })
  name: string;

  @ApiProperty({ example: 'Pink Blue' })
  desc: string;

  @ApiProperty({ example: 199 })
  price: number;

  
}


@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Post()
    @ApiHeader({name:'token'})
    @ApiBody({ type: AddProductModel })
    @UseGuards(checkAdmin)
    async addProduct(@Body('name') name: string, @Body('desc') prodDesc: string,@Body('price') prodPrice: number, @Req() req: any) {
        const generatedId = await this.productService.insertProduct(name, prodDesc, prodPrice)
        
        return {
            success: true,
            productId: generatedId
        }
    }

    @Get()
    @ApiHeader({name:'token'})
    async getAllProducts(){
        const allProducts = await this.productService.getProducts()
        return allProducts;
    }

    @Get(':id')
    @ApiHeader({name:'token'})
    async getProduct(@Param('id') prodId: string){
        const product = await this.productService.getSingleProduct(prodId)
        return product;
    }

    @Patch(':id')
    @ApiHeader({name:'token'})
    @ApiBody({ type: AddProductModel })
    @UseGuards(ValidateToken)
    @UseGuards(checkAdmin)
    async updateProduct(@Param('id') prodId: string, @Body('name') name: string, @Body('desc') prodDesc: string,@Body('price') prodPrice: number){
        const updatedProduct = await this.productService.updateProduct(prodId, name, prodDesc, prodPrice);
        return {
            success: true,
            product: updatedProduct
        }
    }

    @Delete(':id')
    @ApiHeader({name:'token'})
    @UseGuards(checkAdmin)
    async removeProduct(@Param('id') prodId: string, @Req() req: any){
        const deletedProduct = await this.productService.deleteProduct(prodId, req.user.id)        
        return {
            success: true,
            message: `item deleted succesfully`
        }

    }
}