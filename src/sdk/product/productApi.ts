import {list, List, ListOptions} from "@/sdk/core";
import {Category} from "@/sdk/category/CategoriesApi";

export interface Product {
    id: number|null
    price: string
    stock: number
    image?: string
    nameFr?: string
    nameEn?: string
    descriptionFr?: string
    descriptionEn?: string
    categories: Array<Category>
}

export const emptyProduct = {
    id: null,
    price: "",
    stock: 0,
    image: "",
    nameFr: "",
    nameEn: "",
    descriptionFr: "",
    descriptionEn: "",
    categories: []
}

export async function listProducts (options: ListOptions<Product> = {}): Promise<List<Product>> {
    return await list<Product>('/api/products', options)
}