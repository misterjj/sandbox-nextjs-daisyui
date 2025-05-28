export interface List<T> {
    count: number
    values: T[]
}

export interface ListOptions {
    page?: number
    perPage?: number,
    token?: string,
}

const baseUrl: string = 'http://localhost:8000'

export async function list<T>(path: string, options: ListOptions = {}): Promise<List<T>> {
    const uri = new URL(`${baseUrl}${path}`)
    if (options.page) {
        uri.searchParams.append('page', options.page.toString())
    }
    if (options.perPage) {
        uri.searchParams.append('limit', options.perPage.toString())
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