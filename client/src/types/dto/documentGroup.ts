export type DocumentGroup = {
    createdAt: string
    name: string
    publishedAt: string
    updatedAt: string
}

export type DocumentGroupDTO = {
    attributes: DocumentGroup,
    id: number
}

export type DocumentGroupEntity = {
    createdAt: string
    name: string
    publishedAt: string
    updatedAt: string
    id: number
}
