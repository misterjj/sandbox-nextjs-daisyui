import {list, List, ListOptions} from "@/sdk/core";
import {Product} from "@/sdk/product/productApi";

export interface Category {
    id: number
    nameFr?: string
    nameEn?: string
    descriptionFr?: string
    descriptionEn?: string
}

export async function listCategories (options: ListOptions<Category> = {}): Promise<List<Category>> {
    return await list<Product>('/api/categories', options)
}