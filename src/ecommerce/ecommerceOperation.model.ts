import * as mongoose from 'mongoose';

export const orderedProductSchema = new mongoose.Schema({
    email: String,
    address: String,
    pin: String,
    items: Array,
})

export class Item {
    id: string;
    name: string;
    desc: string;
    price: number;
}

export class OrderedProduct {
    id: string
    email: string
    address: string
    pin: string
    items: Array<Item>
}