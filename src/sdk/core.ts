import {isArray} from "lodash";

export interface List<T> {
    count: number
    values: T[]
}

export interface Sort<T> {
    field: keyof T,
    order: "asc" | "desc"
}

export interface Filter<T> {
    field: keyof T,
    operator: "eq" | "gt" | "gte" | "lt" | "lte" | "like" | "in" | "notIn",
    value: string
}

export interface ListOptions<T> {
    page?: number
    perPage?: number,
    token?: string,
    sort?: Sort<T>
    filters?: Filter<T>[]
}

const baseUrl: string = 'http://localhost:8000'

export async function list<T>(path: string, options: ListOptions<T> = {}): Promise<List<T>> {
    const uri = new URL(`${baseUrl}${path}`)
    if (options.page) {
        uri.searchParams.append('page', options.page.toString())
    }
    if (options.perPage) {
        uri.searchParams.append('limit', options.perPage.toString())
    }
    if (options.sort) {
        uri.searchParams.append(`order[${options.sort.field.toString()}]`, options.sort.order)
    }
    options.filters?.forEach(filter => {
        if (filter.operator === "eq") {
            uri.searchParams.append(`${filter.field.toString()}`, filter.value)
        } else if (filter.operator === "in" && isArray(filter.value)) {
            filter.value.forEach(value => {
                uri.searchParams.append(`${filter.field.toString()}[]`, value)
            })
        } else if (filter.operator === "gte" || filter.operator === "gt" || filter.operator === "lte" || filter.operator === "lt") {
            uri.searchParams.append(`${filter.field.toString()}[${filter.operator}]`, filter.value)
        } else {
            console.error(`not implemented filter operator ${filter.operator}`)
        }
    })

    const headers: Record<string, string> = {'Accept': 'application/ld+json'}
    if (options.token) {
        headers['Authorization'] = `Bearer ${options.token}`
    }

    return await fetch(uri, {headers}).then(async r => {
        return await r.json().then(json => {
            return {
                count: json.totalItems ?? 0,
                values: (json.member ?? []) as T[]
            }
        })
    })
}