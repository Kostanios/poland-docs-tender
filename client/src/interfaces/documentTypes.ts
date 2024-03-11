export interface GetTableParams {
    page: number
    itemsPerPage: number
    sortBy?: SortKey[]
}

interface SortKey {
    key: string
    order: string
}
