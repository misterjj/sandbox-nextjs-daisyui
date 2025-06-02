import {list, List, ListOptions} from "@/sdk/core";
import {Categpry} from "@/sdk/product/CategpriesApi";

export interface Product {
    id: number
    price: string
    stock: number
    image?: string
    nameFr?: string
    nameEn?: string
    descriptionFr?: string
    descriptionEn?: string
    categories: Array<Categpry>
}

export async function listProducts (options: ListOptions<Product> = {}): Promise<List<Product>> {
    return await list<Product>('/api/products', options)
}