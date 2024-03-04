export interface GetTypeDocumentsPagination {
    page: number
    itemsPerPage: number
    sortBy: string
}


export interface GetTypeDocumentsParams {
    pagination: {
        page: number,
        pageSize: number
    }
}
