export interface StrapiContentListDTO<T> {
    data: T[]
    meta: {
        pagination: StrapiContentPagination
    }
}

export interface StrapiContentPagination {
    page: number
    pageCount: number
    pageSize: number
    total: number
}
