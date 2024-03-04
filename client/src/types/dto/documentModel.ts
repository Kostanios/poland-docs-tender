export type DocumentModel = {
    createdAt: string
    description: string | null
    modelName: string
    publishedAt: string
    updatedAt: string
}

export type DocumentModelDTO = {
    attributes: DocumentModel,
    id: number
}