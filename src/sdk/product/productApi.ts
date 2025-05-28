import {list, List, ListOptions} from "@/sdk/core";

export interface Product {
    id: number
    price: string
    stock: number
    image?: string
    nameFr?: string
    nameEn?: string
    descriptionFr?: string
    descriptionEn?: string
    categories: Array<string>
}

export async function listProducts (options: ListOptions = {}): Promise<List<Product>> {
    return await list<Product>('/api/products', options)
}