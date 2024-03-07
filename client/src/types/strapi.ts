export interface StrapiContentListDTO<T> {
    data: T[]
    meta: {
        pagination: StrapiContentPagination
    }
}

export interface StrapiContentDTO<T> {
    data: T
    meta: {}
}

export interface StrapiContentPagination {
    page: number
    pageCount: number
    pageSize: number
    total: number
}

export interface GetStrapiPaginationParams {
    pagination: {
        page: number,
        pageSize: number
    }
}