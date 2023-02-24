import {BadRequestException, Injectable, NotFoundException, Req} from '@nestjs/common'
import {Product} from './product.model'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/ecommerce/ecommerce.model';

@Injectable()
export class ProductService{
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>, @InjectModel('User') private readonly userModel: Model<User>){

    }
    private products: Product[] = [];

    async insertProduct(name: string, desc: string, price: number){

        if(!name || !desc || !price){
            throw new BadRequestException("All the fields are required")
        }

        const newProduct = new this.productModel({name: name, desc: desc, price: price})
        const result = await newProduct.save()
        
        return result
    }

    async getProducts(){
        const allProducts = await this.productModel.find()
        return {
            success: true,
            products: allProducts
        }
    }

    async getSingleProduct(productId: string){
        const product = await this.productModel.findById(productId).catch((error) => {
            throw new BadRequestException(error.message)
        })
        
        return {
            success: true,
            product: product
        }
    }

    async updateProduct(productId: string, name: string, desc: string, price: number){

        // const [product, index] = this.findProduct(productId)
        const update = await this.productModel.findById(productId).catch((error) => {
            throw new BadRequestException(error.message)
        })
        

        if(name){
            update.name = name;
        }

        if(desc){
            update.desc = desc;
        }

        if(price){
            update.price = price;
        }

        // this.products[index] = updatedProduct

        let updatedProduct = await this.productModel.findByIdAndUpdate(productId, update, {
            new: true
          });

        return updatedProduct

    }

    async deleteProduct(prodId: string, userId: string){
        const deletedProduct = await this.productModel.findByIdAndDelete(prodId).catch((error) => {
            
            throw new BadRequestException(error.message)
        })
        
        
        return deletedProduct

    }

    private findProduct(id: string): [Product, number]{
        const productIndex = this.products.findIndex((prod) => prod.id === id)
        const product = this.products[productIndex]
        
        if(!product){
            throw new NotFoundException('could not find product.')
        }
        return [product, productIndex]
    }
}