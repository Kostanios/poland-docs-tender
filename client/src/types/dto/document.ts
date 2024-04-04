export type Document = {
    createdAt: string
    name: string
    publishedAt: string
    updatedAt: string
}

export type DocumentDTO = {
    attributes: Document,
    id: number
}

export type DocumentEntity = {
    createdAt: string
    name: string
    publishedAt: string
    updatedAt: string
    id: number
}
