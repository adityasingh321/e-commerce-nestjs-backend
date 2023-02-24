import {Injectable, NotFoundException, ConflictException, BadRequestException} from '@nestjs/common'
import {User} from './ecommerce.model'
import {Product} from '../products/product.model'
import {OrderedProduct} from './ecommerceOperation.model'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { sendEmail } from '../utils/sendEmal'
dotenv.config();

@Injectable()
export class EComService{
    constructor(@InjectModel('User') private readonly userModel: Model<User>, @InjectModel('Product') private readonly productModel: Model<Product>, @InjectModel('OrderedProduct') private readonly orderedItemModel: Model<OrderedProduct>){

    }

    async createUser(email: string, password: string){
        if(!email || !password){
            throw new BadRequestException('some fields are required')
        }
        const foundUser = await this.userModel.findOne({email: email})
        if(foundUser){
            throw new ConflictException("user already Exist")
        }
        const newUser = new this.userModel({
            email,
            password
        })
        const result = await newUser.save()
        return result
    }

    async login(email: string, password: string){
        const foundUser = await this.userModel.findOne({email: email})
        
        if((!foundUser) || (foundUser.password != password)){            
            throw new NotFoundException('invalid email or password')
        }

        const token = jwt.sign({
            id: foundUser._id,
            email: foundUser.email,
            userRole: foundUser.userRole
        }, process.env.SECRET_KEY)

        return token
    }

    async addToCart(prodId: string, user: any){
        const foundUser = await this.userModel.findById(user.id).catch((error) => {
            throw new BadRequestException(error.message)
        })
        const foundProduct = await this.productModel.findById(prodId).catch((error) => {
            throw new BadRequestException(error.message)
        })
        foundUser.cart.push(foundProduct)
        await foundUser.save()
        console.log(foundUser.cart.length);
        
        return foundUser.cart
    }

    async orderProduct(userId: string, email: string, address: string, pin: string){
        if(!address || !pin){
            throw new BadRequestException("All the fields are required")
        }
        const user = await this.userModel.findById(userId).catch((error) => {
            throw new BadRequestException(error.message)
        })
        const cart = [...user.cart]
        console.log(cart);
        
        const orderedItem = new this.orderedItemModel({
            email,
            address,
            pin,
            items: cart
        })
        await orderedItem.save()
        const ids = cart.map(e => e.id).toString();
        const names = cart.map(e => e.name).toString();;
        sendEmail(ids, names, address, email)
        return orderedItem._id
    }

    async cancelOrder(id: string, userId: string){
        const order = await this.orderedItemModel.findByIdAndDelete(id).catch((error) => {
            throw new BadRequestException(error.message)
        })
        sendEmail(id, null, null, null)

    }

    async getUserCart(userId: string){
        const user = await this.userModel.findById(userId)
        return user.cart
    }



}