import {Products} from "./products";

export type Order = {
    id: number,
    title: string,
    date: string,
    description: string,
    products?: Products
}

export type Orders = Order[];
