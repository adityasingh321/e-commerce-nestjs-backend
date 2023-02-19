import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    cart: Array,
    orderedItem: Array,
    userRole: {
        type: String,
        default: "customer"
    }
})

export class Item {
    id: string;
    name: string;
    desc: string;
    price: number;
}

export class User {
    id: string
    email: string
    password: string
    userRole: string
    cart: Array<Item>
    orderedItem: Array<Item>
}