import * as mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
    name: String,
    desc: String,
    price: Number
})

export class Product {
    id: string
    name: string
    desc: string
    price: number
}