import { AxiosResponse } from "axios"
import { CSSProperties } from "vue"

export type ApiResponse<T = any> = AxiosResponse<ApiResponseData<T>>
export interface ApiResponseData<T = any> {
    status: number
    success: boolean
    links?: Links
    meta?: Meta
    data: T
}
export interface Links {
    first: string,
    last: string,
    prev: string | null,
    next: string | null
} 
export interface Meta {
    per_page: number,
    current_page: number,
    from: number,
    to: number,
    total: number,
    last_page: number,
    path: string
}

export interface TableConfig {
    field: string
    header: string
    sort?: boolean
    props?: {
        style?: CSSProperties | string
        frozen?: boolean
    }
}

export type OrderDirection = 1 | 0 | -1 | undefined | null
export interface SortConfig {
    sortField: string
    sortOrder: OrderDirection
}

export interface PaginationConfig {
    page: number
    size: number
    total?: number
}