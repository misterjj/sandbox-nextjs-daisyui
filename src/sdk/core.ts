export interface List<T> {
    count: number
    values: T[]
}

export interface ListOptions<T> {
    page?: number
    perPage?: number,
    token?: string,
    sort?: {field: keyof T, order: "asc" | "desc"}
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